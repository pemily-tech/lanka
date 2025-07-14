import { type ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';

import Actions from './actions';
import Status from './status';

import { type IVaccinationRecord } from '@/types/clinic';
import { BlurImage } from '@/ui/blur-image';

export function useColumns({
	refetch,
}: {
	refetch: () => void;
}): ColumnDef<IVaccinationRecord>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Details',
			cell: ({ row }) => (
				<div className="flex gap-2">
					<BlurImage
						src="/images/vaccination-record.svg"
						className="h-[72px] w-[85px]"
						source="local"
						width={120}
						height={100}
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
			accessorKey: 'vaccineName',
			header: 'Vaccine Name',
			cell: ({ row }) => <span>{row.original.vaccineName}</span>,
		},
		{
			accessorKey: 'vaccinatedOnDate',
			header: 'Vaccination Date',
			cell: ({ row }) => {
				const date = row?.original?.vaccinatedOnDate
					? parseISO(row?.original?.vaccinatedOnDate as string)
					: '';
				const vaccinationDate = date && format(date, 'do MMM yyyy');
				return (
					<span>
						{vaccinationDate ? vaccinationDate : '(Not Updated)'}
					</span>
				);
			},
		},
		{
			accessorKey: 'vaccinationDate',
			header: 'Due Date',
			cell: ({ row }) => {
				const date = row?.original?.vaccinationDate
					? parseISO(row?.original?.vaccinationDate as string)
					: '';
				const vaccinationDate = date && format(date, 'do MMM yyyy');
				return <span>{vaccinationDate}</span>;
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
