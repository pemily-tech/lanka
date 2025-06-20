import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useGetPetProfileImage } from '@/api/queries/use-get-pet-profile';
import { useGetPets } from '@/api/queries/use-get-pets';
import { Routes } from '@/helpers/routes';
import { type IPetItem } from '@/types/common';
import { BlurImage } from '@/ui/blur-image';
import { Button } from '@/ui/button';
import Spinner from '@/ui/spinner';

export default function PetDetails({ parentId }: { parentId: string }) {
	const { data, isPending } = useGetPets({ parentId });
	const petsData = data?.data?.pets || ([] as IPetItem[]);

	if (isPending) {
		return (
			<div className="py-4">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="bg-muted/40 flex flex-wrap gap-6 rounded-b-md p-4">
			{petsData?.map((pet) => {
				return <Pet key={pet.petId} pet={pet} parentId={parentId} />;
			})}
			<Link
				href={`${Routes.PETS_CREATE}?parentId=${parentId}`}
				className="flex flex-col items-center justify-center gap-3"
			>
				<Button variant="outline" className="size-[120px] rounded-full">
					<Plus />
				</Button>
				<span>Add Pet</span>
			</Link>
		</div>
	);
}

const Pet = ({ pet, parentId }: { pet: IPetItem; parentId: string }) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);
	const isProfileExists =
		data?.data?.profileUrl && data?.data?.profileUrl !== '';

	return (
		<Link
			href={`${Routes.PET_PROFILE}/${pet.petId}?parentId=${parentId}&type=medical`}
			className="flex flex-col items-center justify-center gap-3"
		>
			{isProfileExists ? (
				<BlurImage
					src={data?.data?.profileUrl as string}
					className="size-[120px]"
					imageClasses="rounded-full object-cover"
					width={120}
					height={120}
					placeholderClasses="rounded-full"
				/>
			) : (
				<BlurImage
					src={
						pet.type === 'CAT'
							? '/images/Cat.png'
							: '/images/Dog.png'
					}
					className="size-[120px] rounded-full object-cover"
					width={120}
					height={120}
					source="local"
				/>
			)}
			<div>{pet.name}</div>
		</Link>
	);
};
