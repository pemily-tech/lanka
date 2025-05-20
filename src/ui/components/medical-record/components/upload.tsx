'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, Trash2Icon } from 'lucide-react';

import { type IUploadType } from '../../../../types/common';
import { PdfIcon } from '../../../icons/pdf-icon';
import { Button } from '../../../shared/button';
import { ImagePlaceholder } from '../../../shared/image';

const Upload = ({
	btnTxt,
	handleClick,
	isLoading,
	headingTxt,
}: {
	btnTxt: string;
	handleClick: (file: IUploadType, setFiles: (files: []) => void) => void;
	isLoading: boolean;
	headingTxt: string;
}) => {
	const [files, setFiles] = useState<IUploadType[]>([]);
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

	return (
		<div className="relative flex h-full flex-col px-16">
			<div className="flex-1 pt-32">
				<h3 className="text-22 font-semibold leading-[24px]">
					{headingTxt}
				</h3>
				<p className="text-18 mt-12">
					You can upload JPEG or PNG up to 2MB
				</p>
				{files.length === 0 && (
					<div
						{...getRootProps({
							className:
								'dropzone cursor-pointer h-[200px] border-[3px] border-[#12D18E] flex items-center justify-center flex-col rounded-[20px] mt-24',
						})}
					>
						<input
							className="border-grey-border1 hidden"
							{...getInputProps()}
						/>
						<Image />
						<p className="text-grey-3 pt-12">
							Drop files here or click to upload.
						</p>
					</div>
				)}
				<div className="relative">
					{files.length > 0 && (
						<>
							{files.map((file) => {
								return (
									<div
										key={file.index}
										className="mt-24 flex h-[200px] flex-col items-center justify-center rounded-[20px] border-[3px] border-[#12D18E]"
									>
										{file.preview !== '' ? (
											<ImagePlaceholder
												src={file.preview}
												alt=""
												className="relative h-[200px] w-full"
												imageClasses="rounded-[20px] object-contain"
												onLoad={() => {
													URL.revokeObjectURL(
														file.preview
													);
												}}
											/>
										) : (
											<PdfIcon width={180} height={180} />
										)}
									</div>
								);
							})}
						</>
					)}
					{files.length > 0 && (
						<Button
							onClick={() => setFiles([])}
							className="shadow-base border-grey-2 !absolute right-10 top-1/2 flex size-32 -translate-y-1/2 items-center justify-center rounded-full border"
							size="icon"
							variant="ghost"
						>
							<Trash2Icon className="text-red-1 !size-18" />
						</Button>
					)}
				</div>
			</div>
			<Button
				disabled={files.length === 0 || isLoading}
				className="mb-12 w-full px-16 font-bold tracking-[-0.41px]"
				onClick={() => handleClick(files[0], setFiles)}
				loading={isLoading}
			>
				<span className="font-black tracking-[-0.41px]">{btnTxt}</span>
			</Button>
		</div>
	);
};

export default Upload;
