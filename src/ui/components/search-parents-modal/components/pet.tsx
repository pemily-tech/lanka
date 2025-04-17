import { memo } from 'react';

import useGetPetProfileImage from '../../../../api/use-get-pet-profile-image/get-pet-profile-image';
import { type IPet } from '../../../../types/common';
import { ImagePlaceholder } from '../../../shared/image';

const Pet = ({
	pet,
	height = 'h-[160px]',
	containerStyles,
	index,
}: {
	pet: IPet;
	height?: string;
	containerStyles?: string;
	index?: number;
}) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);

	return (
		<div
			className={`rounded-8 w-full cursor-pointer ${containerStyles}`}
			data-id={pet.petId}
			data-index={index}
		>
			{data?.data?.profileUrl && data?.data?.profileUrl !== '' ? (
				<ImagePlaceholder
					src={data?.data?.profileUrl as string}
					containerClasses={`w-full ${height}`}
					imageClasses={`rounded-10 object-cover`}
				/>
			) : (
				<ImagePlaceholder
					src={
						pet.type === 'CAT'
							? '/images/Cat.png'
							: '/images/Dog.png'
					}
					containerClasses={`w-full ${height}`}
					imageClasses="rounded-10 object-cover"
				/>
			)}
			<p className="text-14 pt-8 text-left font-medium">{pet.name}</p>
		</div>
	);
};

export default memo(Pet);
