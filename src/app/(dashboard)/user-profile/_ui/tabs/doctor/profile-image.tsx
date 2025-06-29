import { UserIcon } from 'lucide-react';

import { useGetUserProfileUrl } from '@/api/queries/use-get-user-profile-image';
import { BlurImage } from '@/ui/blur-image';

const ProfileImage = ({ id }: { id: string }) => {
	const { data } = useGetUserProfileUrl(id as string);
	return (
		<>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<BlurImage
					src={data?.data?.profileUrl as string}
					className="size-[54px]"
					width={84}
					height={84}
					imageClasses="rounded-full"
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
