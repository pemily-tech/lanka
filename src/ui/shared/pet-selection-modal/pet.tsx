import { Fragment, type MouseEvent, useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';

import useGetPets from '../../../api/use-get=pets';
import { cn } from '../../../helpers/utils';
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '../command';
import { UserProfile } from '../profile-image/user';
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
		<Command className="mb-16 mt-32 h-[380px] max-h-[380px] rounded-lg border md:min-w-[450px]">
			<CommandList onClick={handleSelect} className="max-h-full">
				{isPending && <Spinner />}
				{petData?.map((pet) => {
					return (
						<Fragment key={pet.petId}>
							<CommandItem
								className={cn(
									'flex gap-24',
									selectedPetId === pet.petId &&
										'bg-primary/20'
								)}
								data-id={pet.petId}
							>
								<UserProfile
									id={pet.petId}
									containerClasses="!size-[54px]"
									imageClasses="!rounded-8"
									iconClasses="!size-[54px]"
								/>
								<div>
									<p className="text-16 text-left font-medium">
										{pet.name}
									</p>
								</div>
							</CommandItem>
							<CommandSeparator />
						</Fragment>
					);
				})}
				{!isPending && data && data?.data?.pets?.length <= 0 && (
					<CommandEmpty className="pt-32 text-center">
						No pets found.
					</CommandEmpty>
				)}
			</CommandList>
		</Command>
	);
}
