/* eslint-disable indent */
import { useCallback, useState } from 'react';
import { type FileRejection } from 'react-dropzone';
import { toast } from 'sonner';

import { useUploadMedicalRecord } from '@/app/(dashboard)/medical-records/_api/use-create-medical-record';
import { AppConstants } from '@/helpers/primitives';
import {
	createFormDataForDocument,
	createFormDataForImage,
} from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IMedicalRecord } from '@/types/clinic';
import { type IApiResponse, type IMedicalRecordFilter } from '@/types/common';

export function useRecord({
	petId,
	parentId,
	filterType,
	onFinish,
}: {
	petId: string;
	parentId: string;
	filterType: IMedicalRecordFilter;
	onFinish: () => void;
}) {
	const { mutateAsync: createMedicalRecord, isPending } =
		useUploadMedicalRecord({ petId });

	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [acceptedFile, setAcceptedFile] = useState<File | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.forEach((file) => {
				const url = URL.createObjectURL(file);
				setPreviewUrl(url);
				setAcceptedFile(file);
			});
			fileRejections.forEach((rejection) => {
				rejection.errors.forEach((error) => {
					toast.error(
						error.code === 'file-too-large'
							? 'File is too large. Maximum size allowed is 2MB.'
							: error.message
					);
				});
			});
		},
		[]
	);

	const onSubmit = async () => {
		if (!acceptedFile) return;

		const formData =
			acceptedFile.type === 'application/pdf'
				? createFormDataForDocument(acceptedFile, 'file', {
						type: filterType,
						parentId,
						clinicId: '',
					})
				: createFormDataForImage(acceptedFile, 'file', {
						type: filterType,
						parentId,
						clinicId: '',
					});

		const response = (await createMedicalRecord(
			formData
		)) as IApiResponse<IMedicalRecord>;
		if (response.status === AppConstants.Success) {
			setAcceptedFile(null);
			setPreviewUrl(null);
			queryClient.invalidateQueries({
				queryKey: [
					'clinic/medicalRecords',
					filterType,
					petId,
					undefined,
				],
			});
			onFinish();
		}
	};

	return {
		previewUrl,
		acceptedFile,
		onDrop,
		onSubmit,
		isPending,
		clear: () => {
			setAcceptedFile(null);
			setPreviewUrl(null);
		},
	};
}
