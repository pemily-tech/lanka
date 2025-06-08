/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { useCreateFollowUp } from '../_api/use-create-follwup';
import { useGetFollowupList } from '../_api/use-get-followup-list';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { AppConstants } from '@/helpers/primitives';
import { cn, dateDisable } from '@/helpers/utils';
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
	followUpDates: z
		.array(z.string().min(1))
		.min(1, 'Please pick at least one follow-up date'),
	followUpType: z.string().nonempty('Please select a repeat type'),
});

type IFormData = z.infer<typeof schema>;

export default function FollowupForm({
	stepper,
	parentId,
	petId,
}: {
	stepper: any;
	parentId: string;
	petId: string;
}) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			followUpDates: [],
			followUpType: '',
		},
	});
	const { data } = useGetFollowupList();
	const followupData =
		data?.data?.followup || ([] as { label: string; value: string }[]);
	const { mutateAsync: createFollowup, isPending } = useCreateFollowUp();
	const router = useRouter();

	const onSubmit = async (values: IFormData) => {
		const data = {
			petId,
			parentId,
			followUpType: values.followUpType,
			followUpDates: values.followUpDates.map((d) =>
				format(d, DEFAULT_DATE_FORMAT)
			),
		};
		const response = await createFollowup(data);
		if (response.status === AppConstants.Success) {
			router.back();
		}
	};

	return (
		<div className="mb-54 mt-1 flex h-full flex-col">
			<h2 className="text-24 mx-24 font-semibold">
				Add Follow-up Details
			</h2>
			<h6 className="text-black-1/50 mx-24 mb-24">
				We will remind you when follow-up is due
			</h6>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-1 flex-col"
				>
					<div className="mx-24 flex max-w-lg flex-1 flex-col gap-6">
						<FormField
							control={form.control}
							name="followUpType"
							render={({ field: selectField, fieldState }) => {
								return (
									<FormItem className="col-span-1">
										<FormLabel>Type</FormLabel>
										<Select
											onValueChange={selectField.onChange}
											defaultValue={selectField.value}
											value={selectField.value}
										>
											<FormControl>
												<SelectTrigger
													isError={!!fieldState.error}
													className="!mt-1 bg-white"
												>
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
								const dateValue =
									field.value?.map((d) => new Date(d)) || [];

								return (
									<FormItem className="col-span-1 flex flex-col">
										<FormLabel>
											Choose Followup Complete Date
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
															{field.value?.length
																? field.value
																		.map(
																			(
																				d
																			) =>
																				format(
																					new Date(
																						d
																					),
																					'PPP'
																				)
																		)
																		.join(
																			', '
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
													mode="multiple"
													selected={dateValue}
													onSelect={(
														selectedDates
													) => {
														const isoDates =
															selectedDates?.map(
																(date) =>
																	date.toISOString()
															) || [];
														field.onChange(
															isoDates
														);
													}}
													disabled={(date) => {
														return dateDisable(
															date
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
					{stepper.isLast && (
						<div className="shadow-top sticky bottom-0 left-0 flex w-full justify-end gap-16 rounded-b-lg bg-white px-24 py-16">
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
				</form>
			</Form>
		</div>
	);
}
