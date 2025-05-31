import { format, parseISO, startOfToday } from 'date-fns';
import { useParams } from 'next/navigation';
import { useQueryStates } from 'nuqs';

import { useGetVaccinations } from '../_api/use-get-vaccination';
import { useColumns } from '../_ui/columns';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IVaccinationRecord } from '@/types/clinic';
import { type IOtherCommonFilter } from '@/types/common';

export function useVaccination() {
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
			defaultValue: 'PENDING',
			parse: (val) => val as IOtherCommonFilter,
			serialize: (val) => val,
		},
	});
	const props = petId
		? { petId }
		: { date: format(date as Date, DEFAULT_DATE_FORMAT) };

	const { data, isPending } = useGetVaccinations({
		type: filter as IOtherCommonFilter,
		...props,
	});
	const columns = useColumns({
		type: filter as IOtherCommonFilter,
		...props,
	});
	const vaccinationRecords =
		data?.data?.vaccinationRecords || ([] as IVaccinationRecord[]);

	return {
		date,
		setState,
		filter,
		isPending,
		vaccinationRecords,
		columns,
	};
}
