import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useGetPetProfileImage } from '@/api/use-get-pet-profile';
import { useGetPets } from '@/api/use-get-pets';
import { Routes } from '@/helpers/routes';
import { type IPetItem } from '@/types/common';
import { Button } from '@/ui/shared/button';
import { LazyImage } from '@/ui/shared/lazy-image';
import Spinner from '@/ui/shared/spinner';

export default function PetDetails({ parentId }: { parentId: string }) {
	const { data, isPending } = useGetPets({ parentId });
	const petsData = data?.data?.pets || ([] as IPetItem[]);

	if (isPending) {
		return (
			<div className="py-16">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="bg-muted/40 flex flex-wrap gap-24 rounded-b-md p-16">
			{petsData?.map((pet) => {
				return <Pet key={pet.petId} pet={pet} parentId={parentId} />;
			})}
			<Link
				href={`${Routes.PETS_CREATE}?parentId=${parentId}`}
				className="flex flex-col items-center justify-center gap-12"
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
			href={`/pet/${pet.petId}?parentId=${parentId}`}
			className="flex flex-col items-center justify-center gap-12"
		>
			{isProfileExists ? (
				<LazyImage
					src={data?.data?.profileUrl as string}
					className="size-[120px] rounded-full object-cover"
				/>
			) : (
				<LazyImage
					src={
						pet.type === 'CAT'
							? '/images/Cat.png'
							: '/images/Dog.png'
					}
					className="size-[120px] rounded-full object-cover"
				/>
			)}
			<div>{pet.name}</div>
		</Link>
	);
};
