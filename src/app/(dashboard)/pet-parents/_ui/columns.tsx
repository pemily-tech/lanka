import { type ColumnDef } from '@tanstack/react-table';
import { CircleUserRound, Edit, Edit2 } from 'lucide-react';
import Link from 'next/link';

import { useGetUserProfileUrl } from '@/api/profile-image';
import { Routes } from '@/helpers/routes';
import { cn } from '@/helpers/utils';
import { type IPetParent } from '@/types/clinic';
import { Button } from '@/ui/shared';
import { LazyImage } from '@/ui/shared/lazy-image';

export function useColumns(): ColumnDef<IPetParent>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className="flex items-center gap-12">
					<UserImage id={row.original.parent.parentId} />
					<span>{row.original.parent.name}</span>
				</div>
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
				<div className="flex items-center gap-12">
					<Link
						href={`${Routes.PARENTS_UPDATE}/${row.original.parent.parentId}`}
						className="flex size-24 items-center justify-center"
					>
						<Button
							size="icon"
							variant="ghost"
							data-umami-event="parents_edit_button"
							data-umami-event-id={row.original.parent.parentId}
						>
							<Edit className="size-18" />
						</Button>
					</Link>
				</div>
			),
		},
	];
}

const UserImage = ({ id }: { id: string }) => {
	const { data } = useGetUserProfileUrl(id as string);
	const profileUrl = data?.data?.profileUrl;

	if (profileUrl && profileUrl !== '') {
		return (
			<LazyImage
				src={profileUrl}
				className="size-[54px] rounded-lg object-cover"
			/>
		);
	} else {
		return <CircleUserRound color="#cacfd2" width={54} height={54} />;
	}
};
