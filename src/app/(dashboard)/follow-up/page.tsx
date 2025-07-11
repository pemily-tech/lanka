/* eslint-disable indent */
'use client';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import { useFollowup } from './_hooks/use-follwups';
import Filters from './_ui/filters';

import { ActionRecordButton } from '@/components/action-button';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { RecordTypes } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { DataTable } from '@/ui/data-table';
import { PaginationWithLinks } from '@/ui/pagination-with-links';

export default function Page() {
	const {
		setState,
		filter,
		columns,
		followupData,
		isPending,
		selectedDateRange,
		page,
		handlePagination,
		totalCount,
	} = useFollowup();

	return (
		<div className="mb-[54px]">
			<div className="sticky top-[76px] z-20 rounded-lg bg-white p-4 shadow-md">
				<Filters
					selectedDate={selectedDateRange}
					setSelectedDate={({ date }) => {
						setState({
							start: date.from
								? parseISO(
										format(date.from, DEFAULT_DATE_FORMAT)
									)
								: new Date(),
							end: date.to
								? parseISO(format(date.to, DEFAULT_DATE_FORMAT))
								: new Date(),
						});
					}}
					setFilter={(filter) => setState({ filter })}
					filter={filter}
				>
					<Link
						href={`${Routes.SELECT_PET}?recordType=${RecordTypes.Followup}&filter=${filter}}`}
					>
						<ActionRecordButton title="Add Followup" />
					</Link>
				</Filters>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={columns}
					data={followupData}
					isPending={isPending}
					getRowId={(row) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			</div>
			<PaginationWithLinks
				page={page}
				pageSize={30}
				totalCount={totalCount ?? 0}
				handlePagination={handlePagination}
				className="flex flex-1 items-center justify-end gap-3"
				limit={30}
			/>
		</div>
	);
}
