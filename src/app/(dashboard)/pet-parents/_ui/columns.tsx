import { type ColumnDef } from '@tanstack/react-table';
import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';

import { useGetUserProfileUrl } from '@/api/queries/use-get-user-profile-image';
import { Routes } from '@/helpers/routes';
import { type IPetParent } from '@/types/clinic';
import { BlurImage } from '@/ui/blur-image';
import { Button } from '@/ui/button';

export function useColumns(): ColumnDef<IPetParent>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className="flex items-center gap-3">
					<UserImage id={row.original.parent.parentId} />
					<span>{row.original.parent.name}</span>
				</div>
			),
		},
		{
			accessorKey: 'petNames',
			header: 'Pet Names',
			cell: ({ row }) => (
				<div>{row.original.parent.petNames.join(', ')}</div>
			),
		},
		{
			accessorKey: 'mobile',
			header: 'Mobile Number',
			cell: ({ row }) => <span>{row.original.parent.mobile}</span>,
		},
		{
			id: 'buttons',
			header: 'Actions',
			cell: ({ row }) => (
				<div className="flex items-center gap-3">
					<Link
						href={`${Routes.PARENTS_UPDATE}/${row.original.parent.parentId}`}
						className="flex items-center justify-center"
					>
						<Button
							size="sm"
							variant="secondary"
							data-umami-event="parents_edit_button"
							data-umami-event-id={row.original.parent.parentId}
							className="px-3"
						>
							<span className="font-normal">Edit Parent</span>
						</Button>
					</Link>
					<Button
						size="sm"
						variant="outline"
						data-umami-event="parents_edit_button"
						data-umami-event-id={row.original.parent.parentId}
						className="px-3"
						onClick={(e) => {
							e.stopPropagation();
							row.toggleExpanded();
						}}
					>
						{row.getIsExpanded() ? (
							<span className="font-normal">Close Pets</span>
						) : (
							<span className="font-normal">Edit Pets</span>
						)}
					</Button>
				</div>
			),
		},
	];
}

const UserImage = ({ id }: { id: string }) => {
	const { data } = useGetUserProfileUrl(id as string);
	const profileUrl = data?.data?.profileUrl;

	return (
		<div className="relative">
			{profileUrl && profileUrl !== '' ? (
				<BlurImage
					src={profileUrl}
					className="size-[54px]"
					imageClasses="rounded-lg object-cover"
					width={54}
					height={54}
				/>
			) : (
				<CircleUserRound color="#cacfd2" width={54} height={54} />
			)}
		</div>
	);
};
