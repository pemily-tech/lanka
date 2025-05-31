import { type MouseEvent, useCallback, useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';
import debounce from 'lodash.debounce';

import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandList,
} from '../../ui/shared/command';

import { useGetPetParents } from '@/api/queries/use-get-pet-parent';
import { cn } from '@/helpers/utils';
import { UserProfile } from '@/ui/shared/profile-image/user';
import Spinner from '@/ui/shared/spinner';

export default function PetParent({
	setValue,
	selectedParentId,
}: {
	setValue: UseFormSetValue<any>;
	selectedParentId: string | undefined;
}) {
	const [value, setSearchValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const { data, isPending } = useGetPetParents({
		apiKey: 'clinic/parents',
		searchTerm: searchTerm,
		limit: 15,
	});
	const petParentData = data?.data?.parents || [];

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setSearchValue(val);
		debouncedSearch(val);
	};

	const handleSelect = async (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const target = (e.target as HTMLElement).closest(
			'[data-id]'
		) as HTMLElement;
		if (target && target.dataset.id) {
			setValue('parentId', target.dataset.id);
		}
	};

	return (
		<Command className="mb-16 mt-32 h-[380px] max-h-[380px] rounded-lg border md:min-w-[450px]">
			<CommandInput
				className="py-24"
				placeholder="Search for pet parents..."
				value={value}
				onValueChange={handleChange}
			/>
			<CommandList onClick={handleSelect} className="max-h-full">
				{isPending && <Spinner />}
				{petParentData?.map((parent) => {
					return (
						<div
							className={cn(
								'text-14 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-pointer select-none items-center gap-24 border-b px-12 py-8 outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-16 [&_svg]:shrink-0',
								selectedParentId === parent.parent.parentId &&
									'bg-primary/20 data-[selected=true]:bg-primary/20'
							)}
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
								<p className="text-14 text-left leading-[30px]">
									Pets: {parent?.parent?.petNames.join(', ')}
								</p>
								<p className="text-14 text-left leading-[30px]">
									{parent?.parent?.mobile}
								</p>
							</div>
						</div>
					);
				})}
				{!isPending && data && data?.data?.parents?.length <= 0 && (
					<CommandEmpty>No results found.</CommandEmpty>
				)}
			</CommandList>
		</Command>
	);
}
