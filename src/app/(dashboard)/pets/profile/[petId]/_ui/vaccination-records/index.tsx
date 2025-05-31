'use client';

import { useVaccination } from '../../../../../vaccination-records/_hooks/use-vaccination';
import Filters from '../../../../../vaccination-records/_ui/filters';

import { DataTable } from '@/ui/data-table';

export default function VaccinationRecord() {
	const { date, setState, filter, columns, vaccinationRecords, isPending } =
		useVaccination();

	return (
		<div className="mb-[54px]">
			<div className="mb-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setCommonFilter={(filter) => setState({ filter })}
					commonFilter={filter}
					showCalendar={false}
					isPet={true}
				/>
			</div>
			<DataTable
				columns={columns}
				data={vaccinationRecords}
				isPending={isPending}
				getRowId={(row) => row._id}
				emptyMessage="Nothing found for the day."
			/>
		</div>
	);
}
