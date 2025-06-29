'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useSearchParams } from 'next/navigation';

import { useVaccination } from '../../../../../vaccination-records/_hooks/use-vaccination';
import Filters from '../../../../../vaccination-records/_ui/filters';

import { ActionRecordButton } from '@/components/action-button';
import { type IOtherCommonFilter } from '@/types/common';
import { DataTable } from '@/ui/data-table';
import Spinner from '@/ui/spinner';

const VaccinationDialog = dynamic(() => import('./dialog'), {
	loading: () => <Spinner />,
	ssr: false,
});

export default function VaccinationRecord() {
	const { date, setState, filter, columns, vaccinationRecords, isPending } =
		useVaccination();
	const [show, setShow] = useState(false);
	const params = useParams();
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId') as string;
	const petId = params?.petId as string;

	return (
		<div className="mb-[54px]">
			<div className="mb-4">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
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
