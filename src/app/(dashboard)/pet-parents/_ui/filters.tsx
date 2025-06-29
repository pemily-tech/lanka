'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Command, CommandInput } from '../../../../ui/command';

import { Routes } from '@/helpers/routes';
import { cn } from '@/helpers/utils';
import { Button } from '@/ui/button';

export default function Filters({
	value,
	handleChange,
}: {
	value: string;
	handleChange: (value: string) => void;
}) {
	const [hovered, setHovered] = useState(false);

	return (
		<div className="sticky top-[76px] z-20 grid grid-cols-5 gap-6 rounded-lg bg-white p-4 shadow-md">
			<div className="col-span-3 flex">
				<div className="h-12  w-full max-w-80 flex-1">
					<Command className="rounded-lg border border-border">
						<CommandInput
							className="py-6"
							placeholder="Search by name, pet name etc..."
							value={value}
							onValueChange={handleChange}
							containerClasses="border-none"
						/>
					</Command>
				</div>
			</div>
			<div className="col-span-2 flex justify-end">
				<Link href={Routes.PARENTS_CREATE}>
					<motion.div
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
						animate={{ width: hovered ? 120 : 48 }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 20,
						}}
						data-umami-event="parents_create_button"
						className={cn(
							'flex h-12 cursor-pointer items-center justify-center gap-4 rounded-xl bg-secondary text-white'
						)}
					>
						{hovered ? (
							<span className="flex items-center gap-1 font-normal">
								<Plus className="size-4" />
								<span className="text-sm font-semibold">
									Add Parent
								</span>
							</span>
						) : (
							<Plus className="size-4" />
						)}
					</motion.div>
				</Link>
			</div>
		</div>
	);
}
