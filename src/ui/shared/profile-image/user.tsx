import { CircleUserRound } from 'lucide-react';

import { useGetUserProfileUrl } from '../../../api/queries/use-get-user-profile-image';
import { cn } from '../../../helpers/utils';
import { ImagePlaceholder } from '../image';

export const UserProfile = ({
	id,
	containerClasses,
	imageClasses,
	iconClasses,
}: {
	id: string;
	containerClasses?: string;
	imageClasses?: string;
	iconClasses?: string;
}) => {
	const { data } = useGetUserProfileUrl(id as string);
	return (
		<>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					src={data?.data?.profileUrl as string}
					containerClasses={cn('size-[160px]', containerClasses)}
					imageClasses={cn('rounded-full', imageClasses)}
				/>
			) : (
				<CircleUserRound
					className={cn('text-grey-bg3 !size-[160px]', iconClasses)}
				/>
			)}
		</>
	);
};
