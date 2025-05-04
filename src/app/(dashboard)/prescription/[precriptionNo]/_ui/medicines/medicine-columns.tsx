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
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../../../../../ui/shared';
import { useMedicineSearchStore } from '../../_store/medicine-search';
import UpdateMedicine from './update-medicine';

export function useColumns(): ColumnDef<IMedicine>[] {
	const removeMedicine = useMedicineSearchStore((s) => s.removeMedicine);

	return [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => <span>{row.original.name}</span>,
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
			accessorKey: 'strength',
			header: 'Strength',
			cell: ({ row }) => <span>{row.original.strength}</span>,
		},
		{
			id: 'buttons',
			header: '',
			cell: ({ row }) => (
				<div className="flex items-center gap-12">
					<Dialog>
						<DialogTrigger asChild>
							<Button size="icon" variant="ghost">
								<Pencil className="size-18" />
							</Button>
						</DialogTrigger>
						<DialogContent className="min-w-[720px]">
							<DialogHeader className="border-b">
								<DialogTitle>Update Medicine</DialogTitle>
								<DialogDescription></DialogDescription>
							</DialogHeader>
							<UpdateMedicine medicine={row.original} />
						</DialogContent>
					</Dialog>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button size="icon" variant="ghost">
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
										removeMedicine(row.original.medicineId)
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
