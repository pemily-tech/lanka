import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

import { useRecord } from './use-record';

import { MAX_SIZE_2MB } from '@/helpers/constant';
import { cn } from '@/helpers/utils';
import { type IMedicalRecordFilter } from '@/types/common';
import { Button } from '@/ui/button';
import { LazyImage } from '@/ui/lazy-image';

export default function MedicalRecordForm({
	stepper,
	parentId,
	petId,
	filterType,
	isModal = false,
	onFinish,
}: {
	stepper?: any;
	parentId: string;
	petId: string;
	filterType: IMedicalRecordFilter;
	isModal?: boolean;
	onFinish: () => void;
}) {
	const { previewUrl, onDrop, acceptedFile, isPending, onSubmit, clear } =
		useRecord({ petId, parentId, filterType, onFinish });

	const { getInputProps, getRootProps } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
			'application/pdf': [],
		},
		maxSize: MAX_SIZE_2MB,
	});

	const handleSubmit = () => {
		onSubmit();
	};

	return (
		<div
			className={cn('mb-12 mt-1 flex h-full flex-col', isModal && 'my-0')}
		>
			<h2 className="mx-6 text-2xl font-semibold">
				Upload a photo of your Prescription
			</h2>
			<h6 className="mx-6 mb-6 text-black/50">
				You can upload JPEG or PNG up to 2MB
			</h6>
			<div className="mb-6 h-full px-6">
				<div
					{...getRootProps()}
					className="border-black-1/20 relative z-10 flex h-[240px] w-[420px] cursor-pointer items-center justify-center rounded-xl border border-border"
				>
					<input {...getInputProps()} />
					{!previewUrl && (
						<div>
							<p className="text-center font-medium">
								Drag and drop a file here, or click to select a
								file
							</p>
							<p className="text-center text-black/40">
								Max Size: 2MB
							</p>
						</div>
					)}
					{previewUrl && (
						<LazyImage
							src={
								acceptedFile?.type === 'application/pdf'
									? '/images/pdf.png'
									: (previewUrl as string)
							}
							className={cn(
								'size-full rounded-xl object-cover',
								acceptedFile?.type === 'application/pdf' &&
									'object-contain p-4'
							)}
						/>
					)}
					{previewUrl && (
						<div
							onClick={(e) => {
								e.stopPropagation();
								clear();
							}}
							className="border-destructive absolute -right-2 -top-2 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full border bg-white"
						>
							<X className="text-destructive size-4" />
						</div>
					)}
				</div>
			</div>
			{isModal ? (
				<div className="px-6">
					<Button
						disabled={isPending || !acceptedFile}
						type="submit"
						className="w-[240px]"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</div>
			) : (
				<>
					{stepper.isLast && (
						<div className="shadow-top sticky bottom-0 left-0 flex w-full justify-end gap-4 rounded-b-lg bg-white px-6 py-4">
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
								disabled={isPending || !acceptedFile}
								type="submit"
								className="w-[240px]"
								onClick={handleSubmit}
							>
								{stepper.isLast ? 'Done' : 'Next'}
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
