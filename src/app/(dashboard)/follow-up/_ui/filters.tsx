'use client';

import { memo, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { RecordTypes } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { cn } from '@/helpers/utils';
import { type IOtherCommonFilter } from '@/types/common';
import { DayPickerSingle } from '@/ui/day-picker-single';

interface IProps {
	selectedDate: Date | undefined;
	setSelectedDate: (date: Date | undefined) => void;
	filter: IOtherCommonFilter | null;
	setFilter: (filter: IOtherCommonFilter) => void;
	showCalendar?: boolean;
	isPet?: boolean;
}

export const filters = [
	{
		label: 'Pending',
		value: 'PENDING',
	},
	{
		label: 'Completed',
		value: 'COMPLETE',
	},
	{ label: 'All', value: 'ALL' },
];

const borderColor = 'hsl(264, 16%, 53%)';
const backgroundColor = 'hsl(264, 16%, 95%)';

function Filters({
	selectedDate,
	setSelectedDate,
	filter,
	setFilter,
	showCalendar = true,
	isPet,
}: IProps) {
	const [hovered, setHovered] = useState(false);
	const localFilters = useMemo(() => {
		if (isPet) {
			return [
				filters[0],
				{ label: 'Upcoming', value: 'UPCOMING' },
				...filters.slice(1),
			];
		} else {
			return filters;
		}
	}, [isPet]);

	return (
		<div
			className={cn(
				'flex flex-row items-end justify-between gap-6',
				!showCalendar && 'items-center justify-start'
			)}
		>
			{showCalendar && (
				<DayPickerSingle
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
				/>
			)}
			<div
				className={cn(
					'flex flex-1 items-end justify-end gap-3',
					!showCalendar && 'items-center justify-start'
				)}
			>
				{localFilters?.map((record) => {
					const active = filter === record.value;
					return (
						<motion.div
							layout
							initial={false}
							animate={{
								borderColor: active
									? borderColor
									: 'transparent',
								backgroundColor: active
									? backgroundColor
									: '#fff',
								paddingLeft: active ? 16 : 12,
								paddingRight: active ? 16 : 12,
							}}
							transition={{ duration: 0.25, ease: 'easeOut' }}
							className={cn(
								'flex h-12 cursor-pointer items-center justify-center gap-4 rounded-xl border',
								active
									? 'border-secondary'
									: 'border-transparent'
							)}
							onClick={() =>
								setFilter(record.value as IOtherCommonFilter)
							}
							key={record.value}
						>
							<div className="text-sm font-medium">
								{record?.label}
							</div>
						</motion.div>
					);
				})}
				<Link
					href={`${Routes.SELECT_PET}?recordType=${RecordTypes.Followup}&filter=${filter}&date=${format(selectedDate as Date, DEFAULT_DATE_FORMAT)}`}
				>
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
					>
						{hovered ? (
							<motion.span
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.25 }}
								className="text-[12px] font-bold text-white"
							>
								Add Followup
							</motion.span>
						) : (
							<Plus className="size-18 text-white" />
						)}
					</motion.button>
				</Link>
			</div>
		</div>
	);
}

export default memo(Filters);
