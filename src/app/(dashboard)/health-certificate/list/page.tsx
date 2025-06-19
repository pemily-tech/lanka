/* eslint-disable indent */
'use client';

import { format, parseISO } from 'date-fns';
import dynamic from 'next/dynamic';

import { useCertificateList } from './_hooks/use-get-list';
import { useColumns } from './_ui/columns';

import CommonFilters from '@/components/common-filters';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type ICertificate } from '@/types/health-certificate';
import { DataTable } from '@/ui/data-table';
import { Loader } from '@/ui/loader';

const SelectionModal = dynamic(() => import('./_ui/selection-modal'), {
	loading: () => <Loader />,
	ssr: false,
});

export default function Page() {
	const {
		selectedDateRange,
		setDateRange,
		updateQueryParams,
		handleChange,
		input,
		active,
		setActive,
		open,
		setOpen,
		onComplete,
		certificateData,
		isPending,
		invalidateQueries,
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
					btnAction={() => setOpen(!open)}
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
			<SelectionModal
				open={open}
				setOpen={setOpen}
				heading="Create new Health Certificate"
				onComplete={onComplete}
			/>
		</div>
	);
}
