'use client';

import { useMedicalRecord } from '../../../../../medical-records/_hooks/use-medical-record';
import Filters from '../../../../../medical-records/_ui/filters';

import { DataTable } from '@/ui/data-table';

export default function MedicalRecord() {
	const { date, filter, setState, columns, medicalRecords, isPending } =
		useMedicalRecord();

	return (
		<div className="mb-[54px]">
			<div className="mb-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setFilter={(filter) => setState({ filter })}
					filter={filter}
					showCalendar={false}
				/>
			</div>
			<DataTable
				columns={columns}
				data={medicalRecords}
				isPending={isPending}
				getRowId={(row) => row._id}
				emptyMessage="Nothing Records found."
			/>
		</div>
	);
}
