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
import { DayPickerSingle } from '@/ui/day-picker-single';

type IFilter = 'PRESCRIPTION' | 'REPORT' | 'DIET' | 'OTHER' | null;

interface IProps {
	selectedDate: Date | undefined;
	setSelectedDate: (date: Date | undefined) => void;
	filter: IFilter;
	setFilter: (filter: IFilter) => void;
	showCalendar?: boolean;
}

export const filters = [
	{
		label: 'Prescription',
		value: 'PRESCRIPTION',
	},
	{
		label: 'Report',
		value: 'REPORT',
	},
	{ label: 'Diet', value: 'DIET' },
	{ label: 'Other Documents', value: 'OTHER' },
];

const borderColor = 'hsl(264, 16%, 53%)';
const backgroundColor = 'hsl(264, 16%, 95%)';

function Filters({
	selectedDate,
	setSelectedDate,
	filter,
	setFilter,
	showCalendar = true,
}: IProps) {
	const [hovered, setHovered] = useState(false);
	const btnTxt = filters.find((item) => item.value === filter);

	return (
		<div className="flex flex-col items-start gap-24">
			{showCalendar && (
				<DayPickerSingle
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					numberOfDays={12}
				/>
			)}
			<div className="flex flex-1 items-end justify-end gap-12">
				{filters?.map((record) => {
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
								'rounded-12 flex h-48 cursor-pointer items-center justify-center gap-4 border',
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
				<Link
					href={`${Routes.SELECT_PET}?recordType=${RecordTypes.Medical}&filter=${filter}&date=${format(selectedDate as Date, DEFAULT_DATE_FORMAT)}`}
				>
					<motion.button
						className="bg-secondary flex size-[48px] cursor-pointer items-center justify-center rounded-xl"
						initial={{ width: 48 }}
						whileHover={{ width: 220 }}
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
								className="font-bold text-white"
							>
								Upload {btnTxt?.label}
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
