'use client';

import { format, parseISO, setDate, startOfToday } from 'date-fns';
import { useQueryStates } from 'nuqs';

import { useGetMedicalRecord } from './_api/use-get-medical-record';
import { useColumns } from './_ui/columns';
import Filters from './_ui/filters';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IMedicalRecord } from '@/types/clinic';
import { type IMedicalRecordFilter } from '@/types/common';
import { DataTable } from '@/ui/shared/data-table';

export default function Page() {
	const today = startOfToday();
	const [{ date, filter }, setState] = useQueryStates({
		date: {
			defaultValue: format(today, DEFAULT_DATE_FORMAT),
			parse: parseISO,
			serialize: (date: Date) => format(date, DEFAULT_DATE_FORMAT),
		},
		filter: {
			defaultValue: 'PRESCRIPTION',
			parse: (val) => val as IMedicalRecordFilter,
			serialize: (val) => val,
		},
	});

	const { data, isPending } = useGetMedicalRecord({
		type: filter as IMedicalRecordFilter,
		date: format(date as Date, DEFAULT_DATE_FORMAT),
	});
	const medicalRecords =
		data?.data?.medicalRecords || ([] as IMedicalRecord[]);
	const columns = useColumns({
		type: filter as IMedicalRecordFilter,
		date: format(date as Date, DEFAULT_DATE_FORMAT),
	});

	return (
		<div className="mb-[54px]">
			<div className="rounded-8 shadow-card1 sticky top-0 z-20 bg-white p-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setState({ date })}
					setFilter={(filter) => setState({ filter })}
					filter={filter}
				/>
			</div>
			<div className="shadow-card1 rounded-8 relative my-12 bg-white">
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
