'use client';

import { useVaccination } from './_hooks/use-vaccination';
import Filters from './_ui/filters';

import { DataTable } from '@/ui/data-table';

export default function Page() {
	const { date, setState, filter, columns, vaccinationRecords, isPending } =
		useVaccination();

	return (
		<div className="mb-[54px]">
			<div className="rounded-8 shadow-card1 sticky top-0 z-20 bg-white p-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setCommonFilter={(filter) => setState({ filter })}
					commonFilter={filter}
				/>
			</div>
			<div className="shadow-card1 rounded-8 relative my-12 bg-white">
				<DataTable
					columns={columns}
					data={vaccinationRecords}
					isPending={isPending}
					getRowId={(row) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			</div>
		</div>
	);
}
