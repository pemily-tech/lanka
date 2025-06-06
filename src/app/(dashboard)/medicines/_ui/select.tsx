import useGetDropdownList from '../../../../api/use-get-dropdown-list/get-dropdown-list';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../ui/shared';

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
