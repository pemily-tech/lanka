import { type ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

import { type IMedicine } from '../../../../../../types/prescription';
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
} from '../../../../../../ui/alert';
import { useMedicineStore } from '../../_store/medicine-store';
import UpdateMedicine from './update-medicine';

import { Button } from '@/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/ui/dialog';

export function useColumns(
	isPrescriptionSaved: boolean
): ColumnDef<IMedicine>[] {
	const removeMedicine = useMedicineStore((s) => s.removeMedicine);

	return [
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
			accessorKey: 'frequency',
			header: 'Frequency',
			cell: ({ row }) => <span>{row.original.frequency}</span>,
		},
		{
			accessorKey: 'interval',
			header: 'Interval',
			cell: ({ row }) => <span>{row.original.interval}</span>,
		},
		{
			accessorKey: 'take',
			header: 'Take',
			cell: ({ row }) => <span>{row.original.take}</span>,
		},
		{
			accessorKey: 'duration',
			header: 'Duration',
			cell: ({ row }) => <span>{row.original.duration}</span>,
		},
		{
			id: 'buttons',
			header: '',
			cell: ({ row }) => {
				if (isPrescriptionSaved) {
					return null;
				}
				return (
					<div className="flex items-center gap-3">
						<Dialog>
							<DialogTrigger asChild>
								<Button size="icon" variant="ghost">
									<Pencil className="size-4" />
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-[720px]">
								<DialogHeader className="border-b border-border">
									<DialogTitle>Update Medicine</DialogTitle>
									<DialogDescription></DialogDescription>
								</DialogHeader>
								<UpdateMedicine medicine={row.original} />
							</DialogContent>
						</Dialog>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button size="icon" variant="ghost">
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
								<AlertDialogFooter className="!pt-2">
									<AlertDialogAction
										onClick={() =>
											removeMedicine(
												row.original.medicineId
											)
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
				);
			},
		},
	];
}
