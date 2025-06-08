'use client';

import { memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

import { medicalRecordFilters } from '@/helpers/constant';
import { cn } from '@/helpers/utils';
import { type IMedicalRecordFilter } from '@/types/common';
import { DayPickerSingle } from '@/ui/day-picker-single';

type IFilter = IMedicalRecordFilter | null;

interface IProps {
	selectedDate: Date | undefined;
	setSelectedDate: (date: Date | undefined) => void;
	filter: IFilter;
	setFilter: (filter: IFilter) => void;
	showCalendar?: boolean;
	children: ReactNode;
}

const borderColor = 'hsl(264, 16%, 53%)';
const backgroundColor = 'hsl(264, 16%, 95%)';

function Filters({
	selectedDate,
	setSelectedDate,
	filter,
	setFilter,
	showCalendar = true,
	children,
}: IProps) {
	return (
		<div className="flex flex-col items-start gap-6">
			{showCalendar && (
				<DayPickerSingle
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					numberOfDays={12}
				/>
			)}
			<div className="flex flex-1 items-end justify-end gap-3">
				{medicalRecordFilters?.map((record) => {
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
							onClick={() => setFilter(record.value as IFilter)}
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
