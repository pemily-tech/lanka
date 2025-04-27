import { Fragment, useState } from 'react';

import { useGetPetParents } from '../../../api/get-pet-parent';
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

export default function PetParent() {
	const [value, setValue] = useState('');
	const { data, isPending } = useGetPetParents({
		apiKey: 'clinic/parents',
		searchTerm: value,
		limit: 15,
	});
	const petParentData = data?.data?.parents || [];

	return (
		<Command className="mb-16 mt-32 rounded-lg border md:min-w-[450px]">
			<CommandInput
				className="py-24"
				placeholder="Search for pet parents..."
				value={value}
				onValueChange={setValue}
			/>
			<CommandList>
				{isPending && <Spinner />}
				{petParentData?.map((parent) => {
					return (
						<Fragment key={parent._id}>
							<CommandItem
								className="flex gap-24"
								key={parent._id}
								data-id={parent.parent.parentId}
							>
								<UserProfile
									id={parent?.parent?.parentId}
									containerClasses="!size-[54px]"
									imageClasses="!rounded-8"
									iconClasses="!size-[54px]"
								/>
								<div>
									<p className="text-16 text-left font-medium">
										{parent?.parent?.name}
									</p>
									<p className="text-14 text-left leading-[30px]">
										Pets:{' '}
										{parent?.parent?.petNames.join(', ')}
									</p>
									<p className="text-14 text-left leading-[30px]">
										{parent?.parent?.mobile}
									</p>
								</div>
							</CommandItem>
							<CommandSeparator />
						</Fragment>
					);
				})}
			</CommandList>
		</Command>
	);
}
