import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { cn } from '../../../../../helpers/utils';
import { type IPrescription } from '../../../../../types/prescription';
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
import { useRemovePrescription } from '../_api/use-remove-prescription';

export function useColumns(): ColumnDef<IPrescription>[] {
	const { mutate: removePrescription } = useRemovePrescription();

	return [
		{
			accessorKey: 'prescriptionNo',
			header: 'Prescription No',
			cell: ({ row }) => (
				<Link
					className="hover:text-purple hover:underline"
					href={`/prescription/${row.original.prescriptionNo}`}
				>
					{row.original.prescriptionNo}
				</Link>
			),
		},
		{
			accessorKey: 'prescriptionDate',
			header: 'Date',
			cell: ({ row }) => (
				<span>
					{row.original.prescriptionDate &&
						format(row.original.prescriptionDate, 'do MMM, yyyy')}
				</span>
			),
		},
		{
			accessorKey: 'parentName',
			header: 'Parent Name',
			cell: ({ row }) => <span>{row.original.parentName}</span>,
		},
		{
			accessorKey: 'patientName',
			header: 'Patient Name',
			cell: ({ row }) => <span>{row.original.patientName}</span>,
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
			cell: ({ row }) => {
				return (
					<div className="flex items-center gap-12">
						<Link
							href={`/prescription/${row.original.prescriptionNo}`}
							className="flex size-24 items-center justify-center"
						>
							<Button size="icon" variant="ghost">
								<Edit2 className="size-18" />
							</Button>
						</Link>
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
											removePrescription({
												id: row.original.prescriptionNo,
											})
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
				);
			},
		},
	];
}
