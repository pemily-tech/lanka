'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import dynamic from 'next/dynamic';
import { useParams, useSearchParams } from 'next/navigation';

import { useVaccination } from '../../../../../vaccination-records/_hooks/use-vaccination';
import Filters from '../../../../../vaccination-records/_ui/filters';

import { ActionRecordButton } from '@/components/action-button';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IOtherCommonFilter } from '@/types/common';
import { DataTable } from '@/ui/data-table';
import Spinner from '@/ui/spinner';

const VaccinationDialog = dynamic(() => import('./dialog'), {
	loading: () => <Spinner />,
	ssr: false,
});

export default function VaccinationRecord() {
	const {
		selectedDateRange,
		setState,
		filter,
		columns,
		vaccinationRecords,
		isPending,
	} = useVaccination();
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
					setCommonFilter={(filter) => setState({ filter })}
					commonFilter={filter}
					showCalendar={false}
					isPet={true}
				>
					<ActionRecordButton
						title="Add Vaccination"
						onClick={() => setShow(!show)}
					/>
				</Filters>
			</div>
			<DataTable
				columns={columns}
				data={vaccinationRecords}
				isPending={isPending}
				getRowId={(row) => row._id}
				emptyMessage="Nothing found for the day."
			/>
			<VaccinationDialog
				show={show}
				setShow={setShow}
				parentId={parentId}
				petId={petId}
				filter={filter as IOtherCommonFilter}
			/>
		</div>
	);
}
