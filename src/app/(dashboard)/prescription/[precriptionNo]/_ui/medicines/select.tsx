import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../../ui/select';

import { useGetDropdownList } from '@/api/queries/use-get-dropdownlist';

export default function SelectMedicineType({
	value,
	label,
	apiKey,
	onChange,
}: {
	value: string;
	label: string;
	apiKey: string;
	onChange: (value: string) => void;
}) {
	const { data } = useGetDropdownList(apiKey);

	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="h-12 w-[280px]">
				<SelectValue placeholder={label} />
			</SelectTrigger>
			<SelectContent>
				{data?.data?.dropdown?.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
