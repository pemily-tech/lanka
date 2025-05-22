/* eslint-disable max-lines-per-function */
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { DeleteIcon, FileText, Image } from 'lucide-react';

import useUploadMedicalRecord from '../../../../api/use-upload-medical-record/upload-medical-record';
import {
	createFormDataForDocument,
	createFormDataForImage,
	firstCharCapital,
} from '../../../../helpers/utils';
import { closeModal } from '../../../../store/modal';
import { type IMedicalRecord } from '../../../../types/clinic';
import { type IApiResponse, type IUploadType } from '../../../../types/common';
import { ImagePlaceholder } from '../../../shared/image';

import { Button } from '@/ui/shared/button';

export default function RecordUpload({
	filter,
	parentId,
	petId,
	refetch,
	activeClinic,
}: {
	filter: string;
	parentId: string;
	petId: string;
	refetch: () => void;
	activeClinic: string;
}) {
	const dispatch = useDispatch();
	const [files, setFiles] = useState<IUploadType[]>([]);
	const { mutateAsync: uploadMedicalRecord, isPending } =
		useUploadMedicalRecord({
			petId: petId as string,
		});

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': [],
			'application/pdf': [],
		},
		onDrop: (acceptedFiles) => {
			const mappedFiles = acceptedFiles.map((acceptedFile, index) => {
				return {
					file: acceptedFile,
					preview:
						acceptedFile.type === 'application/pdf'
							? ''
							: URL.createObjectURL(acceptedFile),
					index: index.toString(),
				};
			});
			setFiles(mappedFiles);
		},
	});

	const handleUpload = async () => {
		const { file } = files[0];
		let formData;
		if (file.type === 'application/pdf') {
			formData = createFormDataForDocument(file, 'file', {
				type: filter,
				parentId: parentId,
				clinicId: activeClinic,
			});
		} else {
			formData = createFormDataForImage(file, 'file', {
				type: filter,
				parentId: parentId,
				clinicId: activeClinic,
			});
		}
		const response = (await uploadMedicalRecord(
			formData
		)) as IApiResponse<IMedicalRecord>;
		if (response.status === 'SUCCESS') {
			dispatch(closeModal());
			setFiles([]);
			refetch();
		}
	};

	return (
		<div className="rounded-8 mt-16 bg-white">
			<div className="p-16">
				<h3 className="text-22 font-semibold leading-[24px]">
					Upload a photo of your Prescription
				</h3>
				<p className="text-18 mt-12">
					You can upload JPEG or PNG up to 2MB
				</p>
				<div className="flex items-end justify-between">
					{files.length === 0 && (
						<div
							{...getRootProps({
								className:
									'dropzone cursor-pointer h-[120px] border-[3px] border-[#12D18E] flex items-center justify-center flex-col rounded-[20px] mt-24 w-[220px]',
							})}
						>
							<input
								className="border-grey-border1 hidden"
								{...getInputProps()}
							/>
							<Image />
							<p className="text-grey-3 text-12 pt-12 text-center">
								Drop files here or click to upload.
							</p>
						</div>
					)}
					{files.length > 0 && (
						<div className="relative mt-24 h-[120px]  w-[220px]">
							{files.map((file) => {
								return (
									<div
										key={file.index}
										className="flex h-[120px] w-[220px] flex-col items-center justify-center rounded-[20px] border-[3px] border-[#12D18E]"
									>
										{file.preview !== '' ? (
											<ImagePlaceholder
												src={file.preview}
												alt=""
												className="relative h-[92px] w-full"
												imageClasses="rounded-[20px] object-contain"
												onLoad={() => {
													URL.revokeObjectURL(
														file.preview
													);
												}}
											/>
										) : (
											<FileText width={92} height={92} />
										)}
									</div>
								);
							})}
							{files.length > 0 && (
								<Button
									onClick={() => setFiles([])}
									className="border-grey-2 !absolute right-3 top-3 flex  size-32 items-center justify-center rounded-tr-[20px] border bg-white"
									variant="ghost"
									size="icon"
								>
									<DeleteIcon className="text-red-1" />
								</Button>
							)}
						</div>
					)}
					<Button
						onClick={handleUpload}
						disabled={files.length === 0 || isPending}
						loading={isPending}
					>
						<span className="font-black tracking-[-0.41px]">
							Upload {firstCharCapital(filter)}
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
