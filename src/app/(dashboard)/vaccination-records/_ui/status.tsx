/* eslint-disable max-lines-per-function */
/* eslint-disable indent */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle } from 'lucide-react';
import { z } from 'zod';

import { useUpdateVaccination } from '../_api/use-update-vaccination';

import { useGetDropdownList } from '@/api/queries/use-get-dropdownlist';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { cn, dateDisable } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IVaccinationRecord } from '@/types/clinic';
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
	vaccinatedOnDate: z
		.string()
		.min(1, 'Please pick a vaccination complete date'),
	repeatAfter: z.string().nonempty('Please select a repeat type'),
});

type IFormData = z.infer<typeof schema>;

export default function Status({
	record,
	type,
	date,
	petId,
}: {
	record: IVaccinationRecord;
	type: IOtherCommonFilter;
	date?: string | undefined;
	petId?: string | undefined;
}) {
	const [open, setOpen] = useState(false);
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			vaccinatedOnDate: record.vaccinatedOnDate ?? '',
			repeatAfter: '',
		},
	});
	const { mutateAsync: updateVaccination, isPending } =
		useUpdateVaccination();
	const { data } = useGetDropdownList('REPEAT_AFTERS');
	const dropdownData =
		data?.data?.dropdown || ([] as { label: string; value: string }[]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			id: record._id,
			vaccinatedOnDate: format(
				values.vaccinatedOnDate,
				DEFAULT_DATE_FORMAT
			),
			repeatAfter: values.repeatAfter,
		};
		const response = await updateVaccination(payload);
		if (response.status === 'SUCCESS') {
			setOpen(!open);
			queryClient.invalidateQueries({
				queryKey: ['clinic/vaccinationRecords', type, petId, date],
			});
		}
	};

	return (
		<div>
			{record?.vaccinatedOnDate === null || !record?.vaccinatedOnDate ? (
				<Dialog open={open} onOpenChange={() => setOpen(!open)}>
					<DialogTrigger asChild>
						<Button variant="outline" className="text-gray-500">
							Complete
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl">
						<DialogHeader>
							<DialogTitle>Update Vaccination</DialogTitle>
						</DialogHeader>
						<DialogDescription />
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="grid grid-cols-2 gap-6"
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
												<FormLabel>
													Repeat same Vaccine after
												</FormLabel>
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
															className="!mt-1 bg-white"
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
									name="vaccinatedOnDate"
									render={({ field }) => {
										const dateValue = field.value
											? new Date(field.value)
											: undefined;

										return (
											<FormItem className="col-span-1 flex flex-col">
												<FormLabel>
													Choose Vaccine Complete Date
												</FormLabel>
												<Popover>
													<PopoverTrigger asChild>
														<FormControl>
															<Button
																variant={
																	'outline'
																}
																className={cn(
																	'!mt-1 h-12 text-left font-normal',
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
																<CalendarIcon className="ml-auto size-6 opacity-50" />
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
								<DialogFooter className="col-span-2 mt-1 flex gap-6">
									<DialogClose>Cancel</DialogClose>
									<Button
										type="submit"
										variant="secondary"
										disabled={isPending}
										className="px-6"
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
					<CheckCircle className="size-4 text-green-800" />
					<span className="text-green-800">Completed</span>
				</div>
			)}
		</div>
	);
}
