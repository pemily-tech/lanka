'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Command, CommandInput } from '../../../../ui/shared';

import { Routes } from '@/helpers/routes';
import { Button } from '@/ui/shared/button';

const MotionButton = motion.create(Button);

export default function Filters({
	value,
	handleChange,
}: {
	value: string;
	handleChange: (value: string) => void;
}) {
	const [hovered, setHovered] = useState(false);

	return (
		<div className="rounded-8 shadow-card1 sticky top-0 z-20 grid grid-cols-5 gap-24 bg-white p-16">
			<div className="col-span-3 flex">
				<div className="max-w-316  h-[48px] w-full flex-1">
					<Command className="rounded-lg border">
						<CommandInput
							className="py-24"
							placeholder="Search by name, pet name etc..."
							value={value}
							onValueChange={handleChange}
						/>
					</Command>
				</div>
			</div>
			<div className="col-span-2 flex justify-end">
				<Link href={Routes.PARENTS_CREATE}>
					<MotionButton
						variant="secondary"
						size={hovered ? 'icon' : 'default'}
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						animate={{ width: hovered ? 120 : 48 }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 20,
						}}
						className="h-48"
						data-umami-event="parents_create_button"
					>
						{hovered ? (
							<span className="flex items-center gap-6 font-normal">
								<Plus className="size-18 text-white" />
								Add Parent
							</span>
						) : (
							<Plus className="size-18 text-white" />
						)}
					</MotionButton>
				</Link>
			</div>
		</div>
	);
}
