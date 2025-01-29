'use client';

import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { CameraIcon, EditIcon } from 'lucide-react';

import useGetPetById from '../../../../../api/use-get-pet-by-id/get-pet-by-id';
import useGetPetProfileImage from '../../../../../api/use-get-pet-profile-image/get-pet-profile-image';
import useUpdatePetImage from '../../../../../api/use-update-pet-image/update-pet-image';
import { ModalTypes } from '../../../../../helpers/primitives';
import { createFormDataForImage } from '../../../../../helpers/utils';
import useRouterQuery from '../../../../../hooks/use-router-query';
import { openModal } from '../../../../../store/modal';
import { Button } from '../../../../../ui/shared/button';
import { ImagePlaceholder } from '../../../../../ui/shared/image';
import Spinner from '../../../../../ui/shared/spinner';
import PetBasicDetails from './shared/pet-basic-details';

const PetImage = () => {
	const { query } = useRouterQuery();
	const {
		data: profileData,
		refetch,
		isPending,
	} = useGetPetById(query?.id as string);
	const { data: profileImage } = useGetPetProfileImage(query?.id as string);
	const { profileUrl } = profileImage?.data || {};
	const { name, breed, microChipNo, gender, type, dob, code } =
		profileData?.data?.pet || {};
	const { mutate: updatePetImage } = useUpdatePetImage(query?.id as string);
	const dispatch = useDispatch();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			updatePetImage(formData);
		}
	};

	const handleEditPet = () => {
		dispatch(
			openModal({
				view: ModalTypes.ADD_EDIT_PET,
				type: 'edit',
				data: {
					petId: query?.id,
				},
				refetch,
				center: true,
			})
		);
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="shadow-base top-54 sticky col-span-1 flex flex-col items-center justify-center rounded-[16px] bg-white px-16 py-32">
			<Button
				onClick={handleEditPet}
				className="!absolute right-12 top-12"
				variant="ghost"
				size="icon"
			>
				<EditIcon width={18} height={18} />
			</Button>
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
