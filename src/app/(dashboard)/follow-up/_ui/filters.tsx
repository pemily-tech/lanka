'use client';

import { memo, type ReactNode, useMemo } from 'react';
import { type DateRange } from 'react-day-picker';
import { motion } from 'framer-motion';

import { cn } from '@/helpers/utils';
import { type IOtherCommonFilter } from '@/types/common';
import { DayPickerRange } from '@/ui/day-picker-range';

interface IProps {
	selectedDate: DateRange | undefined;
	setSelectedDate: (payload: { date: DateRange }) => void;
	filter: IOtherCommonFilter | null;
	setFilter: (filter: IOtherCommonFilter) => void;
	showCalendar?: boolean;
	isPet?: boolean;
	children: ReactNode;
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
	children,
}: IProps) {
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
				<DayPickerRange
					selectedDate={selectedDate}
					setDate={setSelectedDate}
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
				{children}
			</div>
		</div>
	);
}

export default memo(Filters);
