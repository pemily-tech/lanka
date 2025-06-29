/* eslint-disable indent */
'use client';

import { useCallback, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { format, parseISO, startOfToday } from 'date-fns';
import debounce from 'lodash.debounce';
import { PillBottle } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useQueryStates } from 'nuqs';

import { DEFAULT_DATE_FORMAT } from '../../../../helpers/constant';
import { useUpdateUrl } from '../../../../hooks/use-update-url';
import { type IPrescription } from '../../../../types/prescription';
import { useGetPrescriptions } from './_api/use-get-prescription';
import { useColumns } from './_ui/columns';

import { Loader } from '@/ui/loader';

const CommonFilters = dynamic(() => import('@/components/common-filters'), {
	loading: () => <Loader />,
	ssr: false,
});

const DataTable = dynamic(
	() =>
		import('../../../../ui/data-table').then((mod) => ({
			default: mod.DataTable,
		})),
	{
		loading: () => <Loader />,
		ssr: false,
	}
);

const PaginationWithLinks = dynamic(
	() =>
		import('../../../../ui/pagination-with-links').then((mod) => ({
			default: mod.PaginationWithLinks,
		})),
	{
		loading: () => <Loader />,
		ssr: false,
	}
);

const PetSelectModal = dynamic(
	() => import('@/components/pet-selection-modal'),
	{
		loading: () => <Loader />,
		ssr: false,
	}
);

export default function Page() {
	const today = startOfToday();
	const [{ start, end }, setDateRange] = useQueryStates({
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
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const { data, isPending, refetch } = useGetPrescriptions({
		count: 1,
		startDate: selectedDateRange.from
			? format(selectedDateRange.from, DEFAULT_DATE_FORMAT)
			: format(new Date(), DEFAULT_DATE_FORMAT),
		endDate: selectedDateRange.to
			? format(selectedDateRange.to, DEFAULT_DATE_FORMAT)
			: format(new Date(), DEFAULT_DATE_FORMAT),
		active,
		page,
		searchTerm,
	});
	const columns = useColumns(refetch);

	const medicineData = data?.data?.prescriptions || ([] as IPrescription[]);
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
		<div className="mb-[54px]">
			<div className="sticky top-[76px] z-20 rounded-lg bg-white p-4 shadow-md">
				<CommonFilters
					selectedDate={selectedDateRange}
					setDate={({ date }) => {
						setDateRange({
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
					btnAction={() => setOpen(!open)}
					btnTxt="Create New Rx"
				/>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={columns as any}
					data={medicineData}
					isPending={isPending}
					getRowId={(row: IPrescription) => row._id}
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
			<PetSelectModal open={open} setOpen={setOpen} />
		</div>
	);
}
