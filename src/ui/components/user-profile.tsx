import { UserIcon } from 'lucide-react';

import { useGetUserProfileUrl } from '../../api/profile-image/profile-image';
import { ImagePlaceholder } from '../shared/image';

const UserProfileImage = ({
	id,
	containerClasses = '',
	imageClasses = '',
	iconWidth = 160,
	iconHeight = 160,
	iconColor = '#D9D9D9',
}: {
	id: string;
	containerClasses?: string;
	imageClasses?: string;
	iconWidth?: number | string;
	iconHeight?: number | string;
	iconColor?: string;
}) => {
	const { data } = useGetUserProfileUrl(id as string);
	return (
		<>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					src={data?.data?.profileUrl as string}
					containerClasses={`w-[160px] h-[160px] ${containerClasses}`}
					imageClasses={`rounded-full ${imageClasses}`}
				/>
			) : (
				<UserIcon
					color={iconColor}
					width={iconWidth}
					height={iconHeight}
				/>
			)}
		</>
	);
};

export default UserProfileImage;
