import { Fragment, type MouseEvent } from 'react';
import { type UseFormSetValue } from 'react-hook-form';

import { useGetPetProfileImage } from '@/api/queries/use-get-pet-profile';
import { useGetPets } from '@/api/queries/use-get-pets';
import { cn } from '@/helpers/utils';
import { type IPetItem } from '@/types/common';
import { BlurImage } from '@/ui/blur-image';
import { Command, CommandEmpty, CommandList } from '@/ui/command';
import Spinner from '@/ui/spinner';

export default function Pet({
	setValue,
	selectedPetId,
	selectedParentId,
}: {
	setValue: UseFormSetValue<any>;
	selectedPetId: string | undefined;
	selectedParentId: string;
}) {
	const { data, isPending } = useGetPets({
		parentId: selectedParentId,
	});
	const petData = data?.data?.pets || [];

	const handleSelect = async (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const target = (e.target as HTMLElement).closest(
			'[data-id]'
		) as HTMLElement;
		if (target && target.dataset.id) {
			setValue('petId', target.dataset.id);
		}
	};

	return (
		<Command className="px-4">
			<div className="mb-4 mt-2 overflow-y-scroll rounded-lg border border-border md:min-w-[450px]">
				<CommandList onClick={handleSelect} className="max-h-full">
					{isPending && <Spinner />}
					{petData?.map((pet) => {
						return (
							<div
								className={cn(
									'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-pointer select-none items-center gap-6 border-b border-border px-3 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
									selectedPetId === pet.petId &&
										'bg-primary/20 data-[selected=true]:bg-primary/20'
								)}
								key={pet.petId}
								data-id={pet.petId}
							>
								<PetDetails pet={pet} />
							</div>
						);
					})}
					{!isPending && data && data?.data?.pets?.length <= 0 && (
						<CommandEmpty className="pt-8 text-center">
							No pets found.
						</CommandEmpty>
					)}
				</CommandList>
			</div>
		</Command>
	);
}

export function PetDetails({ pet }: { pet: IPetItem }) {
	const { data } = useGetPetProfileImage(pet?.petId as string);
	const petImage = data?.data?.profileUrl || '';

	return (
		<Fragment>
			{petImage && petImage !== '' ? (
				<BlurImage
					src={petImage as string}
					className="size-[54px] rounded-lg object-cover"
					width={64}
					height={64}
				/>
			) : (
				<BlurImage
					src={
						pet?.type === 'CAT'
							? '/images/Cat.png'
							: '/images/Dog.png'
					}
					source="local"
					className="size-[54px] rounded-lg object-cover"
					width={180}
					height={180}
				/>
			)}
			<div>
				<p className="text-left font-medium">{pet?.name}</p>
			</div>
		</Fragment>
	);
}
