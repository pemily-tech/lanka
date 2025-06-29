import { format, parseISO, startOfToday } from 'date-fns';
import { useParams } from 'next/navigation';
import { useQueryStates } from 'nuqs';

import { useGetMedicalRecord } from '../_api/use-get-medical-record';
import { useColumns } from '../_ui/columns';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IMedicalRecord } from '@/types/clinic';
import { type IMedicalRecordFilter } from '@/types/common';

export function useMedicalRecord() {
	const today = startOfToday();
	const params = useParams();
	const petId = params?.petId as string | undefined;
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
	const props = petId
		? { petId }
		: { date: format(date as Date, DEFAULT_DATE_FORMAT) };

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
