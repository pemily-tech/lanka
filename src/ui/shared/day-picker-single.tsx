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
};

export function DayPickerSingle({
	setSelectedDate,
	selectedDate,
	disabled = false,
}: IProps) {
	const today = startOfToday();
	const days = Array.from({ length: 7 }, (_, i) => addDays(today, -i));
	const displayDate = format(selectedDate as Date, 'dd MMM, yyyy');

	const onDaySelect = (day: Date) => {
		setSelectedDate(day);
	};

	return (
		<div className="flex flex-col gap-12">
			<div className="flex items-center justify-between">
				<div className="text-24 font-medium">{displayDate}</div>
			</div>
			<div className="inline-flex flex-row flex-wrap gap-12 rounded-lg">
				{days.reverse().map((day) => {
					const formattedDay = format(day, 'dd EEE');
					const isSelected = selectedDate
						? isSameDay(day, selectedDate)
						: false;

					return (
						<div
							className={cn(
								'border-black-1/10 flex w-[72px] cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border bg-white py-12',
								isSelected && 'bg-primary text-white'
							)}
							key={day.toISOString()}
							onClick={() => onDaySelect(day)}
						>
							<span className="text-24 leading-24 font-medium">
								{formattedDay.split(' ')?.[0]}
							</span>
							<span className="text-16 leading-16">
								{formattedDay.split(' ')?.[1]}
							</span>
						</div>
					);
				})}
				<Popover>
					<PopoverTrigger asChild>
						<div className="border-black-1/10 flex w-[72px] cursor-pointer flex-col items-center justify-center rounded-lg border bg-white py-12">
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
