/* eslint-disable indent */
'use client';

import { useCallback, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { format, parseISO, startOfToday } from 'date-fns';
import debounce from 'lodash.debounce';
import { PillBottle } from 'lucide-react';
import { useQueryStates } from 'nuqs';

import { DEFAULT_DATE_FORMAT } from '../../../../helpers/constant';
import { useUpdateUrl } from '../../../../hooks/use-update-url';
import { type IPrescription } from '../../../../types/prescription';
import { DataTable } from '../../../../ui/shared/data-table';
import { PaginationWithLinks } from '../../../../ui/shared/pagination-with-links';
import PetSelectModal from '../../../../ui/shared/pet-selection-modal';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '../../../../ui/shared/tooltip';
import { useGetPrescriptions } from './_api/use-get-prescription';
import { useColumns } from './_ui/columns';
import Filters from './_ui/filters';

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
			<div className="rounded-8 shadow-card1 sticky top-0 z-20 bg-white p-16">
				<Filters
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
					setOpenPrescription={() => setOpen(!open)}
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
				className="flex flex-1 items-center justify-end gap-12"
				limit={limit}
			/>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						className="bg-purple shadow-card1 fixed bottom-[12px] right-[12px] flex size-[48px] cursor-pointer items-center justify-center rounded-full border-2 border-white transition-transform duration-200 hover:scale-110"
						onClick={() => setOpen(!open)}
					>
						<PillBottle className="text-white" />
					</div>
				</TooltipTrigger>
				<TooltipContent className="border-purple rounded-2xl border bg-white px-12 py-6">
					<p className="text-black-1">Create New Rx</p>
				</TooltipContent>
			</Tooltip>
			<PetSelectModal open={open} setOpen={setOpen} />
		</div>
	);
}
