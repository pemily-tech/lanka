import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../../ui/form';

import { useGetDropdownList } from '@/api/queries/use-get-dropdownlist';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

export default function SelectField({
	apiKey,
	form,
	name,
	label,
}: {
	apiKey: string;
	form: any;
	name: string;
	label: string;
}) {
	const { data } = useGetDropdownList(apiKey);

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field: selectField, fieldState }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
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
							{data?.data?.dropdown?.map(
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
