/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';

import { useCreateVaccination } from '../_api/use-create-vaccination';
import { useGetVaccinationList } from '../_api/use-get-vaccination-list';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { AppConstants } from '@/helpers/primitives';
import { cn, dateDisable } from '@/helpers/utils';
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
	vaccinationDates: z
		.array(z.string().min(1))
		.min(1, 'Please pick at least one vaccination date'),
	vaccineName: z.string().nonempty('Please select a vaccine'),
});

type IFormData = z.infer<typeof schema>;

export default function VaccinationForm({
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
			vaccinationDates: [],
			vaccineName: '',
		},
	});
	const { data } = useGetVaccinationList();
	const vaccinationData =
		data?.data?.vaccination || ([] as { label: string; value: string }[]);
	const { mutateAsync: createVaccination, isPending } =
		useCreateVaccination();

	const onSubmit = async (values: IFormData) => {
		const data = {
			petId,
			parentId,
			vaccineName: values.vaccineName,
			vaccinationDates: values.vaccinationDates.map((d) =>
				format(d, DEFAULT_DATE_FORMAT)
			),
		};
		const response = await createVaccination(data);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: [
					'clinic/vaccinationRecords',
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
				Add Vaccination Details
			</h2>
			<h6 className="mx-6 mb-6 text-black/50">
				We will remind you when vaccination is due
			</h6>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-1 flex-col"
				>
					<div className="mx-6 flex max-w-lg flex-1 flex-col gap-6">
						<FormField
							control={form.control}
							name="vaccineName"
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
												{vaccinationData.map(
													(item, i) => {
														return (
															<SelectItem
																key={`${i}`}
																value={
																	item.value
																}
															>
																{item.label}
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
							name="vaccinationDates"
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
