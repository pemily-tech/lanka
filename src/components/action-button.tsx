'use client';

import { type ComponentPropsWithoutRef, useState } from 'react';
import { type motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface IActionButtonProps
	extends ComponentPropsWithoutRef<typeof motion.button> {
	title: string;
}

export function ActionRecordButton({
	title,
	...buttonProps
}: IActionButtonProps) {
	const [hovered, setHovered] = useState(false);

	return (
		<button className="bg-secondary flex size-[48px] cursor-pointer items-center justify-center rounded-xl">
			<Plus className="size-4 text-white" />
		</button>
	);
}
