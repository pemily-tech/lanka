import { type ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';

import Actions from './actions';
import Status from './status';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IFollowUpRecord } from '@/types/clinic';
import { BlurImage } from '@/ui/blur-image';

export function useColumns({
	refetch,
}: {
	refetch: () => void;
}): ColumnDef<IFollowUpRecord>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Details',
			cell: ({ row }) => (
				<div className="flex gap-3">
					<BlurImage
						src="/images/follow-up-records.svg"
						className="h-[72px] w-[85px]"
						source="local"
						width={240}
						height={240}
						imageClasses="rounded-md"
					/>
					<div className="flex flex-col gap-1">
						<div className="flex items-end gap-1">
							<span className="text-black/60">Parent:</span>{' '}
							<span className="font-medium">
								{row.original.parent.name}
							</span>
						</div>
						<div className="flex items-end gap-1">
							<span className="text-black/60">Pet:</span>{' '}
							<span className="font-medium">
								{row.original.pet.name}
							</span>
						</div>
					</div>
				</div>
			),
		},
		{
			accessorKey: 'followUpType',
			header: 'FollowUp Type',
			cell: ({ row }) => <span>{row.original.followUpType}</span>,
		},
		{
			accessorKey: 'followUpDate',
			header: 'FollowUp Date',
			cell: ({ row }) => {
				const date = row?.original?.followUpDate
					? parseISO(row?.original?.followUpDate as string)
					: '';
				const followupDate = date && format(date, 'do MMM yyyy');
				return <span>{followupDate}</span>;
			},
		},
		{
			accessorKey: 'followUpCompleteDate',
			header: 'Completed On',
			cell: ({ row }) => {
				const date = row?.original?.followUpCompleteDate
					? parseISO(row?.original?.followUpCompleteDate as string)
					: '';
				const followUpCompleteDate =
					date !== '' && format(date, DEFAULT_DATE_FORMAT);
				return (
					<span>
						{row?.original?.followUpCompleteDate
							? followUpCompleteDate
							: '(Pending)'}
					</span>
				);
			},
		},
		{
			id: 'status',
			header: 'Status',
			cell: ({ row }) => {
				return <Status record={row.original} refetch={refetch} />;
			},
		},
		{
			accessorKey: 'notificationCount',
			header: 'Notification Count',
			cell: ({ row }) => <span>{row.original.notificationCount}/3</span>,
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: ({ row }) => {
				return <Actions record={row.original} refetch={refetch} />;
			},
		},
	];
}
