'use client';

import { useFollowup } from '../../../../../follow-up/_hooks/use-follwups';
import Filters from '../../../../../follow-up/_ui/filters';

import { DataTable } from '@/ui/shared/data-table';

export default function Followups() {
	const { date, filter, setState, columns, followupData, isPending } =
		useFollowup();

	return (
		<div className="mb-[54px]">
			<div className="mb-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setFilter={(filter) => setState({ filter })}
					filter={filter}
					showCalendar={false}
					isPet={true}
				/>
			</div>
			<DataTable
				columns={columns}
				data={followupData}
				isPending={isPending}
				getRowId={(row) => row._id}
				emptyMessage="Nothing Records found."
			/>
		</div>
	);
}
