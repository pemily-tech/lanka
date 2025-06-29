import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { useUploadDoctorSignature } from '../../../_api/use-upload-doctor-signature';

import { useGetDoctorSignature } from '@/api/queries/use-doctor-signature';
import { MAX_SIZE_500 } from '@/helpers/constant';
import { AppConstants } from '@/helpers/primitives';
import { createFormDataForImage } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IDoctor } from '@/types/common';
import { BlurImage } from '@/ui/blur-image';

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
				if (response.status === AppConstants.Success) {
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
		<div className="mb-4 border-b border-border pb-4">
			<h4 className="mb-3 font-semibold text-black/80">
				Doctor eSignature:
			</h4>
			<div className="flex items-center justify-between">
				{signatureData?.data?.signatureUrl ? (
					<div className="cursor-pointer" {...getRootProps()}>
						<BlurImage
							src={signatureData?.data?.signatureUrl}
							className="h-[64px] w-[240px] border-none"
							width={240}
							height={64}
							imageClasses="bg-contain rounded-md"
						/>
						<input {...getInputProps()} />
					</div>
				) : (
					<div
						{...getRootProps()}
						className="bg-secondary flex cursor-pointer items-center gap-1 rounded-xl px-4 py-3 text-white"
					>
						<Plus className="size-4" />
						<span className="font-medium">Upload eSignature</span>
						<input {...getInputProps()} />
					</div>
				)}
			</div>
		</div>
	);
}
