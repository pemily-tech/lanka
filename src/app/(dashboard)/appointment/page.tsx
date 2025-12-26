'use client';

import Link from 'next/link';

import { useGetAppointments } from './_api/use-get-appointments';
import { appointmentColumns } from './ui/columns';
import Filters from './ui/filters';

import { ActionRecordButton } from '@/components/action-button';
import { Routes } from '@/helpers/routes';
import { DataTable } from '@/ui/data-table';
import { PaginationWithLinks } from '@/ui/pagination-with-links';

export default function Page() {
	const { data, isPending } = useGetAppointments();
	return (
		<div className="mb-[54px]">
			{/* Filters / Header */}
			<div className="sticky top-[76px] z-20 rounded-lg bg-white p-4 shadow-md">
				<Filters>
					<Link href={Routes.SELECT_PET}>
						<ActionRecordButton title="Add Appointment" />
					</Link>
				</Filters>
			</div>

			{/* Table */}
			<div className="relative my-3 rounded-lg bg-white shadow-md">
				<DataTable
					columns={appointmentColumns}
					data={data?.data || []}
					isPending={isPending}
					getRowId={(row: any) => row?._id}
					emptyMessage="No appointments found."
				/>
			</div>

			{/* Pagination */}
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
