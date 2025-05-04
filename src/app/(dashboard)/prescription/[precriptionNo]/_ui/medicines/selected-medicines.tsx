import { DataTable } from '../../../../../../ui/shared/data-table';
import { useMedicineSearchStore } from '../../_store/medicine-search';
import { useColumns } from './medicine-columns';

export default function SelectedMedicines() {
	const selectedMedicines = useMedicineSearchStore(
		(s) => s.selectedMedicines
	);
	const columns = useColumns();

	return (
		<div className="mt-12 max-h-[380px] min-h-[280px]">
			{selectedMedicines.length > 0 && (
				<DataTable
					columns={columns}
					data={selectedMedicines}
					isPending={false}
					getRowId={(row) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			)}
			{/* {selectedMedicines.map((medicine, i) => (
				<div className="mb-12 flex flex-row gap-12" key={medicine._id}>
					<span>{i + 1}. </span>
					<div className="flex flex-row flex-wrap gap-12">
						<span>{medicine.name}</span>
						{(
							[
								['dose', 'Dose', 'MEDICINE_DOSE'],
								['duration', 'Duration', 'MEDICINE_DURATION'],
								[
									'frequency',
									'Frequency',
									'MEDICINE_FREQUENCY',
								],
								['strength', 'Strength', 'MEDICINE_STRENGTH'],
								['interval', 'Interval', 'MEDICINE_INTERVAL'],
								['take', 'Take', 'MEDICINE_TAKE'],
							] as [keyof IMedicine, string, string][]
						).map(([name, label, option]) => (
							<SelectMedicineType
								key={name}
								value={medicine[name] as string}
								label={label}
								apiKey={option}
								name={name}
								medicineId={medicine._id}
								onChange={updateMedicineField}
							/>
						))}
					</div>
				</div>
			))} */}
		</div>
	);
}
