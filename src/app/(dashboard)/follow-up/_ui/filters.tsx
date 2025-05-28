'use client';

import { memo, useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { RecordTypes } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { cn } from '@/helpers/utils';
import { DayPickerSingle } from '@/ui/shared/day-picker-single';

interface IProps {
	selectedDate: Date | undefined;
	setSelectedDate: (date: Date | undefined) => void;
	commonFilter: 'PENDING' | 'COMPLETE' | 'ALL' | null;
	setCommonFilter: (filter: 'PENDING' | 'COMPLETE' | 'ALL') => void;
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
	commonFilter,
	setCommonFilter,
}: IProps) {
	const [hovered, setHovered] = useState(false);

	return (
		<div className="flex flex-row items-end justify-between gap-24">
			<DayPickerSingle
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			/>
			<div className="flex flex-1 items-end justify-end gap-12">
				{filters?.map((record) => {
					const active = commonFilter === record.value;
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
								'rounded-12 flex h-48 cursor-pointer items-center justify-center gap-4 border',
								active
									? 'border-secondary'
									: 'border-transparent'
							)}
							onClick={() =>
								setCommonFilter(
									record.value as
										| 'PENDING'
										| 'COMPLETE'
										| 'ALL'
								)
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
					href={`${Routes.SELECT_PET}?recordType=${RecordTypes.Followup}&filter=${commonFilter}&date=${format(selectedDate as Date, DEFAULT_DATE_FORMAT)}`}
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
