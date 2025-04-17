'use client';

import { useQueryStates } from 'nuqs';

import { type IMedicine } from '../../../../types/prescription';
import { PaginationWithLinks } from '../../../../ui/shared';
import { useGetMedicines } from './_api/use-get-medicines';
import Listing from './_ui/list';

export default function Page() {
	const { data, isPending } = useGetMedicines({ count: 1 });
	const medicineData = data?.data?.medicines || ([] as IMedicine[]);
	const totalCount = data?.data?.totalCount || 0;
	const [{ page, limit, count }, setQuery] = useQueryStates({
		page: {
			defaultValue: 0,
			parse: Number,
			serialize: String,
		},
		limit: {
			defaultValue: 15,
			parse: Number,
			serialize: String,
		},
		count: {
			defaultValue: 1,
			parse: Number,
			serialize: String,
		},
	});
	console.log(medicineData, page, limit, count);

	const handlePagination = (newPage: number | 'next' | 'prev') => {
		const nextPage =
			typeof newPage === 'number'
				? newPage
				: page + (newPage === 'next' ? 1 : -1);
		setQuery({ page: nextPage });
	};

	return (
		<div>
			<div className="shadow-card1 rounded-8 relative bg-white">
				<Listing data={medicineData} isPending={isPending} />
			</div>
			<div className="rounded-8 shadow-card1 mt-12 flex items-center justify-between gap-24 bg-white p-16">
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
