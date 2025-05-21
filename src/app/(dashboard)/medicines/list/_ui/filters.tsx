import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import {
	Button,
	Command,
	CommandInput,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared';
import { useUpdateUrl } from '../_hooks/use-update-url';

import { Routes } from '@/helpers/routes';

export default function Filters({
	value,
	setValue,
	active,
	setActive,
}: {
	value: string;
	setValue: (s: string) => void;
	active: number;
	setActive: (active: number) => void;
}) {
	const { limit, setLimit } = useUpdateUrl();
	const [hovered, setHovered] = useState(false);

	return (
		<div className="flex w-full flex-wrap items-end justify-between gap-12">
			<div className="flex-1">
				<Command className="max-w-[450px] rounded-lg border">
					<CommandInput
						className="py-24"
						placeholder="Search for medicines..."
						value={value}
						onValueChange={setValue}
					/>
				</Command>
			</div>
			<div className="flex flex-1 items-end justify-end gap-12">
				<div>
					<Select
						value={String(active)}
						onValueChange={(val) => {
							setActive(Number(val));
							if (typeof window !== 'undefined' && window.umami) {
								window.umami.track('create_medicine_active', {
									active: val,
								});
							}
						}}
					>
						<Label>Active / Inactive</Label>
						<SelectTrigger className="mt-3 w-[120px]">
							<SelectValue placeholder="Theme" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Active</SelectItem>
							<SelectItem value="0">Inactive</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={limit.toString()}
						onValueChange={(val) => {
							setLimit(Number(val));
							if (typeof window !== 'undefined' && window.umami) {
								window.umami.track(
									'create_medicine_limit_changed',
									{
										limit: val,
									}
								);
							}
						}}
					>
						<Label>Rows per Page</Label>
						<SelectTrigger className="mt-3 w-[120px]">
							<SelectValue placeholder="Select a limit" />
						</SelectTrigger>
						<SelectContent>
							{[15, 30, 50].map((option) => (
								<SelectItem key={option} value={String(option)}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Link href={Routes.MEDICINES_CREATE}>
					<motion.button
						className="bg-secondary flex size-[48px] cursor-pointer items-center justify-center rounded-xl"
						initial={{ width: 48 }}
						whileHover={{ width: 140 }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 20,
						}}
						onMouseEnter={() => setHovered(!hovered)}
						onMouseLeave={() => setHovered(!hovered)}
						data-umami-event="create_medicine_button"
					>
						{hovered ? (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.25 }}
								className="flex items-center justify-center gap-4 text-xs text-white"
							>
								<Plus className="size-18 text-white" />
								<span>Create Medicine</span>
							</motion.div>
						) : (
							<Plus className="size-18 text-white" />
						)}
					</motion.button>
				</Link>
			</div>
		</div>
	);
}
