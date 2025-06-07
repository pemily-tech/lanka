import { CircleUserRound } from 'lucide-react';

import { LazyImage } from '../lazy-image';

import { useGetUserProfileUrl } from '@/api/queries/use-get-user-profile-image';
import { cn } from '@/helpers/utils';

export const UserProfile = ({
	id,
	imageClasses,
	iconClasses,
}: {
	id: string;
	imageClasses?: string;
	iconClasses?: string;
}) => {
	const { data } = useGetUserProfileUrl(id as string);
	return (
		<>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<LazyImage
					src={data?.data?.profileUrl as string}
					className={cn(
						'size-[160px] rounded-full object-cover',
						imageClasses
					)}
				/>
			) : (
				<CircleUserRound
					className={cn('text-grey-bg3 !size-[160px]', iconClasses)}
				/>
			)}
		</>
	);
};
