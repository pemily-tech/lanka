'use client';

import { memo } from 'react';
import { CameraIcon, EditIcon, PlusIcon } from 'lucide-react';

import Pet from '../../../../../ui/components/pet';
import { Button } from '../../../../../ui/shared/button';
import { ImagePlaceholder } from '../../../../../ui/shared/image';
import usePetParentHook from '../../hooks/pet-parent';

function PetParent({
	parentId,
	memberId,
	refetchParents,
}: {
	parentId: string;
	memberId: string;
	refetchParents: () => void;
}) {
	const {
		onChange,
		handlePet,
		handleAddPet,
		handleEditParent,
		profileUrl,
		parent,
		pets,
	} = usePetParentHook(parentId, memberId, refetchParents);

	return (
		<div className="sticky top-[12px] z-10 col-span-2">
			<div className="shadow-base rounded-8 max-h-[calc(100vh-62px)] w-full overflow-y-scroll bg-white px-16 py-12">
				<div className="flex items-start gap-32">
					<div className=" relative size-[142px] rounded-full bg-white">
						<ImagePlaceholder
							src={profileUrl as string}
							containerClasses="w-[142px] h-[142px] "
							imageClasses="rounded-full object-cover border"
						/>
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
					<div className="flex flex-1 flex-col justify-center gap-6">
						<h4 className="text-24 font-medium">{parent?.name}</h4>
						<p className="text-14">{parent?.mobile}</p>
					</div>
					<Button
						onClick={handleEditParent}
						className="border-primary rounded-8 shadow-base bg-primary flex items-center justify-center gap-6 border px-8 py-6"
						size="lg"
					>
						<EditIcon color="#FFF" width={14} height={14} />
						<span className="text-14 font-medium text-white">
							Edit
						</span>
					</Button>
				</div>
				<div className="mt-32 grid grid-cols-2 gap-16">
					{pets?.map((pet) => {
						return (
							<Pet
								height="h-[160px]"
								handlePet={() => handlePet(pet)}
								key={pet.petId}
								pet={pet}
							/>
						);
					})}
					<Button
						onClick={handleAddPet}
						className="rounded-8 border-grey-border2 flex h-[210px] flex-col items-center justify-center gap-6 border"
						variant="outline"
					>
						<span className="w-42 h-42 bg-primary flex items-center justify-center rounded-full">
							<PlusIcon color="#FFF" />
						</span>
						<span className="text-14 font-medium">Add Pet</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default memo(PetParent);
