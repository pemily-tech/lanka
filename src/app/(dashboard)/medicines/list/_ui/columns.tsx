import { type ColumnDef } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Routes } from '../../../../../helpers/routes';
import { cn } from '../../../../../helpers/utils';
import { type IMedicine } from '../../../../../types/prescription';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../../../../ui/alert';
import { useRemoveMedicine } from '../../_api/use-remove-medicine';

import { Button } from '@/ui/button';

export function useColumns(): ColumnDef<IMedicine>[] {
	const { mutate: removeMedicine } = useRemoveMedicine();

	const handelRemove = (id: string) => {
		removeMedicine({ id });
	};

	return [
		{
			accessorKey: 'medicineId',
			header: 'ID',
			cell: ({ row }) => <div>{row.original.medicineId}</div>,
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
						'!text-12 inline-flex rounded-full px-3 py-4 text-white'
					)}
				>
					{row.original.active ? 'Active' : 'InActive'}
				</div>
			),
		},
		{
			id: 'buttons',
			header: '',
			cell: ({ row }) => (
				<div className="flex items-center gap-3">
					<Link
						href={`${Routes.MEDICINES_UPDATE}/${row.original.medicineId}`}
						className="flex size-6 items-center justify-center"
					>
						<Button
							size="icon"
							variant="ghost"
							data-umami-event="medicine_edit_button"
							data-umami-event-id={row.original.medicineId}
						>
							<Edit2 className="size-4" />
						</Button>
					</Link>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								disabled={!row.original.active}
								size="icon"
								variant="ghost"
								data-umami-event="medicine_delete"
								data-umami-event-id={row.original.medicineId}
							>
								<Trash2 className="text-destructive size-4" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="gap-6">
							<AlertDialogHeader>
								<AlertDialogTitle className="text-2xl">
									Delete
								</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to delete?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="!pt-8">
								<AlertDialogAction
									onClick={() =>
										handelRemove(row.original.medicineId)
									}
									className="px-6"
								>
									Confirm
								</AlertDialogAction>
								<AlertDialogCancel>
									<span className="text-sm">Cancel</span>
								</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			),
		},
	];
}
