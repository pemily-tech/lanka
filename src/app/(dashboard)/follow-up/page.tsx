'use client';

import { format, parseISO, startOfToday } from 'date-fns';
import { useQueryStates } from 'nuqs';

import { useUpdateUrl } from '../../../hooks/use-update-url';
import { useGetFollows } from './_api/use-get-followup';
import { useColumns } from './_ui/columns';
import Filters from './_ui/filters';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IFollowUpRecord } from '@/types/clinic';
import { DataTable } from '@/ui/shared/data-table';

export default function Page() {
	const today = startOfToday();
	const [{ date }, setDate] = useQueryStates({
		date: {
			defaultValue: format(today, DEFAULT_DATE_FORMAT),
			parse: parseISO,
			serialize: (date: Date) => format(date, DEFAULT_DATE_FORMAT),
		},
	});

	const { setCommonFilter, commonFilter } = useUpdateUrl();

	const { data, isPending } = useGetFollows({
		type: commonFilter as 'PENDING' | 'COMPLETE' | 'ALL',
		date: format(date as Date, DEFAULT_DATE_FORMAT),
	});
	const columns = useColumns({
		type: commonFilter as 'PENDING' | 'COMPLETE' | 'ALL',
		date: format(date as Date, DEFAULT_DATE_FORMAT),
	});
	const followupData =
		data?.data?.followUpRecords || ([] as IFollowUpRecord[]);

	return (
		<div className="mb-[54px]">
			<div className="rounded-8 shadow-card1 sticky top-0 z-20 bg-white p-16">
				<Filters
					selectedDate={date as Date}
					setSelectedDate={(date) => setDate({ date })}
					setCommonFilter={setCommonFilter}
					commonFilter={commonFilter}
				/>
			</div>
			<div className="shadow-card1 rounded-8 relative my-12 bg-white">
				<DataTable
					columns={columns}
					data={followupData}
					isPending={isPending}
					getRowId={(row) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			</div>
		</div>
	);
}
