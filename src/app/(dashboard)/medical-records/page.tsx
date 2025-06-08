'use client';

import { format } from 'date-fns';
import Link from 'next/link';

import { useMedicalRecord } from './_hooks/use-medical-record';
import Filters from './_ui/filters';

import ActionButton from '@/components/medical-records/action-button';
import { DEFAULT_DATE_FORMAT, medicalRecordFilters } from '@/helpers/constant';
import { RecordTypes } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { DataTable } from '@/ui/data-table';

export default function Page() {
	const { date, filter, setState, columns, medicalRecords, isPending } =
		useMedicalRecord();

	return (
		<div className="mb-[54px]">
			<div className="sticky top-0 z-20 rounded-lg bg-white p-4 shadow-md">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setFilter={(filter) => setState({ filter })}
					filter={filter}
				>
					<Link
						href={`${Routes.SELECT_PET}?recordType=${RecordTypes.Medical}&filter=${filter}&date=${format(date as Date, DEFAULT_DATE_FORMAT)}`}
					>
						<ActionButton
							filters={medicalRecordFilters}
							filter={filter}
						/>
					</Link>
				</Filters>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
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
