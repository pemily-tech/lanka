/* eslint-disable indent */
import { type DateRange } from 'react-day-picker';
import { format, parseISO, startOfToday } from 'date-fns';
import { useParams } from 'next/navigation';
import { useQueryStates } from 'nuqs';
import { date } from 'zod';

import { useGetMedicalRecord } from '../_api/use-get-medical-record';
import { useColumns } from '../_ui/columns';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IMedicalRecord } from '@/types/clinic';
import { type IMedicalRecordFilter } from '@/types/common';

export function useMedicalRecord() {
	const today = startOfToday();
	const params = useParams();
	const petId = params?.petId as string | undefined;
	const [{ start, end, filter }, setState] = useQueryStates({
		start: {
			defaultValue: format(today, DEFAULT_DATE_FORMAT),
			parse: parseISO,
			serialize: (date: Date) => format(date, DEFAULT_DATE_FORMAT),
		},
		end: {
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
	const selectedDateRange = {
		from: start ?? today,
		to: end ?? today,
	} as DateRange;
	const props = petId
		? { petId }
		: {
				startDate: selectedDateRange.from
					? format(selectedDateRange.from, DEFAULT_DATE_FORMAT)
					: format(new Date(), DEFAULT_DATE_FORMAT),
				endDate: selectedDateRange.to
					? format(selectedDateRange.to, DEFAULT_DATE_FORMAT)
					: format(new Date(), DEFAULT_DATE_FORMAT),
			};

	const { data, isPending } = useGetMedicalRecord({
		type: filter as IMedicalRecordFilter,
		...props,
	});
	const medicalRecords =
		data?.data?.medicalRecords || ([] as IMedicalRecord[]);
	const columns = useColumns({
		type: filter as IMedicalRecordFilter,
		...props,
	});

	return {
		isPending,
		medicalRecords,
		columns,
		setState,
		filter,
		date,
	};
}
