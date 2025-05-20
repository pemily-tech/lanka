import { type ColumnDef } from '@tanstack/react-table';
import { Edit2, LogOutIcon, Trash2 } from 'lucide-react';
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
	Button,
} from '../../../../../ui/shared';
import { useRemoveMedicine } from '../../_api/use-remove-medicine';

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
						'!text-12 inline-flex rounded-full px-12 py-4 text-white'
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
				<div className="flex items-center gap-12">
					<Link
						href={`${Routes.MEDICINES_UPDATE}/${row.original.medicineId}`}
						className="flex size-24 items-center justify-center"
					>
						<Button size="icon" variant="ghost">
							<Edit2 className="size-18" />
						</Button>
					</Link>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								disabled={!row.original.active}
								size="icon"
								variant="ghost"
							>
								<Trash2 className="size-18 text-destructive" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent className="gap-24">
							<AlertDialogHeader>
								<AlertDialogTitle className="text-24">
									Delete
								</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to delete?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="!pt-32">
								<AlertDialogAction
									onClick={() =>
										handelRemove(row.original.medicineId)
									}
									className="px-24"
								>
									Confirm
								</AlertDialogAction>
								<AlertDialogCancel>
									<span className="text-14">Cancel</span>
								</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			),
		},
	];
}
