'use client';

import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { Pill } from 'lucide-react';
import Link from 'next/link';

import { Routes } from '../../../../helpers/routes';
import { type IMedicine } from '../../../../types/prescription';
import { PaginationWithLinks } from '../../../../ui/shared';
import { DataTable } from '../../../../ui/shared/data-table';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '../../../../ui/shared/tooltip';
import { useGetMedicines } from './_api/use-get-medicines';
import { useUpdateUrl } from './_hooks/use-update-url';
import { useColumns } from './_ui/columns';
import Filters from './_ui/filters';

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
	});

	const medicineData = data?.data?.medicines || ([] as IMedicine[]);
	const totalCount = data?.data?.totalCount || 0;

	return (
		<div className="mb-[54px]">
			<div className="rounded-8 shadow-card1 bg-white p-16">
				<Filters
					value={input}
					setValue={handleChange}
					active={active}
					setActive={setActive}
				/>
			</div>
			<div className="shadow-card1 rounded-8 relative my-12 bg-white">
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
				className="flex flex-1 items-center justify-end gap-12"
			/>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						className="bg-purple shadow-card1 fixed bottom-[12px] right-[12px] flex size-[48px] cursor-pointer items-center justify-center rounded-full border-2 border-white transition-transform duration-200 hover:scale-110"
						href={Routes.MEDICINES_CREATE}
					>
						<Pill className="text-white" />
					</Link>
				</TooltipTrigger>
				<TooltipContent className="border-purple rounded-2xl border bg-white px-12 py-6">
					<p className="text-black-1">Create Medicine</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
