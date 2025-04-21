'use client';

import { useQueryStates } from 'nuqs';

import { type IMedicine } from '../../../../types/prescription';
import { PaginationWithLinks } from '../../../../ui/shared';
import page from '../create/page';
import { useGetMedicines } from './_api/use-get-medicines';
import { useUpdateUrl } from './_hooks/use-update-url';
import Filters from './_ui/filters';
import Listing from './_ui/list';

export default function Page() {
	const { data, isPending } = useGetMedicines({ count: 1 });
	const medicineData = data?.data?.medicines || ([] as IMedicine[]);
	const totalCount = data?.data?.totalCount || 0;
	const { limit, page, handlePagination } = useUpdateUrl();

	return (
		<div>
			<div className="rounded-8 shadow-card1 bg-white p-16">
				<Filters />
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
