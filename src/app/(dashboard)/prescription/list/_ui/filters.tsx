'use client';

import { memo, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { Command, CommandInput, Label } from '../../../../../ui/shared';
import { DayPicker } from '../../../../../ui/shared/day-picker';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/shared/select';

interface IProps {
	selectedDate: DateRange | undefined;
	setDate: (payload: { date: DateRange }) => void;
	active: number;
	setActive: (active: number) => void;
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	setOpenPrescription: () => void;
}

function Filters({
	selectedDate,
	setDate,
	active,
	setActive,
	searchTerm,
	setSearchTerm,
	setOpenPrescription,
}: IProps) {
	const [hovered, setHovered] = useState(false);

	return (
		<div className="flex flex-row items-end justify-between gap-24">
			<DayPicker
				selectedDate={selectedDate}
				setDate={setDate}
				disabled={{ after: new Date() }}
			/>
			<div className="flex flex-1 items-end justify-end gap-12">
				<div className="h-[48px] max-w-[220px] flex-1 ">
					<Command className="rounded-lg border">
						<CommandInput
							className="py-24"
							placeholder="Search..."
							value={searchTerm}
							onValueChange={setSearchTerm}
						/>
					</Command>
				</div>
				<div>
					<Select
						value={String(active)}
						onValueChange={(val) => setActive(Number(val))}
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
				<motion.button
					className="bg-secondary flex size-[48px] cursor-pointer items-center justify-center rounded-xl"
					initial={{ width: 48 }}
					whileHover={{ width: 120 }}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					onClick={setOpenPrescription}
					onMouseEnter={() => setHovered(!hovered)}
					onMouseLeave={() => setHovered(!hovered)}
				>
					{hovered ? (
						<motion.span
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.25 }}
							className="text-[10px] font-bold text-white"
						>
							Create New Rx
						</motion.span>
					) : (
						<Plus className="size-18 text-white" />
					)}
				</motion.button>
			</div>
		</div>
	);
}

export default memo(Filters);
