import { type ReactNode } from 'react';

import { Button } from '@/ui/shared/button';

interface IFilterItemProps {
	active: boolean;
	value: string;
	children: ReactNode;
}

export const FilterIcon = ({
	active,
	children,
}: {
	active: boolean;
	children: ReactNode;
}) => {
	return (
		<span
			className={`flex size-[29px] items-center  justify-center rounded-full border bg-white ${
				active ? 'text-black-1 border-white' : 'border-purple'
			}`}
		>
			{children}
		</span>
	);
};

export const FilterLabel = ({
	active,
	children,
}: {
	active: boolean;
	children: ReactNode;
}) => {
	return (
		<span
			className={`${active ? 'text-secondary' : 'text-black'} text-14 font-semibold`}
		>
			{children}
		</span>
	);
};

export function FilterItem({ active, value, children }: IFilterItemProps) {
	return (
		<Button
			className={`flex items-center gap-8`}
			key={value}
			data-id={value}
			variant="ghost"
		>
			{children}
		</Button>
	);
}
