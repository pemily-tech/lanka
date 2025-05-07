'use client';

import { useMemo, useState } from 'react';
import { PencilLine } from 'lucide-react';
import { useParams } from 'next/navigation';

import {
	type IMedicine,
	type IPrescription,
} from '../../../../../../types/prescription';
import { Button } from '../../../../../../ui/shared';
import { useGetMedicines } from '../../../../medicines/list/_api/use-get-medicines';
import { useGetPrescriptionById } from '../../_api/use-get-byid';
import { useMedicineStore } from '../../_store/medicine-store';
import { Search } from './search';
import SelectedMedicines from './selected-medicines';

export default function Medicines() {
	const params = useParams();
	const [toggleSearch, setToggleSearch] = useState(false);
	const searchTerm = useMedicineStore((s) => s.searchTerm);
	const { data: prescriptionData } = useGetPrescriptionById(
		params?.precriptionNo as string
	);
	const prescription = useMemo(() => {
		return prescriptionData?.data?.prescription || ({} as IPrescription);
	}, [prescriptionData?.data?.prescription]);
	const selectedMedicines = useMedicineStore((s) => s.selectedMedicines);

	const isPrescriptionSaved = !!prescription.url;

	const { data, isPending } = useGetMedicines({
		count: 1,
		searchTerm,
		page: 0,
	});

	const medicinesData = useMemo(
		() => data?.data?.medicines || ([] as IMedicine[]),
		[data]
	);

	const selectedMedicinesData: IMedicine[] = useMemo(() => {
		if (isPrescriptionSaved) {
			return prescription?.medicines || [];
		}
		return selectedMedicines || [];
	}, [isPrescriptionSaved, selectedMedicines, prescription?.medicines]);

	return (
		<div className="px-16">
			<div className="flex flex-row items-center gap-8">
				<h4 className="text-16 text-primary font-semibold">
					Medicine (RX)
				</h4>
				{!isPrescriptionSaved && (
					<Button
						onClick={() => setToggleSearch(!toggleSearch)}
						className=""
						size="icon"
						variant="ghost"
					>
						<PencilLine className="text-primary size-16" />
					</Button>
				)}
			</div>
			{toggleSearch && (
				<Search medicines={medicinesData} isPending={isPending} />
			)}
			<SelectedMedicines
				selectedMedicines={selectedMedicinesData}
				isPrescriptionSaved={isPrescriptionSaved}
			/>
		</div>
	);
}
