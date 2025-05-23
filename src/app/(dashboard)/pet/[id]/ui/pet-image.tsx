'use client';

import { format } from 'date-fns';
import { CameraIcon, EditIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import useGetPetById from '../../../../../api/use-get-pet-by-id/get-pet-by-id';
import useGetPetProfileImage from '../../../../../api/use-get-pet-profile-image/get-pet-profile-image';
import useUpdatePetImage from '../../../../../api/use-update-pet-image/update-pet-image';
import { createFormDataForImage } from '../../../../../helpers/utils';
import useRouterQuery from '../../../../../hooks/use-router-query';
import { ImagePlaceholder } from '../../../../../ui/shared/image';
import Spinner from '../../../../../ui/shared/spinner';
import PetBasicDetails from './shared/pet-basic-details';

import { Routes } from '@/helpers/routes';
import { Button } from '@/ui/shared/button';

const PetImage = () => {
	const { query } = useRouterQuery();
	const { data: profileData, isPending } = useGetPetById(query?.id as string);
	const { data: profileImage } = useGetPetProfileImage(query?.id as string);
	const { profileUrl } = profileImage?.data || {};
	const { name, breed, microChipNo, gender, type, dob, code } =
		profileData?.data?.pet || {};
	const { mutate: updatePetImage } = useUpdatePetImage(query?.id as string);
	const searchParams = useSearchParams();
	const parentId = searchParams.get('parentId');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			updatePetImage(formData);
		}
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="shadow-base top-54 sticky col-span-1 flex flex-col items-center justify-center rounded-[16px] bg-white px-16 py-32">
			<Link
				href={`${Routes.PETS_UPDATE}/${query?.id}?parentId=${parentId}`}
			>
				<Button
					className="!absolute right-12 top-12"
					variant="ghost"
					size="icon"
				>
					<EditIcon width={18} height={18} />
				</Button>
			</Link>
			<div>
				<div className=" relative size-[168px] rounded-full bg-white">
					{profileUrl && profileUrl !== '' ? (
						<ImagePlaceholder
							src={profileUrl as string}
							containerClasses="w-[160px] h-[160px] "
							imageClasses="rounded-full object-cover"
						/>
					) : (
						<ImagePlaceholder
							src={
								type === 'CAT'
									? '/images/Cat.png'
									: '/images/Dog.png'
							}
							containerClasses="w-full h-[160px]"
							imageClasses="rounded-full object-cover"
						/>
					)}
					<label className="z-3 bg-primary shadow-base3 absolute right-0 top-[26px] flex size-[32px] cursor-pointer items-center justify-center rounded-full">
						<input
							type="file"
							onChange={onChange}
							className="hidden w-full"
						/>
						<CameraIcon
							className="text-white"
							width={18}
							height={18}
						/>
					</label>
				</div>
			</div>
			<PetBasicDetails
				name={name as string}
				gender={gender as string}
				dob={format(dob as string, 'do MMM, yyyy')}
				breed={breed as string}
				type={type as string}
				code={code as string}
				microChipNo={microChipNo as string}
			/>
		</div>
	);
};

export default PetImage;
