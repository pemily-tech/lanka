'use client';

import {
	CameraIcon,
	CircleUserRound,
	MailIcon,
	PhoneIcon,
	UserIcon,
} from 'lucide-react';

import { useGetUserProfileUrl } from '../../../../api/profile-image/profile-image';
import useUploadUserProfile from '../../../../api/upload-user-profile/upload-user-profile';
import { useGetUser } from '../../../../api/user-details/user-details';
import { createFormDataForImage } from '../../../../helpers/utils';
import { useAppSelector } from '../../../../store';
import { useAuthStore } from '../../../../store/user-auth';
import { ImagePlaceholder } from '../../../../ui/shared/image';

const ProfileImage = () => {
	const { userId } = useAuthStore();
	const { data: profileData } = useGetUserProfileUrl(userId as string);
	const { data: userData } = useGetUser(userId as string);
	const { mutate: uploadUserProfile } = useUploadUserProfile();
	const { profileUrl } = profileData?.data || {};
	const { name, mobile, email } = userData?.data?.user || {};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadUserProfile(formData);
		}
	};

	return (
		<div className="shadow-base col-span-1 flex flex-col items-center justify-center rounded-[16px] bg-white px-16 py-32">
			<div>
				<div className=" relative size-[168px] rounded-full bg-white">
					{profileUrl && profileUrl !== '' ? (
						<ImagePlaceholder
							src={profileUrl as string}
							containerClasses="w-[160px] h-[160px] "
							imageClasses="rounded-full object-cover"
						/>
					) : (
						<UserIcon width={160} height={160} />
					)}
					<label className="bg-primary shadow-base3 absolute right-0 top-[26px] z-[3] flex size-[32px] cursor-pointer items-center justify-center rounded-full">
						<input
							type="file"
							onChange={onChange}
							className="hidden w-full"
						/>
						<CameraIcon
							className="text-white"
							width={18}
							height={18}
						/>
					</label>
				</div>
			</div>
			<div className="mt-24 flex w-full flex-col gap-16 px-12">
				<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
					<CircleUserRound strokeWidth={1} className="size-20" />
					<span className="text-14">{name}</span>
				</div>
				<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
					<MailIcon strokeWidth={1} className="size-20" />
					<span className="text-14">{email}</span>
				</div>
				<a
					href={`tel:${mobile}`}
					className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12"
				>
					<PhoneIcon strokeWidth={1} className="size-20" />
					<span className="text-14">{mobile}</span>
				</a>
			</div>
		</div>
	);
};

export default ProfileImage;
