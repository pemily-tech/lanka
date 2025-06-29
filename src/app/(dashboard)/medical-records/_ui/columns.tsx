import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import Actions from './actions';
import Comment from './comment';
import PreviewImage from './preview-img';

import { type IMedicalRecord } from '@/types/clinic';
import { type IMedicalRecordFilter } from '@/types/common';

export function useColumns({
	type,
	date,
	petId,
}: {
	type: IMedicalRecordFilter;
	date?: string | undefined;
	petId?: string | undefined;
}): ColumnDef<IMedicalRecord>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Details',
			cell: ({ row }) => (
				<div className="flex gap-3">
					<PreviewImage url={row.original.url} />
					<div className="flex flex-col gap-1">
						<div className="flex items-end gap-1">
							<span className="text-black/60">Parent:</span>{' '}
							<span className="font-medium">
								{row.original.parent.name}
							</span>
						</div>
						<div className="flex items-end gap-1">
							<span className="text-black/60">Pet:</span>{' '}
							<span className="font-medium">
								{row.original.pet.name}
							</span>
						</div>
					</div>
				</div>
			),
		},
		{
			accessorKey: 'createdAtUTC',
			header: 'Uploaded on',
			cell: ({ row }) => (
				<span>
					{format(
						toZonedTime(row.original?.createdAtUTC, 'Asia/Kolkata'),
						'do MMMM yyyy'
					)}
				</span>
			),
		},
		{
			accessorKey: 'comment',
			header: 'Notes',
			cell: ({ row }) => (
				<div className="flex items-start justify-between">
					<span>
						{row.original.comment && row.original.comment !== '' ? (
							row.original.comment
						) : (
							<span className="text-black/40">Add notes</span>
						)}
					</span>
					<Comment
						record={row.original}
						type={type}
						date={date}
						petId={petId}
					/>
				</div>
			),
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: ({ row }) => {
				return (
					<Actions
						record={row.original}
						type={type}
						date={date}
						petId={petId}
					/>
				);
			},
		},
	];
}
