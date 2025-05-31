/* eslint-disable max-lines-per-function */
import { useCallback, useState } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useUploadMedicalRecord } from '../_api/use-create-medical-record';

import { PdfIcon } from '@/components/icons/pdf-icon';
import { MAX_SIZE_2MB } from '@/helpers/constant';
import { AppConstants } from '@/helpers/primitives';
import {
	createFormDataForDocument,
	createFormDataForImage,
} from '@/helpers/utils';
import { type IMedicalRecord } from '@/types/clinic';
import { type IApiResponse, type IMedicalRecordFilter } from '@/types/common';
import { Button } from '@/ui/button';
import { LazyImage } from '@/ui/lazy-image';

export default function MedicalRecordForm({
	stepper,
	parentId,
	petId,
	filterType,
}: {
	stepper: any;
	parentId: string;
	petId: string;
	filterType: IMedicalRecordFilter;
}) {
	const { mutateAsync: createMedicalRecord, isPending } =
		useUploadMedicalRecord({ petId });
	const router = useRouter();
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [acceptedFile, setAcceptedFile] = useState<File | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.map(async (acceptedFile) => {
				const url = URL.createObjectURL(acceptedFile);
				setPreviewUrl(url);
				setAcceptedFile(acceptedFile);
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

	const { getInputProps, getRootProps } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
			'application/pdf': [],
		},
		maxSize: MAX_SIZE_2MB,
	});

	const onSubmit = async () => {
		let formData;
		if (acceptedFile?.type === 'application/pdf') {
			formData = createFormDataForDocument(acceptedFile as File, 'file', {
				type: filterType,
				parentId: parentId,
				clinicId: '',
			});
		} else {
			formData = createFormDataForImage(acceptedFile as File, 'file', {
				type: filterType,
				parentId: parentId,
				clinicId: '',
			});
		}
		const response = (await createMedicalRecord(
			formData as FormData
		)) as IApiResponse<IMedicalRecord>;
		if (response.status === AppConstants.Success) {
			setPreviewUrl(null);
			setAcceptedFile(null);
			router.back();
		}
	};
	console.log(previewUrl);

	return (
		<div className="mb-54 mt-24 flex h-full flex-col">
			<h2 className="text-24 mx-24 font-semibold">
				Upload a photo of your Prescription
			</h2>
			<h6 className="text-black-1/50 mx-24 mb-24">
				You can upload JPEG or PNG up to 2MB
			</h6>
			<div className="mb-24 h-full px-24">
				<div
					{...getRootProps()}
					className="border-black-1/20 relative z-10 flex h-[240px] w-[420px] cursor-pointer items-center justify-center rounded-xl border"
				>
					<input {...getInputProps()} />
					{!previewUrl && (
						<div>
							<p className="text-16 text-center font-medium">
								Drag and drop a file here, or click to select a
								file
							</p>
							<p className="text-black-1/40 text-center">
								Max Size: 2MB
							</p>
						</div>
					)}
					{previewUrl &&
						(acceptedFile?.type === 'application/pdf' ? (
							<PdfIcon className="size-full p-16" />
						) : (
							<LazyImage
								src={previewUrl as string}
								className="size-full rounded-xl object-cover"
							/>
						))}
					{previewUrl && (
						<div
							onClick={(e) => {
								e.stopPropagation();
								setPreviewUrl(null);
								setAcceptedFile(null);
							}}
							className="border-destructive absolute -right-10 -top-10 z-10 flex size-24 cursor-pointer items-center justify-center rounded-full border bg-white"
						>
							<X className="text-destructive size-16" />
						</div>
					)}
				</div>
			</div>

			{stepper.isLast && (
				<div className="shadow-top sticky bottom-0 left-0 flex w-full justify-end gap-16 rounded-b-lg bg-white px-24 py-16">
					<Button
						type="button"
						variant="secondary"
						onClick={stepper.prev}
						disabled={stepper.isFirst}
						className="w-[240px]"
					>
						Back
					</Button>
					<Button
						disabled={isPending}
						type="submit"
						className="w-[240px]"
						onClick={onSubmit}
					>
						{stepper.isLast ? 'Done' : 'Next'}
					</Button>
				</div>
			)}
		</div>
	);
}
