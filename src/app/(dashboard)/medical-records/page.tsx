'use client';

import { useMedicalRecord } from './_hooks/use-medical-record';
import Filters from './_ui/filters';

import { DataTable } from '@/ui/shared/data-table';

export default function Page() {
	const { date, filter, setState, columns, medicalRecords, isPending } =
		useMedicalRecord();

	return (
		<div className="mb-[54px]">
			<div className="rounded-8 shadow-card1 sticky top-0 z-20 bg-white p-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setFilter={(filter) => setState({ filter })}
					filter={filter}
				/>
			</div>
			<div className="shadow-card1 rounded-8 relative my-12 bg-white">
				<DataTable
					columns={columns}
					data={medicalRecords}
					isPending={isPending}
					getRowId={(row) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			</div>
		</div>
	);
}
