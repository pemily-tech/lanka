'use client';

import { type MouseEvent } from 'react';

import { SearchPetParents } from '../../../../ui/shared';

export default function Index() {
	const handleParent = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const target = (e.target as HTMLElement).closest(
			'[data-id]'
		) as HTMLElement;
		console.log(target);
	};

	return (
		<div>
			<h1 className="text-24 mb-12 font-medium">
				Choose a Parent to proceed:
			</h1>
			<SearchPetParents handleParent={handleParent} />
		</div>
	);
}
