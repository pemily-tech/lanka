import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { useUploadDoctorSignature } from '../../../_api/use-upload-doctor-signature';

import { useGetDoctorSignature } from '@/api/queries/use-doctor-signature';
import { MAX_SIZE_500 } from '@/helpers/constant';
import { createFormDataForImage } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IDoctor } from '@/types/common';

export default function Signature({ doctor }: { doctor: IDoctor }) {
	const { data: signatureData } = useGetDoctorSignature({
		doctorId: doctor?.doctorId,
	});
	const { mutateAsync: uploadSignature } = useUploadDoctorSignature(
		doctor?.doctorId
	);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.map(async (acceptedFile) => {
				const formData = createFormDataForImage(
					acceptedFile as File,
					'file'
				);
				const response = await uploadSignature(formData);
				if (response.status === 'SUCCESS') {
					queryClient.invalidateQueries({
						queryKey: ['clinic/signatureUrl', doctor.doctorId],
					});
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
		<div className="mb-16 border-b pb-16">
			<h4 className="text-black-1/80 mb-12 font-semibold">
				Doctor eSignature:
			</h4>
			<div className="flex items-center justify-between">
				{signatureData?.data?.signatureUrl ? (
					<div className="cursor-pointer" {...getRootProps()}>
						<img
							src={signatureData?.data?.signatureUrl}
							className="h-[64px] w-[240px] border-none bg-contain"
						/>
						<input {...getInputProps()} />
					</div>
				) : (
					<div
						{...getRootProps()}
						className="bg-secondary flex cursor-pointer items-center gap-6 rounded-xl px-16 py-3 text-white"
					>
						<Plus className="size-16" />
						<span>Upload eSignature</span>
						<input {...getInputProps()} />
					</div>
				)}
			</div>
		</div>
	);
}
