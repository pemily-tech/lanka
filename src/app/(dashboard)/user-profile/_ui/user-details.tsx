'use client';

import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { Camera, Check, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useGetUserProfileUrl } from '../../../../api/queries/use-get-user-profile-image';
import { createFormDataForImage } from '../../../../helpers/utils';
import { useAuthStore } from '../../../../store/user-auth';

import { useUploadUserProfile } from '@/api/mutations/upload-user-profile';
import { useGetUser } from '@/api/queries/use-get-user-details';
import { MAX_SIZE_500 } from '@/helpers/constant';
import { LazyImage } from '@/ui/lazy-image';

export default function UserDetails() {
	const { userId } = useAuthStore();
	const { data: profileData } = useGetUserProfileUrl(userId as string);
	const { data: userData } = useGetUser(userId as string);
	const { mutate: uploadUserProfile } = useUploadUserProfile();
	const { profileUrl } = profileData?.data || {};
	const { name, mobile, email, address } = userData?.data?.user || {};
	const isUrlExists = profileUrl && profileUrl !== '';

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.map(async (acceptedFile) => {
				const formData = createFormDataForImage(
					acceptedFile as File,
					'file'
				);
				uploadUserProfile(formData);
			});

			fileRejections.forEach((rejection) => {
				rejection.errors.forEach((error) => {
					if (error.code === 'file-too-large') {
						toast.error(
							'File is too large. Maximum size allowed is 500KB.'
						);
					} else {
						toast.error(error.message);
					}
				});
			});
		},
		[]
	);

	const { getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		maxSize: MAX_SIZE_500,
	});

	return (
		<div className="flex flex-row items-start justify-start gap-12 rounded-lg">
			<div className="flex gap-4">
				<div>
					<label className="relative block size-[62px] cursor-pointer rounded-full">
						<input {...getInputProps()} />
						{isUrlExists ? (
							<LazyImage
								src={profileUrl as string}
								className="size-[62px] rounded-full object-cover"
							/>
						) : (
							<div className="flex size-[62px] items-center justify-center rounded-full bg-gray-100">
								<UserIcon
									width={48}
									height={48}
									className="text-gray-400"
								/>
							</div>
						)}
						<div className="bg-primary absolute bottom-0 right-2 rounded-full p-[2px] ring-2 ring-white">
							{isUrlExists ? (
								<Check className="size-3 text-white" />
							) : (
								<Camera className="size-18 p-1 text-white" />
							)}
						</div>
					</label>
				</div>
				<div>
					<h3 className="text-2xl font-semibold">{name}</h3>
					<div className="flex flex-row items-center gap-1">
						<span className="bg-primary size-2 rounded-full" />
						<span className="text-xs">Online</span>
					</div>
				</div>
			</div>
			<div>
				<p className="text-black/60">Email:</p>
				<a href={`mailto:${email}`}>{email}</a>
			</div>
			<div>
				<p className="text-black/60">Mobile:</p>
				<a href={`tel:${mobile}`}>{mobile}</a>
			</div>
			<div>
				<p className="text-black/60">Address:</p>
				{[
					address?.line1,
					address?.line2,
					address?.district,
					address?.state,
					address?.pincode,
				]
					.filter(Boolean)
					.join(', ')}
			</div>
		</div>
	);
}
