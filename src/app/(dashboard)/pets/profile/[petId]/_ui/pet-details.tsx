'use client';

import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { Camera, Check, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { useUpdatePetImage } from '../_api/use-update-pet-image';

import { useGetPetById } from '@/api/queries/use-get-pet-byid';
import { useGetPetProfileImage } from '@/api/queries/use-get-pet-profile';
import { DATE_FORMAT, MAX_SIZE_500 } from '@/helpers/constant';
import { Routes } from '@/helpers/routes';
import { createFormDataForImage } from '@/helpers/utils';
import { Button } from '@/ui/button';
import { LazyImage } from '@/ui/lazy-image';

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
		<div className="flex items-center justify-between gap-24">
			<div className="gap-54 flex flex-row items-center justify-start rounded-[16px]">
				<div className="flex gap-16">
					<div>
						<label className="relative block size-[120px] cursor-pointer rounded-full">
							<input {...getInputProps()} />
							{isUrlExists ? (
								<LazyImage
									src={profileUrl as string}
									className="size-[120px] rounded-full"
								/>
							) : (
								<LazyImage
									src={
										type === 'CAT'
											? '/images/Cat.png'
											: '/images/Dog.png'
									}
									className="size-[120px] rounded-full object-cover"
								/>
							)}
							<div className="bg-primary absolute bottom-0 right-10 rounded-full p-[2px] ring-2 ring-white">
								{isUrlExists ? (
									<Check className="size-18 text-white" />
								) : (
									<Camera className="size-28 p-4 text-white" />
								)}
							</div>
						</label>
					</div>
					<div className="flex flex-col items-start justify-center">
						<h3 className="text-24 font-semibold">{name}</h3>
					</div>
				</div>
				<div>
					<p className="text-black-1/60">Breed:</p>
					<span>{breed}</span>
				</div>
				<div>
					<p className="text-black-1/60">Gender:</p>
					<span>{gender === 'M' ? 'Male' : 'Female'}</span>
				</div>
				<div>
					<p className="text-black-1/60">Type:</p>
					<span>{type === 'CAT' ? 'Cat' : 'Dog'}</span>
				</div>
				{dob && (
					<div>
						<p className="text-black-1/60">DOB:</p>
						<span>{format(dob as string, DATE_FORMAT)}</span>
					</div>
				)}
				<div>
					<p className="text-black-1/60">Code:</p>
					<span>{code}</span>
				</div>
				<div>
					<p className="text-black-1/60">Microchip No:</p>
					<span>{microChipNo}</span>
				</div>
			</div>
			<Link
				href={`${Routes.PETS_UPDATE}/${params?.petId}?parentId=${parentId}`}
				className="flex gap-6"
			>
				<Button variant="link">
					<Pencil className="size-16" />
					<span>Edit Pet</span>
				</Button>
			</Link>
		</div>
	);
}
