import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../../ui/form';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

export default function SelectField({
	form,
	name,
	label,
}: {
	form: any;
	name: string;
	label: string;
}) {
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
							<SelectTrigger className="!mt-1 bg-white w-full">
								<SelectValue placeholder="Select a type" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectItem value="PRODUCT">Product</SelectItem>
							<SelectItem value="SERVICE">Service</SelectItem>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
