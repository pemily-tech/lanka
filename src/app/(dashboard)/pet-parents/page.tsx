'use client';

import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { useUpdateUrl } from '../../../hooks/use-update-url';
import { useGetPetParentsList } from './_api/use-get-pet-parent';
import { useColumns } from './_ui/columns';
import { DataTable } from './_ui/data-table';
import Filters from './_ui/filters';

import { type IPetParent } from '@/types/clinic';
import { PaginationWithLinks } from '@/ui/pagination-with-links';

export default function Page() {
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const { limit, page, handlePagination } = useUpdateUrl();
	const columns = useColumns();
	const { data, isPending } = useGetPetParentsList({
		searchTerm,
		limit,
		page,
		count: 1,
	});
	const parentData = data?.data?.parents || ([] as IPetParent[]);
	const totalCount = data?.data?.totalCount || 0;

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setInput(val);
		debouncedSearch(val);
	};

	return (
		<div className="">
			<Filters value={input} handleChange={handleChange} />
			<div className="shadow-card relative my-3 rounded-lg bg-white">
				<DataTable
					columns={columns}
					data={parentData}
					isPending={isPending}
					getRowId={(row) => row.parent.parentId}
					emptyMessage="Nothing found."
				/>
			</div>
			<PaginationWithLinks
				page={page}
				pageSize={Number(limit)}
				totalCount={totalCount}
				handlePagination={handlePagination}
				className="flex flex-1 items-center justify-end gap-3"
				limit={limit}
			/>
		</div>
	);
}
