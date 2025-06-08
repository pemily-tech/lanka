'use client';

import * as React from 'react';
import { type Matcher } from 'react-day-picker';
import { addDays, format, isSameDay, startOfToday } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

import { cn } from '@/helpers/utils';

type IProps = {
	selectedDate: Date | undefined;
	setSelectedDate: (date: Date | undefined) => void;
	disabled?: Matcher | Matcher[];
	numberOfDays?: number;
};

export function DayPickerSingle({
	setSelectedDate,
	selectedDate,
	disabled = false,
	numberOfDays = 7,
}: IProps) {
	const today = startOfToday();
	const days = Array.from({ length: numberOfDays }, (_, i) =>
		addDays(today, -i)
	);
	const displayDate = format(selectedDate as Date, 'dd MMM, yyyy');

	const onDaySelect = (day: Date) => {
		setSelectedDate(day);
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<div className="text-xl font-semibold">{displayDate}</div>
			</div>
			<div className="inline-flex flex-row flex-wrap gap-3 rounded-lg">
				{days.reverse().map((day) => {
					const formattedDay = format(day, 'dd EEE');
					const isSelected = selectedDate
						? isSameDay(day, selectedDate)
						: false;

					return (
						<div
							className={cn(
								'flex w-[72px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white py-2 shadow-sm',
								isSelected &&
									'bg-primary border-primary text-white'
							)}
							key={day.toISOString()}
							onClick={() => onDaySelect(day)}
						>
							<span className="text-xl font-medium">
								{formattedDay.split(' ')?.[0]}
							</span>
							<span className="">
								{formattedDay.split(' ')?.[1]}
							</span>
						</div>
					);
				})}
				<Popover>
					<PopoverTrigger asChild>
						<div className="flex w-[72px] cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-3 shadow-sm">
							<CalendarIcon />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={setSelectedDate}
							disabled={disabled}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
