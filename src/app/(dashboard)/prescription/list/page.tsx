'use client';

import { format, parseISO, startOfToday } from 'date-fns';
import { useQueryStates } from 'nuqs';
import { date } from 'zod';

import { type IPrescription } from '../../../../types/prescription';
import { PaginationWithLinks } from '../../../../ui/shared';
import { useUpdateUrl } from '../../medicines/list/_hooks/use-update-url';
import { useGetPrescriptions } from './_api/use-get-prescription';
import Filters from './_ui/filters';
import Listing from './_ui/list';

export default function Page() {
	const today = startOfToday();
	const [{ date }, setDate] = useQueryStates({
		date: {
			defaultValue: format(today, 'yyyy-MM-dd'),
			parse: parseISO,
			serialize: (date: Date) => format(date, 'yyyy-MM-dd'),
		},
	});
	const selectedDate = date ?? today;
	const { data, isPending } = useGetPrescriptions({
		count: 1,
		prescriptionDate: format(selectedDate, 'yyyy-MM-dd'),
	});
	const medicineData = data?.data?.prescriptions || ([] as IPrescription[]);
	const totalCount = data?.data?.totalCount || 0;
	const { limit, page, handlePagination } = useUpdateUrl();

	return (
		<div>
			<div className="rounded-8 shadow-card1 bg-white p-16">
				<Filters selectedDate={selectedDate} setDate={setDate} />
			</div>
			<div className="shadow-card1 rounded-8 relative my-12 bg-white">
				<Listing data={medicineData} isPending={isPending} />
			</div>
			<div className="rounded-8 shadow-card1 flex items-center justify-between gap-24 bg-white p-16">
				<div className="flex-1">
					Showing Results: {page * Number(limit) + 1}-
					{Math.min((page + 1) * Number(limit), totalCount ?? 0)} of{' '}
					{totalCount}
				</div>
				<PaginationWithLinks
					page={page}
					pageSize={Number(limit)}
					totalCount={totalCount ?? 0}
					handlePagination={handlePagination}
					className="flex flex-1 items-center justify-end gap-12"
				/>
			</div>
		</div>
	);
}
