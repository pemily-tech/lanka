import { CircleUserRound } from 'lucide-react';

import { useGetUserProfileUrl } from '@/api/queries/use-get-user-profile-image';
import { cn } from '@/helpers/utils';
import { BlurImage } from '@/ui/blur-image';

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
	console.log(data?.data?.profileUrl);

	return (
		<>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<BlurImage
					src={data?.data?.profileUrl as string}
					className={cn(
						'size-[160px] rounded-full object-cover',
						imageClasses
					)}
					width={72}
					height={72}
				/>
			) : (
				<CircleUserRound
					className={cn('!size-[160px] text-gray-300', iconClasses)}
				/>
			)}
		</>
	);
};
