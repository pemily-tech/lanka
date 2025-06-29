'use client';

import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { CircleUserRound, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useGetUserProfileUrl } from '@/api/queries/use-get-user-profile-image';
import { useUploadPetParentProfile } from '@/app/(dashboard)/pet-parents/_api/use-upload-profile';
import { MAX_SIZE_500 } from '@/helpers/constant';
import { AppConstants } from '@/helpers/primitives';
import { createFormDataForImage } from '@/helpers/utils';
import { BlurImage } from '@/ui/blur-image';
import { Button } from '@/ui/button';

const ImageUpload = () => {
	const params = useParams<{ id: string }>();
	const { data, refetch } = useGetUserProfileUrl(params?.id);
	const profileUrl = data?.data?.profileUrl;
	const { mutateAsync: uploadProfile, isPending } = useUploadPetParentProfile(
		params?.id
	);
	const urlExists = profileUrl && profileUrl !== '';

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.map(async (acceptedFile) => {
				const formData = createFormDataForImage(
					acceptedFile as File,
					'file'
				);
				const response = await uploadProfile(formData);
				if (response.status === AppConstants.Success) {
					refetch();
				}
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

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		maxSize: MAX_SIZE_500,
	});

	return (
		<div className="rounded-lg bg-white p-4 shadow-md">
			<span className="font-medium">Change profile image</span>
			<div className="mt-4 flex justify-between">
				<div
					className="relative size-[120px] cursor-pointer"
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					{urlExists ? (
						<BlurImage
							src={profileUrl}
							className="size-[120px]"
							imageClasses="rounded-lg object-cover"
							width={120}
							height={120}
						/>
					) : (
						<CircleUserRound
							color="#cacfd2"
							width={120}
							height={120}
						/>
					)}
				</div>
				<Button
					disabled={isPending}
					loading={isPending}
					{...getRootProps()}
				>
					<Plus className="size-4" />
					<span>Upload image</span>
					<input {...getInputProps()} />
				</Button>
			</div>
		</div>
	);
};

export default ImageUpload;
