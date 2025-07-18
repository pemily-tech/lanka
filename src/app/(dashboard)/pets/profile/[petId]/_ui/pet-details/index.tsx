'use client';

import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { Camera, Check, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { useUpdatePetImage } from '../../_api/use-update-pet-image';
import { Actions } from './actions';

import { useGetPetById } from '@/api/queries/use-get-pet-byid';
import { useGetPetProfileImage } from '@/api/queries/use-get-pet-profile';
import { DATE_FORMAT, MAX_SIZE_500 } from '@/helpers/constant';
import { Routes } from '@/helpers/routes';
import { createFormDataForImage } from '@/helpers/utils';
import { BlurImage } from '@/ui/blur-image';
import { Button } from '@/ui/button';

export default function PetDetails() {
	const params = useParams();
	const { data: profileImage } = useGetPetProfileImage(
		params?.petId as string
	);
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId');

	const { data: petData } = useGetPetById(params?.petId as string);
	const { mutate: updatePetImage } = useUpdatePetImage(
		params?.petId as string
	);
	const { profileUrl } = profileImage?.data || {};
	const { name, code, breed, gender, type, dob, microChipNo } =
		petData?.data?.pet || {};
	const isUrlExists = profileUrl && profileUrl !== '';

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.map(async (acceptedFile) => {
				const formData = createFormDataForImage(
					acceptedFile as File,
					'file'
				);
				updatePetImage(formData);
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

	const { getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		maxSize: MAX_SIZE_500,
	});

	return (
		<div className="flex items-center justify-between gap-6">
			<div className="flex flex-row items-center justify-start gap-14 rounded-lg">
				<div className="flex gap-4">
					<div>
						<label className="relative block size-[120px] cursor-pointer rounded-full">
							<input {...getInputProps()} />
							{isUrlExists ? (
								<BlurImage
									src={profileUrl as string}
									className="size-[120px]"
									width={220}
									height={220}
									imageClasses="rounded-full"
									placeholderClasses="rounded-full"
								/>
							) : (
								<BlurImage
									src={
										type === 'CAT'
											? '/images/Cat.png'
											: '/images/Dog.png'
									}
									className="size-[120px]"
									source="local"
									imageClasses="rounded-full object-cover"
									width={220}
									height={220}
									placeholderClasses="rounded-full"
								/>
							)}
							<div className="bg-primary absolute bottom-0 right-2 rounded-full p-[2px] ring-2 ring-white">
								{isUrlExists ? (
									<Check className="size-4 text-white" />
								) : (
									<Camera className="size-6 p-1 text-white" />
								)}
							</div>
						</label>
					</div>
					<div className="flex flex-col items-start justify-center">
						<h3 className="text-2xl font-semibold">{name}</h3>
					</div>
				</div>
				<div>
					<p className="text-black/60">Breed:</p>
					<span>{breed}</span>
				</div>
				<div>
					<p className="text-black/60">Gender:</p>
					<span>{gender === 'M' ? 'Male' : 'Female'}</span>
				</div>
				<div>
					<p className="text-black/60">Type:</p>
					<span>{type === 'CAT' ? 'Cat' : 'Dog'}</span>
				</div>
				{dob && (
					<div>
						<p className="text-black/60">DOB:</p>
						<span>{format(dob as string, DATE_FORMAT)}</span>
					</div>
				)}
				<div>
					<p className="text-black/60">Code:</p>
					<span>{code}</span>
				</div>
				<div>
					<p className="text-black/60">Microchip No:</p>
					<span>{microChipNo}</span>
				</div>
			</div>
			<Actions
				parentId={parentId as string}
				petId={params?.petId as string}
			/>
		</div>
	);
}
