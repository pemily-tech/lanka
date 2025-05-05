import { DataTable } from '../../../../../../ui/shared/data-table';
import { useMedicineStore } from '../../_store/medicine-store';
import { useColumns } from './medicine-columns';

export default function SelectedMedicines() {
	const selectedMedicines = useMedicineStore((s) => s.selectedMedicines);
	const columns = useColumns();

	return (
		<div className="mt-12 max-h-[380px] min-h-[280px] overflow-y-scroll">
			{selectedMedicines.length > 0 && (
				<DataTable
					columns={columns}
					data={selectedMedicines}
					isPending={false}
					getRowId={(row) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			)}
		</div>
	);
}
