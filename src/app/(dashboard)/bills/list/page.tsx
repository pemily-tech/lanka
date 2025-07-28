/* eslint-disable indent */
'use client';

import { useCallback, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { format, parseISO, startOfToday } from 'date-fns';
import debounce from 'lodash.debounce';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useQueryStates } from 'nuqs';

import { useGetBills } from '../_api/use-get-bills';
import { useColumns } from './_ui/columns';

import CommonFilters from '@/components/common-filters';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { Routes } from '@/helpers/routes';
import { useUpdateUrl } from '@/hooks/use-update-url';
import { type IInvoice } from '@/types/bills-items';
import { Badge } from '@/ui/badge';
import { DataTable } from '@/ui/data-table';
import { PaginationWithLinks } from '@/ui/pagination-with-links';
import Spinner from '@/ui/spinner';

const ParentModal = dynamic(() => import('./_ui/parent-modal'), {
	loading: () => <Spinner />,
	ssr: false,
});

const filters = [
	{
		label: 'All',
		value: '',
	},
	{
		label: 'Due',
		value: 'DUE',
	},
	{
		label: 'Paid',
		value: 'PAID',
	},
] as { label: string; value: string }[];

export default function Page() {
	const today = startOfToday();
	const [{ start, end, filter }, setState] = useQueryStates({
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
			defaultValue: '',
			parse: (val) => val,
			serialize: (val) => val,
		},
	});
	const selectedDateRange = {
		from: start ?? today,
		to: end ?? today,
	} as DateRange;
	const {
		limit,
		page,
		handlePagination,
		active,
		setActive,
		updateQueryParams,
	} = useUpdateUrl();
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const { data, isPending } = useGetBills({
		count: 1,
		startDate: selectedDateRange.from
			? format(selectedDateRange.from, DEFAULT_DATE_FORMAT)
			: format(new Date(), DEFAULT_DATE_FORMAT),
		endDate: selectedDateRange.to
			? format(selectedDateRange.to, DEFAULT_DATE_FORMAT)
			: format(new Date(), DEFAULT_DATE_FORMAT),
		type: active === 1 ? 'ACTIVE' : 'INACTIVE',
		page,
		searchTerm,
		filter,
	});
	const invoiceData = data?.data?.invoices || ([] as IInvoice[]);
	const totalCount = data?.data?.totalCount || 0;
	const columns = useColumns();
	const router = useRouter();
	const [open, setOpen] = useState(false);

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

	return (
		<div className="mb-[54px]">
			<div className="z-20 rounded-lg bg-white p-4 shadow-md">
				<CommonFilters
					selectedDate={selectedDateRange}
					setDate={({ date }) => {
						setState({
							start: date.from
								? parseISO(
										format(date.from, DEFAULT_DATE_FORMAT)
									)
								: new Date(),
							end: date.to
								? parseISO(format(date.to, DEFAULT_DATE_FORMAT))
								: new Date(),
						});
						updateQueryParams({ page: 0 });
						handleChange('');
					}}
					active={active}
					setActive={setActive}
					searchTerm={input}
					setSearchTerm={handleChange}
					btnAction={() => setOpen(true)}
					btnTxt="Create Invoice"
				/>
				<div className="mt-4 flex justify-end items-center gap-2">
					<span>Due Filters:</span>
					<div className="flex gap-2">
						{filters.map((newFilter, i) => {
							const isActive = newFilter.value === filter;
							return (
								<Badge
									key={i}
									className="cursor-pointer "
									variant={isActive ? 'secondary' : 'outline'}
									onClick={() =>
										setState({ filter: newFilter.value })
									}
								>
									{newFilter.label}
								</Badge>
							);
						})}
					</div>
				</div>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={columns as any}
					data={invoiceData}
					isPending={isPending}
					getRowId={(row: IInvoice) => row._id}
					emptyMessage="Nothing found for the day."
				/>
			</div>
			<PaginationWithLinks
				page={page}
				pageSize={Number(limit)}
				totalCount={totalCount ?? 0}
				handlePagination={handlePagination}
				className="flex flex-1 items-center justify-end gap-3"
				limit={limit}
			/>
			<ParentModal open={open} setOpen={setOpen} />
		</div>
	);
}
