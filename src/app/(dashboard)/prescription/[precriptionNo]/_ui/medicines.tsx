import { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { PencilLine } from 'lucide-react';

import { type IMedicine } from '../../../../../types/prescription';
import { Button } from '../../../../../ui/shared';
import { AutoComplete } from '../../../../../ui/shared/auto-complete';
import { useGetMedicines } from '../../../medicines/list/_api/use-get-medicines';

export default function Medicines() {
	const [toggleSearch, setToggleSearch] = useState(false);
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [selected, setSelected] = useState<IMedicine | null>(null);
	const [selectedMedicines, setSelectedMedicines] = useState<IMedicine[]>([]);

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setInput(val);
		debouncedSearch(val);
	};

	const { data, isPending } = useGetMedicines({
		count: 1,
		searchTerm,
		page: 0,
	});
	const medicinesData = useMemo(
		() => data?.data?.medicines || ([] as IMedicine[]),
		[data]
	);

	const handleKeyDown = (value: string) => {
		const optionToSelect = medicinesData.find(
			(option) => option.name === value
		);
		if (optionToSelect) {
			setSelected(optionToSelect);
			setSelectedMedicines((prev) => {
				const exists = prev.some(
					(med) => med._id === optionToSelect._id
				);
				return exists ? prev : [...prev, optionToSelect];
			});
		}
	};

	const handleSelect = (option: IMedicine) => {
		setInput(option.name);
		setSelected(option);
		setSelectedMedicines((prev) => {
			const exists = prev.some((med) => med._id === option._id);
			return exists ? prev : [...prev, option];
		});
	};

	const handleBlur = () => {
		setInput(selected?.name || '');
	};
	console.log(selectedMedicines);

	return (
		<div className="border-l px-16 pt-16">
			<div className="flex flex-row items-center gap-8">
				<h4 className="text-16 text-primary font-semibold">
					Medicine (RX)
				</h4>
				<Button
					onClick={() => setToggleSearch(!toggleSearch)}
					className=""
					size="icon"
					variant="ghost"
				>
					<PencilLine className="text-primary size-16" />
				</Button>
			</div>
			{toggleSearch && (
				<div className="mt-12">
					<AutoComplete<IMedicine>
						options={medicinesData as IMedicine[]}
						renderOption={(option) => (
							<div className="text-sm text-gray-900">
								{option.name}
							</div>
						)}
						isLoading={isPending}
						emptyMessage="No results"
						handleDownKey={handleKeyDown}
						handleSelect={handleSelect}
						handleBlur={handleBlur}
						value={input}
						onValueChange={handleChange}
						placeholder="Search for medicines..."
					/>
				</div>
			)}
			<div className="h-[380px]"></div>
		</div>
	);
}
