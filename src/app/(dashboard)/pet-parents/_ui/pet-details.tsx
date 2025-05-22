import { useGetPetProfileImage } from '@/api/use-get-pet-profile';
import { useGetPets } from '@/api/use-get-pets';
import { type IPetItem } from '@/types/common';
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
		<div className="bg-muted/40 flex gap-24 rounded-b-md p-16">
			{petsData?.map((pet) => {
				return <Pet key={pet.petId} pet={pet} />;
			})}
		</div>
	);
}

const Pet = ({ pet }: { pet: IPetItem }) => {
	const { data } = useGetPetProfileImage(pet?.petId as string);
	const isProfileExists =
		data?.data?.profileUrl && data?.data?.profileUrl !== '';

	return (
		<div className="flex flex-col items-center justify-center gap-12">
			{isProfileExists ? (
				<LazyImage
					src={data?.data?.profileUrl as string}
					className="size-[120px] rounded-full"
				/>
			) : (
				<LazyImage
					src={
						pet.type === 'CAT'
							? '/images/Cat.png'
							: '/images/Dog.png'
					}
					className="size-[120px] rounded-full"
				/>
			)}
			<div>{pet.name}</div>
		</div>
	);
};
