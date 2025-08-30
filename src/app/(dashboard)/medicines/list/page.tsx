'use client';

import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import { useGetMedicines } from './_api/use-get-medicines';
import { useColumns } from './_ui/columns';
import Filters from './_ui/filters';

import { useUpdateUrl } from '@/hooks/use-update-url';
import { type IMedicine } from '@/types/prescription';
import { DataTable } from '@/ui/data-table';
import { PaginationWithLinks } from '@/ui/pagination-with-links';

export default function Page() {
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const columns = useColumns();

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setInput(val);
		debouncedSearch(val);
	};
	const { limit, page, handlePagination, active, setActive } = useUpdateUrl();

	const { data, isPending } = useGetMedicines({
		count: 1,
		searchTerm,
		active,
		limit,
		page,
	});

	const medicineData = data?.data?.medicines || ([] as IMedicine[]);
	const totalCount = data?.data?.totalCount || 0;

	return (
		<div className="mb-[54px]">
			<div className="rounded-lg bg-white p-4 shadow-md">
				<Filters
					value={input}
					setValue={handleChange}
					active={active}
					setActive={setActive}
				/>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={columns}
					data={medicineData}
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
