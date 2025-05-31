'use client';

import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { Camera, Check, UserIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useUploadClinicLogo } from '@/api/mutations/upload-clinic-logo';
import { useGetClinicLogo } from '@/api/queries/use-get-clinic-logo';
import { MAX_SIZE_500 } from '@/helpers/constant';
import { createFormDataForImage } from '@/helpers/utils';

const Logo = () => {
	const { data } = useGetClinicLogo();
	const { logoUrl } = data?.data || {};
	const { mutate: uploadLogo } = useUploadClinicLogo();
	const isUrlExists = logoUrl && logoUrl !== '';

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.map(async (acceptedFile) => {
				const formData = createFormDataForImage(
					acceptedFile as File,
					'file'
				);
				uploadLogo(formData);
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
		<div className="w-[200px]">
			<div
				{...getRootProps()}
				className="border-primary-1 relative flex size-[200px] cursor-pointer items-center justify-center rounded-full border"
			>
				<input {...getInputProps()} />
				{isUrlExists ? (
					<img
						alt="logo"
						src={data?.data?.logoUrl as string}
						className="size-[200px] rounded-full object-cover"
					/>
				) : (
					<UserIcon width={120} height={120} />
				)}
				<div className="bg-primary absolute bottom-14 right-24 rounded-full p-[2px] ring-2 ring-white">
					{isUrlExists ? (
						<Check className="size-18 text-white" />
					) : (
						<Camera className="size-24 p-2 text-white" />
					)}
				</div>
			</div>
		</div>
	);
};

export default Logo;
