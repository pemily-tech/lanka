import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useUpdateUrl } from '../../../../../hooks/use-update-url';
import { Label } from '../../../../../ui/label';

import { Routes } from '@/helpers/routes';
import { Command, CommandInput } from '@/ui/command';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

export default function Filters({
	value,
	setValue,
	type,
	setState,
	quantity,
}: {
	value: string;
	setValue: (s: string) => void;
	type: 'PRODUCT' | 'SERVICE';
	setState: any;
	quantity?: string | null;
}) {
	const { limit, setLimit } = useUpdateUrl();
	const [hovered, setHovered] = useState(false);

	return (
		<div className="flex w-full flex-wrap items-end justify-between gap-3">
			<div className="flex-1">
				<Command className="max-w-[450px] rounded-lg border border-border">
					<CommandInput
						className=""
						placeholder="Search for items..."
						value={value}
						onValueChange={setValue}
					/>
				</Command>
			</div>
			<div className="flex flex-1 items-end justify-end gap-3">
				<div>
					<Select
						value={quantity ?? 'all'}
						onValueChange={(val) => {
							setState({
								quantity: val === 'all' ? null : val,
							});

							if (typeof window !== 'undefined' && window.umami) {
								window.umami.track('create_items_quantity', {
									quantity: val,
								});
							}
						}}
					>
						<Label>Select Quantity</Label>
						<SelectTrigger className="mt-3 w-[120px]">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="5">{'<=5'}</SelectItem>
							<SelectItem value="10">{'<=10'}</SelectItem>
							<SelectItem value="15">{'<=15'}</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Select
						value={type}
						onValueChange={(val) => {
							setState({ type: val });
							if (typeof window !== 'undefined' && window.umami) {
								window.umami.track('create_items_type', {
									active: val,
								});
							}
						}}
					>
						<Label>Select Type</Label>
						<SelectTrigger className="mt-3 w-[120px]">
							<SelectValue placeholder="Select" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="PRODUCT">Product</SelectItem>
							<SelectItem value="SERVICE">Service</SelectItem>
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
									'create_items_limit_changed',
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
				<Link href={Routes.ADD_ITEM}>
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
						data-umami-event="create_items_button"
					>
						{hovered ? (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.25 }}
								className="flex items-center justify-center gap-1 text-xs text-white"
							>
								<Plus className="size-4 text-white" />
								<span>Create items</span>
							</motion.div>
						) : (
							<Plus className="size-4 text-white" />
						)}
					</motion.button>
				</Link>
			</div>
		</div>
	);
}
