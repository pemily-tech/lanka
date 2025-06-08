'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams, useSearchParams } from 'next/navigation';

import { useMedicalRecord } from '../../../../../medical-records/_hooks/use-medical-record';
import Filters from '../../../../../medical-records/_ui/filters';

import ActionButton from '@/components/medical-records/action-button';
import { medicalRecordFilters } from '@/helpers/constant';
import { DataTable } from '@/ui/data-table';
import Spinner from '@/ui/spinner';

const MedicalRecordDialog = dynamic(() => import('./dialog'), {
	loading: () => <Spinner />,
	ssr: false,
});

export default function MedicalRecord() {
	const { date, filter, setState, columns, medicalRecords, isPending } =
		useMedicalRecord();
	const [show, setShow] = useState(false);
	const params = useParams();
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId') as string;
	const petId = params?.petId as string;
	console.log(show);

	return (
		<div className="mb-[54px]">
			<div className="mb-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setFilter={(filter) => setState({ filter })}
					filter={filter}
					showCalendar={false}
				>
					<ActionButton
						filters={medicalRecordFilters}
						filter={filter}
						onClick={() => setShow(!show)}
					/>
				</Filters>
			</div>
			<DataTable
				columns={columns}
				data={medicalRecords}
				isPending={isPending}
				getRowId={(row) => row._id}
				emptyMessage="Nothing Records found."
			/>
			<MedicalRecordDialog
				show={show}
				setShow={setShow}
				parentId={parentId}
				petId={petId}
			/>
		</div>
	);
}
