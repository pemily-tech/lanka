import { type MouseEvent, useCallback, useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';
import debounce from 'lodash.debounce';

import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandList,
} from '../../ui/command';
import { UserProfile } from '../user-profile';

import { useGetPetParents } from '@/api/queries/use-get-pet-parent';
import { cn } from '@/helpers/utils';
import Spinner from '@/ui/spinner';

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
		<Command className="mb-4 mt-2 h-[380px] max-h-[380px] rounded-lg border border-border md:min-w-[450px]">
			<CommandInput
				className="py-6"
				placeholder="Search for pet parents..."
				value={value}
				onValueChange={handleChange}
				containerClasses="border-none"
			/>
			<CommandList
				onClick={handleSelect}
				className="max-h-full border-t border-border"
			>
				{isPending && <Spinner />}
				{petParentData?.map((parent) => {
					return (
						<div
							className={cn(
								'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-pointer select-none items-center gap-6 border-b border-border px-3 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
								selectedParentId === parent.parent.parentId &&
									'bg-primary/20 data-[selected=true]:bg-primary/20'
							)}
							key={parent._id}
							data-id={parent.parent.parentId}
						>
							<UserProfile
								id={parent?.parent?.parentId}
								imageClasses="!rounded-lg !size-[54px]"
								iconClasses="!size-[54px]"
							/>
							<div>
								<p className="text-left text-sm font-medium">
									{parent?.parent?.name} (
									{parent?.parent?.mobile})
								</p>
								<p className="text-left text-sm">
									Pets: {parent?.parent?.petNames.join(', ')}
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
