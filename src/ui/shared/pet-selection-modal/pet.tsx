import { Fragment, type MouseEvent } from 'react';
import { type UseFormSetValue } from 'react-hook-form';
import { Command as CommandPrimitive } from 'cmdk';

import useGetPetProfileImage from '../../../api/use-get-pet-profile-image/get-pet-profile-image';
import { useGetPets } from '../../../api/use-get-pets';
import { cn } from '../../../helpers/utils';
import { type IPetItem } from '../../../types/common';
import { CommandEmpty, CommandList } from '../command';
import { ImagePlaceholder } from '../image';
import Spinner from '../spinner';

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
		<CommandPrimitive>
			<div className="mb-16 mt-32 h-[380px] max-h-[380px] overflow-y-scroll rounded-lg border md:min-w-[450px]">
				<CommandList onClick={handleSelect} className="max-h-full">
					{isPending && <Spinner />}
					{petData?.map((pet) => {
						return (
							<div
								className={cn(
									'text-14 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-pointer select-none items-center gap-24 border-b px-12 py-8 outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-16 [&_svg]:shrink-0',
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
						<CommandEmpty className="pt-32 text-center">
							No pets found.
						</CommandEmpty>
					)}
				</CommandList>
			</div>
		</CommandPrimitive>
	);
}

export function PetDetails({ pet }: { pet: IPetItem }) {
	const { data } = useGetPetProfileImage(pet?.petId as string);
	const petImage = data?.data?.profileUrl || '';

	return (
		<Fragment>
			{petImage && petImage !== '' ? (
				<ImagePlaceholder
					src={petImage as string}
					containerClasses="size-[54px]"
					imageClasses={`rounded-10 object-cover`}
				/>
			) : (
				<ImagePlaceholder
					src={
						pet?.type === 'CAT'
							? '/images/Cat.png'
							: '/images/Dog.png'
					}
					containerClasses="size-[54px]"
					imageClasses="rounded-10 object-cover"
				/>
			)}
			<div>
				<p className="text-16 text-left font-medium">{pet?.name}</p>
			</div>
		</Fragment>
	);
}
