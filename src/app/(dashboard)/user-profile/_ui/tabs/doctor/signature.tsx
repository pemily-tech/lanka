import { type } from 'os';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileIcon, Plus } from 'lucide-react';

import { useUploadDoctorSignature } from '../../../_api/use-upload-doctor-signature';

import uploadUserProfile from '@/api/upload-user-profile/upload-user-profile';
import { useGetDoctorSignature } from '@/api/use-doctor-signature';
import {
	createFormDataForDocument,
	createFormDataForImage,
} from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IDoctor } from '@/types/common';
import { Button } from '@/ui/shared';

export default function Signature({ doctor }: { doctor: IDoctor }) {
	const { data: signatureData } = useGetDoctorSignature({
		doctorId: doctor?.doctorId,
	});
	const { mutateAsync: uploadSignature } = useUploadDoctorSignature(
		doctor?.doctorId
	);

	const onDrop = useCallback((acceptedFiles: File[]) => {
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
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/*': [],
		},
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
						className="bg-secondary flex cursor-pointer items-center gap-6 rounded-xl px-16 py-12 text-white"
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
