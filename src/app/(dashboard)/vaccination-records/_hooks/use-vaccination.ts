/* eslint-disable indent */
import { type DateRange } from 'react-day-picker';
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
	const [{ start, end, filter, page }, setState] = useQueryStates({
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
			defaultValue: 'PENDING',
			parse: (val) => val as IOtherCommonFilter,
			serialize: (val) => val,
		},
		page: {
			defaultValue: 0,
			parse: Number,
			serialize: String,
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
				page,
			};

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

	const handlePagination = (newPage: any) => {
		setState({ page: newPage });
	};

	const handleFilters = (newFilter: IOtherCommonFilter) => {
		setState({ filter: newFilter });
		handlePagination(0);
	};

	return {
		selectedDateRange,
		setState,
		filter,
		isPending,
		vaccinationRecords,
		columns,
		page,
		handlePagination,
		totalCount: data?.data?.totalCount ?? 0,
		handleFilters,
	};
}
