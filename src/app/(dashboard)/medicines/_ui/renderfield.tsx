/* eslint-disable @typescript-eslint/no-explicit-any */
import { type UseFormReturn } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../../ui/form';
import { FloatingTextArea } from '../../../../ui/text-area';
import { type IFormData } from './schema';

import { FloatingInput } from '@/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

export const renderField = (form: UseFormReturn<IFormData>, field: any) => {
	if (field.type === 'select') {
		return (
			<FormField
				key={field.name}
				control={form.control}
				name={field.name}
				render={({ field: selectField, fieldState }) => (
					<FormItem>
						<FormLabel>{field.label}</FormLabel>
						<Select
							onValueChange={selectField.onChange}
							value={selectField.value}
						>
							<FormControl>
								<SelectTrigger
									isError={!!fieldState.error}
									className="!mt-6 bg-white"
								>
									<SelectValue placeholder="Select a type" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								{field.options?.map(
									(option: {
										value: string;
										label: string;
									}) => (
										<SelectItem
											key={option.value}
											value={option.value}
										>
											{option.label}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	}
	if (field.type === 'textarea') {
		return (
			<FormField
				key={field.name}
				control={form.control}
				name={field.name}
				render={({ field: inputField, fieldState }) => (
					<FormItem className="relative col-span-1">
						<FormControl>
							<FloatingTextArea
								label={field.label}
								id={field.name}
								isError={!!fieldState.error}
								{...inputField}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	}
	return (
		<FormField
			key={field.name}
			control={form.control}
			name={field.name}
			render={({ field: inputField, fieldState }) => (
				<FormItem className="relative">
					<FormControl>
						<FloatingInput
							label={field.label}
							id={field.name}
							isError={!!fieldState.error}
							{...inputField}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
