import { type IMedicine } from '../../../../../../types/prescription';
import { AutoComplete } from '../../../../../../ui/auto-complete';
import { useMedicineStore } from '../../_store/medicine-store';

type Props = {
	medicines: IMedicine[];
	isPending: boolean;
};

export function Search({ medicines, isPending }: Props) {
	const { input, setInput, selectMedicine, resetSearch } = useMedicineStore();

	const handleDownKey = (val: string) => {
		const selected = medicines.find((med) => med.name === val);
		if (selected) selectMedicine(selected);
	};

	return (
		<AutoComplete<IMedicine>
			options={medicines}
			value={input}
			onValueChange={setInput}
			isLoading={isPending}
			emptyMessage="No results"
			handleDownKey={handleDownKey}
			handleSelect={selectMedicine}
			handleBlur={resetSearch}
			placeholder="Search for medicines..."
			renderOption={(option) => {
				return (
					<div className="text-sm text-gray-900">
						{option.name} - {option.strength}
					</div>
				);
			}}
		/>
	);
}
