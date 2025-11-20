'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { Plus } from 'lucide-react';

interface IActionButtonProps extends ComponentPropsWithoutRef<'button'> {
	title: string;
}

export function ActionRecordButton({
	title,
	...buttonProps
}: IActionButtonProps) {
	return (
		<button
			{...buttonProps}
			className="bg-secondary flex size-[48px] cursor-pointer items-center justify-center rounded-xl"
		>
			<Plus className="size-4 text-white" />
		</button>
	);
}
