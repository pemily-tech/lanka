'use client';

import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useQueryStates } from 'nuqs';

import { useColumns } from './_ui/columns';
import Filters from './_ui/filters';

import { useGetItems } from '@/api/queries/use-get-items';
import { useUpdateUrl } from '@/hooks/use-update-url';
import { type IItem } from '@/types/bills-items';
import { DataTable } from '@/ui/data-table';
import { PaginationWithLinks } from '@/ui/pagination-with-links';

export default function Page() {
	const [{ type, quantity }, setState] = useQueryStates({
		type: {
			defaultValue: 'PRODUCT',
			parse: (val: string) =>
				val === 'PRODUCT' || val === 'SERVICE' ? val : 'PRODUCT',
			serialize: (val: 'PRODUCT' | 'SERVICE') => val,
		},
		quantity: {
			defaultValue: null,
			parse: (val: string) => val ?? null,
			serialize: (val) => val ?? '',
		},
	});
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const { limit, page, handlePagination } = useUpdateUrl();
	const columns = useColumns();

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setInput(val);
		debouncedSearch(val);
		if (page !== 0) {
			handlePagination(0);
		}
	};

	const { data, isPending } = useGetItems({
		searchTerm,
		type: type as 'PRODUCT' | 'SERVICE',
		count: 1,
		page,
		limit,
		...(quantity ? { qty: Number(quantity) } : {}),
	});
	const itemsData = data?.data?.items || ([] as IItem[]);
	const totalCount = data?.data?.totalCount || 0;

	return (
		<div className="mb-[54px]">
			<div className="rounded-lg bg-white p-4 shadow-md">
				<Filters
					value={input}
					setValue={handleChange}
					type={type as 'PRODUCT' | 'SERVICE'}
					setState={setState}
					quantity={quantity}
				/>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={columns}
					data={itemsData}
					isPending={isPending}
					getRowId={(row) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			</div>
			<PaginationWithLinks
				page={page}
				pageSize={Number(limit)}
				totalCount={totalCount ?? 0}
				handlePagination={handlePagination}
				limit={limit}
				className="flex flex-1 items-center justify-end gap-3"
			/>
		</div>
	);
}
