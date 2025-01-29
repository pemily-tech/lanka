'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Spinner from '../../../../ui/shared/spinner';
import useSearchHook from '../hooks/search';
import PetParent from './shared/pet-parent';
import SearchInput from './shared/search-input';

export default function PageDetails() {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const {
		searchValue,
		onChange,
		handleClear,
		isPending,
		parents,
		handlePetParent,
		parentDetails,
		refetchParents,
		handleAddParent,
		fetchNextPage,
		isFetchingNextPage,
	} = useSearchHook();

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	return (
		<div className="relative mt-12">
			<div className="grid grid-cols-5 items-start gap-24">
				<SearchInput
					searchValue={searchValue}
					onChange={onChange}
					handleClear={handleClear}
					isPending={isPending}
					parents={parents}
					handlePetParent={handlePetParent}
					handleAddParent={handleAddParent}
				/>
				{parentDetails && (
					<PetParent
						parentId={parentDetails.parent?.parentId}
						memberId={parentDetails?.memberId}
						refetchParents={refetchParents}
					/>
				)}
			</div>
			<div className="flex flex-col gap-6 text-center" ref={ref}>
				{isFetchingNextPage && (
					<>
						<Spinner />
						<span className="text-12 font-medium">
							Fetching more parents...
						</span>
					</>
				)}
			</div>
		</div>
	);
}
