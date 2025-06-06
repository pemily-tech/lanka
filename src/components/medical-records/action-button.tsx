import { type ComponentPropsWithoutRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { type IMedicalRecordFilter } from '@/types/common';

interface ActionButtonProps
	extends ComponentPropsWithoutRef<typeof motion.button> {
	filters: { label: string; value: string }[];
	filter: IMedicalRecordFilter | null;
}

export default function ActionButton({
	filters,
	filter,
	...buttonProps
}: ActionButtonProps) {
	const [hovered, setHovered] = useState(false);
	const btnTxt = filters.find((item) => item.value === filter);

	return (
		<motion.button
			className="bg-secondary flex size-[48px] cursor-pointer items-center justify-center rounded-xl"
			initial={{ width: 48 }}
			whileHover={{ width: 220 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 20,
			}}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			{...buttonProps}
		>
			{hovered ? (
				<motion.span
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.25 }}
					className="font-bold text-white"
				>
					Upload {btnTxt?.label}
				</motion.span>
			) : (
				<Plus className="size-18 text-white" />
			)}
		</motion.button>
	);
}
