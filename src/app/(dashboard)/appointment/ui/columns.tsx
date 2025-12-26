import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import Actions from './actions';
import Status from './status';

type Appointment = {
	_id: string;
	date: string;
	time: string;
	doctorName: string;
	status: string;
};

export const appointmentColumns: ColumnDef<Appointment>[] = [
	{
		accessorKey: 'doctorName',
		header: 'Doctor',
		cell: ({ row }) => (
			<span className="font-medium">{row.original.doctorName}</span>
		),
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => {
			const date = new Date(row.original.date);
			return <span>{format(date, 'do MMM yyyy')}</span>;
		},
	},
	{
		accessorKey: 'time',
		header: 'Time',
		cell: ({ row }) => <span>{row.original.time}</span>,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<span className="rounded-md bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
				<Status status={row.original.status} />
			</span>
		),
	},

	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <Actions record={row.original} />,
	},
];
