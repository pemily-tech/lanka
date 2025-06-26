import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Pencil } from 'lucide-react';

import { VaccineDialogForm } from './vaccine-form';

import { DATE_FORMAT } from '@/helpers/constant';
import { type IVaccine } from '@/types/health-certificate';
import { Button } from '@/ui/button';

export function useColumns(): ColumnDef<IVaccine>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => <span>{row.original.name}</span>,
		},
		{
			accessorKey: 'brand',
			header: 'Brand',
			cell: ({ row }) => <span>{row.original.brand}</span>,
		},
		{
			accessorKey: 'batch',
			header: 'Batch',
			cell: ({ row }) => <span>{row.original.batch}</span>,
		},
		{
			accessorKey: 'dueDate',
			header: 'Due Date',
			cell: ({ row }) => (
				<span>{format(row.original.dueDate, DATE_FORMAT)}</span>
			),
		},
		{
			accessorKey: 'givenOn',
			header: 'Given On',
			cell: ({ row }) => (
				<span>{format(row.original.givenOn, DATE_FORMAT)}</span>
			),
		},
		{
			id: 'buttons',
			header: '',
			cell: ({ row }) => {
				const [open, setOpen] = useState(false);
				return (
					<div className="flex items-center gap-3">
						<Button
							onClick={() => setOpen(!open)}
							size="icon"
							variant="ghost"
						>
							<Pencil className="size-4" />
						</Button>
						<VaccineDialogForm
							open={open}
							setOpen={setOpen}
							original={row.original}
						/>
					</div>
				);
			},
		},
	];
}
