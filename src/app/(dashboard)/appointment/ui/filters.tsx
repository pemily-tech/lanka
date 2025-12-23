'use client';

import { type ReactNode } from 'react';

type FiltersProps = {
	children?: ReactNode;
};

export default function Filters({ children }: FiltersProps) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-3">
			{/* Left side – title / filters placeholder */}
			<div className="flex items-center gap-3">
				<h2 className="text-base font-semibold text-gray-800">
					Appointments
				</h2>
			</div>

			{/* Right side – action button */}
			<div>{children}</div>
		</div>
	);
}
