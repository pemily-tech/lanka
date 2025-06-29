import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Pencil } from 'lucide-react';

import { VaccineDialogForm } from './vaccine-form';

import { DATE_FORMAT } from '@/helpers/constant';
import { type IVaccine } from '@/types/health-certificate';
import { Button } from '@/ui/button';

export function useColumns(isCertificateSaved: boolean): ColumnDef<IVaccine>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Vaccine Name',
			cell: ({ row }) => <span>{row.original.name}</span>,
		},
		{
			accessorKey: 'brand',
			header: 'Brand/Mfr.',
			cell: ({ row }) => <span>{row.original.brand}</span>,
		},
		{
			accessorKey: 'batch',
			header: 'Batch/Lot No.',
			cell: ({ row }) => <span>{row.original.batch}</span>,
		},
		{
			accessorKey: 'givenOn',
			header: 'Given On',
			cell: ({ row }) => (
				<span>
					{row.original?.givenOn
						? format(row.original.givenOn, DATE_FORMAT)
						: ''}
				</span>
			),
		},
		{
			accessorKey: 'dueDate',
			header: 'Due Date',
			cell: ({ row }) => (
				<span>
					{row.original?.dueDate
						? format(row.original?.dueDate, DATE_FORMAT)
						: ''}
				</span>
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
							disabled={isCertificateSaved}
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
