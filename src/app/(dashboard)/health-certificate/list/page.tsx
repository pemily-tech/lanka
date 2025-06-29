/* eslint-disable indent */
'use client';

import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';

import { useCertificateList } from './_hooks/use-get-list';
import { useColumns } from './_ui/columns';

import CommonFilters from '@/components/common-filters';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { RecordTypes } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { type ICertificate } from '@/types/health-certificate';
import { DataTable } from '@/ui/data-table';
import { PaginationWithLinks } from '@/ui/pagination-with-links';

export default function Page() {
	const router = useRouter();
	const {
		selectedDateRange,
		setDateRange,
		updateQueryParams,
		handleChange,
		input,
		active,
		setActive,
		certificateData,
		isPending,
		invalidateQueries,
		page,
		limit,
		totalCount,
		handlePagination,
	} = useCertificateList();
	const columns = useColumns(invalidateQueries);

	return (
		<div>
			<div className="sticky top-0 z-20 rounded-lg bg-white p-4 shadow-md">
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
					btnAction={() =>
						router.push(
							`${Routes.SELECT_PET}?recordType=${RecordTypes.Certificate}&startDate=${format(selectedDateRange.from, DEFAULT_DATE_FORMAT)}&endDate=${format(selectedDateRange.to, DEFAULT_DATE_FORMAT)}&active=${active}&page=${page}&searchTerm=${input}`
						)
					}
					btnTxt="Create Certificate"
				/>
			</div>
			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={columns as any}
					data={certificateData}
					isPending={isPending}
					getRowId={(row: ICertificate) => row._id}
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
		</div>
	);
}
