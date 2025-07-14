/* eslint-disable indent */
'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useParams, useSearchParams } from 'next/navigation';

import { useFollowup } from '../../../../../follow-up/_hooks/use-follwups';
import Filters from '../../../../../follow-up/_ui/filters';
import FollowupDialog from './dialog';

import { ActionRecordButton } from '@/components/action-button';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IOtherCommonFilter } from '@/types/common';
import { DataTable } from '@/ui/data-table';

export default function Followups() {
	const {
		selectedDateRange,
		filter,
		setState,
		columns,
		followupData,
		isPending,
	} = useFollowup();
	const [show, setShow] = useState(false);
	const params = useParams();
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId') as string;
	const petId = params?.petId as string;

	return (
		<div className="mb-[54px]">
			<div className="mb-4">
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
					showCalendar={false}
					isPet={true}
				>
					<ActionRecordButton
						title="Add Followup"
						onClick={() => setShow(!show)}
					/>
				</Filters>
			</div>
			<DataTable
				columns={columns}
				data={followupData}
				isPending={isPending}
				getRowId={(row) => row._id}
				emptyMessage="Nothing Records found."
			/>
			<FollowupDialog
				show={show}
				setShow={setShow}
				parentId={parentId}
				petId={petId}
				filter={filter as IOtherCommonFilter}
			/>
		</div>
	);
}
