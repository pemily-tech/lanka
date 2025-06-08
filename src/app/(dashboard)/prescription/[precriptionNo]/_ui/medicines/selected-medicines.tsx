import { type IMedicine } from '../../../../../../types/prescription';
import { DataTable } from '../../../../../../ui/data-table';
import { useColumns } from './medicine-columns';

export default function SelectedMedicines({
	selectedMedicines,
	isPrescriptionSaved,
}: {
	selectedMedicines: IMedicine[];
	isPrescriptionSaved: boolean;
}) {
	const columns = useColumns(isPrescriptionSaved);

	return (
		<div className="mt-3 max-h-[380px] min-h-[280px] overflow-y-scroll">
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
