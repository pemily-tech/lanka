'use client';

import { Fragment, useState } from 'react';

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
import { useGetPetParentsList } from './api/use-get-pet-parents';

export function SearchPetParents({
	handleParent,
}: {
	handleParent: (e: MouseEvent<HTMLDivElement>) => void;
}) {
	const [value, setValue] = useState('');
	const { data, isPending } = useGetPetParentsList({
		apiKey: 'clinic/parents',
		searchTerm: value,
		limit: 15,
	});
	const petParentData = data?.data?.parents || [];

	return (
		<Command className="rounded-lg border shadow-md md:min-w-[450px]">
			<CommandInput
				className="py-24"
				placeholder="Search for pets and parents..."
				value={value}
				onValueChange={setValue}
			/>
			<CommandList onClick={handleParent} className="max-h-screen py-8">
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
										{parent?.parent?.petNames.join(',')}
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
				{!isPending && data && data?.data?.parents?.length <= 0 && (
					<CommandEmpty>No results found.</CommandEmpty>
				)}
			</CommandList>
		</Command>
	);
}
