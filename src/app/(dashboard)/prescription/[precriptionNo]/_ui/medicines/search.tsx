import { type IMedicine } from '../../../../../../types/prescription';
import { AutoComplete } from '../../../../../../ui/shared/auto-complete';
import { useMedicineSearchStore } from '../../_store/medicine-search';

type Props = {
	medicines: IMedicine[];
	isPending: boolean;
};

export function Search({ medicines, isPending }: Props) {
	const { input, setInput, selectMedicine, resetSearch } =
		useMedicineSearchStore();

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
			renderOption={(option) => (
				<div className="text-sm text-gray-900">{option.name}</div>
			)}
		/>
	);
}
