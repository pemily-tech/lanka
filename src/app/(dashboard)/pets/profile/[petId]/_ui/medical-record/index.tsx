'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import { useMedicalRecord } from '../../../../../medical-records/_hooks/use-medical-record';
import Filters from '../../../../../medical-records/_ui/filters';

import ActionButton from '@/components/medical-records/action-button';
import MedicalRecordForm from '@/components/medical-records/form';
import { medicalRecordFilters } from '@/helpers/constant';
import { type IMedicalRecordFilter } from '@/types/common';
import { DataTable } from '@/ui/data-table';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';

export default function MedicalRecord() {
	const { date, filter, setState, columns, medicalRecords, isPending } =
		useMedicalRecord();
	const [show, setShow] = useState(false);
	const params = useParams();
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId') as string;
	const petId = params?.petId as string;

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
			<Dialog open={show} onOpenChange={setShow}>
				<DialogContent className="max-w-3xl">
					<DialogHeader>
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<DialogDescription />
					<MedicalRecordForm
						parentId={parentId}
						petId={petId}
						filterType={filter as IMedicalRecordFilter}
						isModal={true}
						onFinish={() => setShow(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
