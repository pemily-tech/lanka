import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

import { createFormDataForDocument } from '../../../../../../helpers/utils';
import { queryClient } from '../../../../../../services/providers';
import { useUploadAttachDocs } from '../../_api/use-upload-attach-docs';

import { AppConstants } from '@/helpers/primitives';

export default function UploadCard({ type }: { type: string }) {
	const params = useParams();
	const prescriptionNo = params?.precriptionNo as string;
	const { mutateAsync: uploadAttachDocs } =
		useUploadAttachDocs(prescriptionNo);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.map(async (acceptedFile) => {
			const formData = createFormDataForDocument(
				acceptedFile as File,
				'file',
				{
					type,
				}
			);
			const response = await uploadAttachDocs(formData);
			if (response.status === AppConstants.Success) {
				queryClient.invalidateQueries({
					queryKey: [
						'prescription/attachedDocuments',
						prescriptionNo,
						type,
					],
				});
			}
		});
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': [],
			'application/msword': [],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				[],
			'text/plain': [],
			'application/vnd.ms-excel': [],
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				[],
		},
	});

	return (
		<div
			{...getRootProps()}
			className="flex cursor-pointer flex-col items-center gap-4 rounded-lg border-2 border-dashed border-gray-200 p-3"
		>
			<FileIcon className="size-6" />
			<div className="flex flex-col gap-1 text-center">
				<span className="text-md font-medium text-gray-500">
					Drag and drop a file or click to browse
				</span>
				<span className="text-xs text-gray-500">PDF, image</span>
			</div>
			<input {...getInputProps()} />
		</div>
	);
}
