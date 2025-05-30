import { type ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';

import Actions from './actions';
import Status from './status';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { type IVaccinationRecord } from '@/types/clinic';
import { LazyImage } from '@/ui/shared/lazy-image';

export function useColumns({
	type,
	date,
}: {
	type: 'PENDING' | 'COMPLETE' | 'ALL';
	date: string;
}): ColumnDef<IVaccinationRecord>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Details',
			cell: ({ row }) => (
				<div className="flex gap-12">
					<LazyImage
						src="/images/follow-up-records.svg"
						className="h-[72px] w-[85px]"
					/>
					<div className="flex flex-col gap-4">
						<div className="flex items-end gap-6">
							<span className="text-black-1/60">Parent:</span>{' '}
							<span className="font-medium">
								{row.original.parent.name}
							</span>
						</div>
						<div className="flex items-end gap-6">
							<span className="text-black-1/60">Pet:</span>{' '}
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
				return <Status record={row.original} type={type} date={date} />;
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
				return (
					<Actions record={row.original} type={type} date={date} />
				);
			},
		},
	];
}
