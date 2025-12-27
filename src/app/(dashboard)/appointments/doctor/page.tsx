'use client';

import { useState } from 'react';
import { type DateRange } from 'react-day-picker';
import Link from 'next/link';

import { useGetAppointments } from '../_api/use-get-appointments';
import { appointmentColumns } from '../ui/columns';
import Filters from '../ui/filters';

import { ActionRecordButton } from '@/components/action-button';
import { DataTable } from '@/ui/data-table';
import { PaginationWithLinks } from '@/ui/pagination-with-links';

export default function Page() {
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all');

	const today = new Date();
	const [dateRange, setDateRange] = useState<DateRange>({
		from: today,
		to: today,
	});

	const { data, isPending } = useGetAppointments({
		service: 'doctor',
		dateRange,
		search,
		status,
	});

	return (
		<div className="mb-[54px]">
			<div className="sticky top-[76px] z-20 rounded-lg bg-white p-4 shadow-md">
				<Filters
					selectedDate={dateRange}
					onDateChange={setDateRange}
					search={search}
					onSearchChange={setSearch}
					status={status}
					onStatusChange={setStatus}
				>
					<Link href="/pet-parents?service=doctor">
						<ActionRecordButton title="Add Appointment" />
					</Link>
				</Filters>
			</div>

			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={appointmentColumns}
					data={data?.data || []}
					isPending={isPending}
					getRowId={(row: any) => row?._id}
					emptyMessage="No doctor appointments found."
				/>
			</div>

			<PaginationWithLinks
				page={0}
				pageSize={30}
				totalCount={data?.totalCount || 0}
				handlePagination={() => {}}
				className="flex flex-1 items-center justify-end gap-3"
				limit={30}
			/>
		</div>
	);
}
