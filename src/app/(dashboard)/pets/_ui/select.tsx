import { type IPetFormData } from './schema';

import {
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

export function SelectType({
	form,
	options,
	name,
	label,
}: {
	form: any;
	options: {
		label: string;
		value: string;
	}[];
	name: string;
	label: string;
}) {
	return (
		<FormField
			control={form.control}
			name={name as keyof IPetFormData}
			render={({ field: selectField, fieldState }) => (
				<FormItem>
					<FormLabel>{label as string}</FormLabel>
					<Select
						onValueChange={selectField.onChange}
						value={selectField.value}
					>
						<FormControl>
							<SelectTrigger
								isError={!!fieldState.error}
								className="!mt-1 bg-white"
							>
								<SelectValue placeholder={`Select ${label}`} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options?.map(
								(option: { value: string; label: string }) => (
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
