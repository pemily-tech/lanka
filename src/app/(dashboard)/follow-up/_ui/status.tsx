/* eslint-disable max-lines-per-function */
/* eslint-disable indent */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle } from 'lucide-react';
import { z } from 'zod';

import { useUpdateFollowUp } from '../_api/use-update-followup';

import { useGetDropdownList } from '@/api/queries/use-get-dropdownlist';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { cn, dateDisable } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IFollowUpRecord } from '@/types/clinic';
import { type IOtherCommonFilter } from '@/types/common';
import { Button } from '@/ui/button';
import { Calendar } from '@/ui/calendar';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog';
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
	followUpCompleteDate: z
		.string()
		.min(1, 'Please pick a follow-up complete date'),
	repeatAfter: z.string().nonempty('Please select a repeat type'),
});

type IFormData = z.infer<typeof schema>;

export default function Status({
	record,
	type,
	date,
	petId,
}: {
	record: IFollowUpRecord;
	type: IOtherCommonFilter;
	date?: string | undefined;
	petId?: string | undefined;
}) {
	const [open, setOpen] = useState(false);
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			followUpCompleteDate: record.followUpCompleteDate ?? '',
			repeatAfter: '',
		},
	});
	const { mutateAsync: updateFollowup, isPending } = useUpdateFollowUp();
	const { data } = useGetDropdownList('REPEAT_AFTERS');
	const dropdownData =
		data?.data?.dropdown || ([] as { label: string; value: string }[]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			id: record._id,
			followUpCompleteDate: format(
				values.followUpCompleteDate,
				DEFAULT_DATE_FORMAT
			),
			repeatAfter: values.repeatAfter,
			active: record.active,
		};
		const response = await updateFollowup(payload);
		if (response.status === 'SUCCESS') {
			setOpen(!open);
			queryClient.invalidateQueries({
				queryKey: ['clinic/followUpRecords', type, petId, date],
			});
		}
	};

	return (
		<div>
			{record?.followUpCompleteDate === null ||
			!record?.followUpCompleteDate ? (
				<Dialog open={open} onOpenChange={() => setOpen(!open)}>
					<DialogTrigger asChild>
						<Button variant="outline" size="lg">
							<span className="font-normal">Complete</span>
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl">
						<DialogHeader>
							<DialogTitle>Update Followup</DialogTitle>
						</DialogHeader>
						<DialogDescription />
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="grid grid-cols-2 gap-24"
							>
								<FormField
									control={form.control}
									name="repeatAfter"
									render={({
										field: selectField,
										fieldState,
									}) => {
										return (
											<FormItem className="col-span-1">
												<FormLabel>Type</FormLabel>
												<Select
													onValueChange={
														selectField.onChange
													}
													defaultValue={
														selectField.value
													}
													value={selectField.value}
												>
													<FormControl>
														<SelectTrigger
															isError={
																!!fieldState.error
															}
															className="!mt-6 bg-white"
														>
															<SelectValue placeholder="Select a type" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{dropdownData.map(
															(item, i) => {
																return (
																	<SelectItem
																		key={`${i}`}
																		value={
																			item.value
																		}
																	>
																		{
																			item.label
																		}
																	</SelectItem>
																);
															}
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										);
									}}
								/>
								<FormField
									control={form.control}
									name="followUpCompleteDate"
									render={({ field }) => {
										const dateValue = field.value
											? new Date(field.value)
											: undefined;

										return (
											<FormItem className="col-span-1 flex flex-col">
												<FormLabel>
													Choose Followup Complete
													Date
												</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={
																	'outline'
																}
																className={cn(
																	'!mt-6 h-48 text-left font-normal',
																	!field.value &&
																		'text-muted-foreground'
																)}
															>
																{field.value
																	? format(
																			new Date(
																				field.value
																			),
																			'PPP'
																		)
																	: 'Pick a date'}
																<CalendarIcon className="ml-auto size-24 opacity-50" />
															</Button>
														</FormControl>
													</PopoverTrigger>
													<PopoverContent
														className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width]"
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
															disabled={(
																date
															) => {
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
								<DialogFooter className="col-span-2 mt-24 flex gap-24">
									<DialogClose>Cancel</DialogClose>
									<Button
										type="submit"
										size="lg"
										variant="secondary"
										disabled={isPending}
									>
										Confirm
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			) : (
				<div className="flex items-center gap-6">
					<CheckCircle className="size-18 text-green-800" />
					<span className="text-green-800">Completed</span>
				</div>
			)}
		</div>
	);
}
