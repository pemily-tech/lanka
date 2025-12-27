import { type ColumnDef } from '@tanstack/react-table';

export const appointmentColumns: ColumnDef<any>[] = [
	{
		accessorKey: 'prescriptionNo',
		header: 'Prescription No',
		cell: ({ row }) => row.original.prescriptionNo || '-',
	},
	{
		accessorKey: 'date',
		header: 'Date',
		cell: ({ row }) => row.original.date,
	},
	{
		accessorKey: 'doctorName',
		header: 'Dr. Name',
		cell: ({ row }) => row.original.doctorName,
	},
	{
		accessorKey: 'parentName',
		header: 'Parent Name',
		cell: ({ row }) => row.original.parentName,
	},
	{
		accessorKey: 'patientName',
		header: 'Patient Name',
		cell: ({ row }) => row.original.patientName,
	},
	{
		accessorKey: 'status',
		header: 'Active',
		cell: ({ row }) => (
			<span
				className={`rounded-full px-3 py-1 text-xs font-medium ${
					row.original.status === 'active'
						? 'bg-green-100 text-green-700'
						: 'bg-red-100 text-red-700'
				}`}
			>
				{row.original.status === 'active' ? 'Active' : 'Inactive'}
			</span>
		),
	},
];
