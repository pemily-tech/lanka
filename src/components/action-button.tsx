'use client';

import { type ComponentPropsWithoutRef, useState } from 'react';
import { motion } from 'framer-motion';
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
		<motion.button
			className="bg-secondary flex size-[48px] cursor-pointer items-center justify-center rounded-xl"
			initial={{ width: 48 }}
			whileHover={{ width: 120 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 20,
			}}
			onMouseEnter={() => setHovered(!hovered)}
			onMouseLeave={() => setHovered(!hovered)}
			{...buttonProps}
		>
			{hovered ? (
				<motion.span
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.25 }}
					className="text-[12px] font-bold text-white"
				>
					{title}
				</motion.span>
			) : (
				<Plus className="size-18 text-white" />
			)}
		</motion.button>
	);
}
