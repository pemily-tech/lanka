import { UserIcon } from 'lucide-react';

import { useGetUserProfileUrl } from '@/api/profile-image';
import { LazyImage } from '@/ui/shared/lazy-image';

const ProfileImage = ({ id }: { id: string }) => {
	const { data } = useGetUserProfileUrl(id as string);
	return (
		<>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<LazyImage
					src={data?.data?.profileUrl as string}
					className="size-[54px] rounded-full"
				/>
			) : (
				<div className="flex size-[54px] items-center justify-center rounded-full bg-gray-100">
					<UserIcon
						width={42}
						height={42}
						className="text-gray-400"
					/>
				</div>
			)}
		</>
	);
};

export default ProfileImage;
