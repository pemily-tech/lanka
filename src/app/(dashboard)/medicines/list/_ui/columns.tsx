import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Routes } from '../../../../../helpers/routes';
import { cn } from '../../../../../helpers/utils';
import { type IMedicine } from '../../../../../types/prescription';

export function useColumns(): ColumnDef<IMedicine>[] {
	return [
		{
			accessorKey: 'medicineId',
			header: 'ID',
			cell: ({ row }) => (
				<Link
					href={`${Routes.MEDICINES_UPDATE}/${row.original.medicineId}`}
				>
					{row.original.medicineId}
				</Link>
			),
		},
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => <span>{row.original.name}</span>,
		},
		{
			accessorKey: 'strength',
			header: 'Strength',
			cell: ({ row }) => <span>{row.original.strength}</span>,
		},
		{
			accessorKey: 'dose',
			header: 'Dose',
			cell: ({ row }) => <span>{row.original.dose}</span>,
		},
		{
			accessorKey: 'active',
			header: 'Active',
			cell: ({ row }) => (
				<div
					className={cn(
						row.original.active ? 'bg-primary' : 'bg-destructive',
						'!text-12 inline-flex rounded-full px-12 py-4 text-white'
					)}
				>
					{row.original.active ? 'Active' : 'InActive'}
				</div>
			),
		},
	];
}
