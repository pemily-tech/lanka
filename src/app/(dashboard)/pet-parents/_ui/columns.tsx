import { type ColumnDef } from '@tanstack/react-table';
import { CircleUserRound } from 'lucide-react';

import { useGetUserProfileUrl } from '@/api/profile-image';
import { cn } from '@/helpers/utils';
import { type IPetParent } from '@/types/clinic';
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
