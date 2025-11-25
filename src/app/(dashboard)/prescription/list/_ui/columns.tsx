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
} from '../../../../../ui/alert';
import { useRemovePrescription } from '../_api/use-remove-prescription';

import { AppConstants } from '@/helpers/primitives';
import { Button } from '@/ui/button';

export function useColumns(refetch: () => void): ColumnDef<IPrescription>[] {
	const { mutateAsync: removePrescription } = useRemovePrescription();

	const handleDelete = async (prescriptionNo: string) => {
		const response = await removePrescription({
			id: prescriptionNo,
		});
		if (response.status === AppConstants.Success) {
			refetch();
		}
	};

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
			accessorKey: 'doctorName',
			header: 'Dr. Name',
			cell: ({ row }) => <span>{row.original.doctorDetails.name}</span>,
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
						row.original.active ? 'bg-primary' : 'bg-orange-700',
						'inline-flex rounded-full px-3 py-1 !text-xs text-white'
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
					<div className="flex items-center gap-3">
						<Link
							href={`/prescription/${row.original.prescriptionNo}`}
							className="flex size-6 items-center justify-center"
						>
							<Button size="icon" variant="ghost">
								<Edit2 className="size-4" />
							</Button>
						</Link>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									disabled={!row.original.active}
									size="icon"
									variant="ghost"
								>
									<Trash2 className="text-orange-700 size-4" />
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
											handleDelete(
												row.original.prescriptionNo
											)
										}
										className="px-6"
									>
										Confirm
									</AlertDialogAction>
									<AlertDialogCancel>
										<span className="px-6 text-sm">
											Cancel
										</span>
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
