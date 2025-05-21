import useGetDropdownList from '../../../../../../api/use-get-dropdown-list/get-dropdown-list';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../../ui/shared/select';

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
			<SelectTrigger className="h-32 w-[280px]">
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
