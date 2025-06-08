'use client';

import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { CircleUserRound, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { useGetUserProfileUrl } from '@/api/queries/use-get-user-profile-image';
import { useUploadPetParentProfile } from '@/app/(dashboard)/pet-parents/_api/use-upload-profile';
import { MAX_SIZE_500 } from '@/helpers/constant';
import { createFormDataForImage } from '@/helpers/utils';
import { Button } from '@/ui/button';
import { LazyImage } from '@/ui/lazy-image';

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
				if (response.status === 'SUCCESS') {
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
		<div className="shadow-card rounded-lg bg-white p-4">
			<span className="font-medium">Change profile image</span>
			<div className="mt-16 flex justify-between">
				<div
					className="relative size-[120px] cursor-pointer"
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					{urlExists ? (
						<LazyImage
							src={profileUrl}
							className="size-[120px] rounded-lg object-cover"
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
					<Plus className="size-18" />
					<span>Upload image</span>
					<input {...getInputProps()} />
				</Button>
			</div>
		</div>
	);
};

export default ImageUpload;
