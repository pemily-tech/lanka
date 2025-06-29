'use client';

import { format } from 'date-fns';
import Link from 'next/link';

import { useVaccination } from './_hooks/use-vaccination';
import Filters from './_ui/filters';

import { ActionRecordButton } from '@/components/action-button';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { RecordTypes } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { DataTable } from '@/ui/data-table';

export default function Page() {
	const { date, setState, filter, columns, vaccinationRecords, isPending } =
		useVaccination();

	return (
		<div className="mb-[54px]">
			<div className="sticky top-[76px] z-20 rounded-lg bg-white p-4 shadow-md">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setCommonFilter={(filter) => setState({ filter })}
					commonFilter={filter}
				>
					<Link
						href={`${Routes.SELECT_PET}?recordType=${RecordTypes.Vaccination}&filter=${filter}&date=${format(date as Date, DEFAULT_DATE_FORMAT)}`}
					>
						<ActionRecordButton title="Add Vaccination" />
					</Link>
				</Filters>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
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
