/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';

import { useCreateFollowUp } from '../_api/use-create-follwup';
import { useGetFollowupList } from '../_api/use-get-followup-list';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { AppConstants } from '@/helpers/primitives';
import { cn } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IOtherCommonFilter } from '@/types/common';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

const schema = z.object({
	followUpDates: z.string().min(1, 'Please pick at least one follow-up date'),
	followUpType: z.string().nonempty('Please select a repeat type'),
});

type IFormData = z.infer<typeof schema>;

export default function FollowupForm({
	stepper,
	parentId,
	petId,
	isModal = false,
	onFinish,
	filterType,
}: {
	stepper?: any;
	parentId: string;
	petId: string;
	isModal?: boolean;
	onFinish: () => void;
	filterType?: IOtherCommonFilter;
}) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			followUpDates: '',
			followUpType: '',
		},
	});
	const { data } = useGetFollowupList();
	const followupData =
		data?.data?.followup || ([] as { label: string; value: string }[]);
	const { mutateAsync: createFollowup, isPending } = useCreateFollowUp();

	const onSubmit = async (values: IFormData) => {
		const data = {
			petId,
			parentId,
			followUpType: values.followUpType,
			followUpDates: [format(values.followUpDates, DEFAULT_DATE_FORMAT)],
		};
		const response = await createFollowup(data);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: [
					'clinic/followUpRecords',
					filterType,
					petId,
					undefined,
				],
			});
			onFinish();
		}
	};

	return (
		<div
			className={cn('mb-12 mt-1 flex h-full flex-col', isModal && 'my-0')}
		>
			<h2 className="mx-6 text-2xl font-semibold">
				Add Follow-up Details
			</h2>
			<h6 className="mx-6 mb-6 text-black/50">
				We will remind you when follow-up is due
			</h6>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-1 flex-col"
				>
					<div className="mx-6 flex max-w-sm flex-1 flex-col gap-6">
						<FormField
							control={form.control}
							name="followUpType"
							render={({ field: selectField, fieldState }) => {
								return (
									<FormItem className="col-span-1">
										<FormLabel>
											Select Follow-up Type
										</FormLabel>
										<Select
											onValueChange={selectField.onChange}
											defaultValue={selectField.value}
											value={selectField.value}
										>
											<FormControl>
												<SelectTrigger className="!mt-1 bg-white w-full">
													<SelectValue placeholder="Select a type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{followupData.map((item, i) => {
													return (
														<SelectItem
															key={`${i}`}
															value={item.value}
														>
															{item.label}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="followUpDates"
							render={({ field }) => {
								const dateValue = field.value
									? new Date(field.value)
									: undefined;
								return (
									<FormItem className="col-span-1 flex flex-col">
										<FormLabel>
											Choose Follow-up Date
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant="outline"
														className={cn(
															'!mt-1 h-12 text-left font-normal',
															'flex flex-row truncate',
															!field.value &&
																'text-muted-foreground'
														)}
													>
														<span className="flex-1 truncate">
															{field.value
																? format(
																		new Date(
																			field.value
																		),
																		'PPP'
																	)
																: 'Pick a date'}
														</span>
														<CalendarIcon className="ml-auto size-6 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="max-h-[--radix-popover-content-available-height] w-[340px]"
												align="start"
											>
												<Calendar
													mode="single"
													selected={dateValue}
													onSelect={(
														selectedDate
													) => {
														field.onChange(
															selectedDate
																? selectedDate.toISOString()
																: ''
														);
													}}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					{isModal ? (
						<div className="mt-4 px-6">
							<Button
								disabled={isPending}
								type="submit"
								className="w-[240px]"
							>
								Submit
							</Button>
						</div>
					) : (
						<>
							{stepper.isLast && (
								<div className="shadow-top sticky bottom-0 left-0 flex w-full justify-end gap-4 rounded-b-lg bg-white px-6 py-4">
									<Button
										type="button"
										variant="secondary"
										onClick={stepper.prev}
										disabled={stepper.isFirst}
										className="w-[240px]"
									>
										Back
									</Button>
									<Button
										disabled={isPending}
										type="submit"
										className="w-[240px]"
									>
										{stepper.isLast ? 'Done' : 'Next'}
									</Button>
								</div>
							)}
						</>
					)}
				</form>
			</Form>
		</div>
	);
}
