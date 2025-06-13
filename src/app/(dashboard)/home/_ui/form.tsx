'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useVaccinationExcel } from '../_api/analytics';

import { AppConstants } from '@/helpers/primitives';
import { getMonths, getYears } from '@/helpers/utils';
import { Button } from '@/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

const schema = z.object({
	year: z.string().nonempty('Please select a year'),
	month: z.string().nonempty('Please select a month'),
});

type IFormData = z.infer<typeof schema>;

export function HomeForm() {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			year: '',
			month: '',
		},
	});
	const years: any[] = getYears();
	const months: any[] = getMonths();
	const { mutateAsync: vaccinationExcel, isPending } = useVaccinationExcel();

	const fields: {
		name: keyof IFormData;
		label: string;
		placeholder: string;
		options: { label: string; value: string }[];
	}[] = [
		{
			name: 'year',
			label: 'Choose a year',
			placeholder: 'Select a year',
			options: years,
		},
		{
			name: 'month',
			label: 'Choose a month',
			placeholder: 'Select a month',
			options: months,
		},
	];

	const onSubmit = async (values: IFormData) => {
		const { year, month } = values;
		const payload = {
			type: 'VACCINATION',
			year: Number(year),
			month: Number(month),
		};
		const response = await vaccinationExcel(payload);
		if (
			response.status === AppConstants.Success &&
			response?.data?.signedUrl
		) {
			window.location.href = response.data.signedUrl;
			form.reset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-3 mt-4"
			>
				{fields.map(({ name, label, placeholder, options }) => {
					return (
						<FormField
							key={name}
							control={form.control}
							name={name}
							render={({ field: selectField }) => {
								return (
									<FormItem className="col-span-1 gap-[2px]">
										<FormLabel className="text-xs font-semibold">
											{label}
										</FormLabel>
										<Select
											onValueChange={selectField.onChange}
											defaultValue={selectField.value}
											value={selectField.value}
										>
											<FormControl>
												<SelectTrigger className="!mt-1 bg-white w-full">
													<SelectValue
														placeholder={
															placeholder
														}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{options?.map((item, i) => {
													return (
														<SelectItem
															key={`${i}`}
															value={item?.value}
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
					);
				})}
				<div className="col-span-2 mt-2">
					<Button
						disabled={isPending}
						type="submit"
						className="w-full"
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
