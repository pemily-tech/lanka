'use client';

import { useMemo, useState } from 'react';
import { PencilLine } from 'lucide-react';

import { type IMedicine } from '../../../../../../types/prescription';
import { Button } from '../../../../../../ui/shared';
import { useGetMedicines } from '../../../../medicines/list/_api/use-get-medicines';
import { useMedicineStore } from '../../_store/medicine-store';
import { Search } from './search';
import SelectedMedicines from './selected-medicines';

export default function Medicines() {
	const [toggleSearch, setToggleSearch] = useState(false);
	const searchTerm = useMedicineStore((s) => s.searchTerm);

	const { data, isPending } = useGetMedicines({
		count: 1,
		searchTerm,
		page: 0,
	});
	const medicinesData = useMemo(
		() => data?.data?.medicines || ([] as IMedicine[]),
		[data]
	);

	return (
		<div className="px-16">
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
				<Search medicines={medicinesData} isPending={isPending} />
			)}
			<SelectedMedicines />
		</div>
	);
}
