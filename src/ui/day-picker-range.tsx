import { type DateRange, type Matcher } from 'react-day-picker';
import { addDays, format, isSameDay, parseISO, startOfToday } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

import { cn } from '@/helpers/utils';
import { Calendar } from '@/ui/calendar';

export function DayPickerRange({
	selectedDate,
	setDate,
	disabled,
}: {
	selectedDate: DateRange | undefined;
	setDate: (payload: { date: DateRange }) => void;
	disabled?: boolean | DateRange | Date[] | Matcher[] | Matcher;
}) {
	const today = startOfToday();
	const days = Array.from({ length: 7 }, (_, i) => addDays(today, -i));

	const fromDate = selectedDate?.from
		? typeof selectedDate.from === 'string'
			? parseISO(selectedDate.from)
			: selectedDate.from
		: undefined;
	const toDate = selectedDate?.to
		? typeof selectedDate.to === 'string'
			? parseISO(selectedDate.to)
			: selectedDate.to
		: undefined;

	const displayDate = fromDate
		? toDate && fromDate.getTime() !== toDate.getTime()
			? `${format(fromDate, 'dd MMM, yyyy')} - ${format(toDate, 'dd MMM, yyyy')}`
			: format(fromDate, 'dd MMM, yyyy')
		: 'Select date range';

	const onDaySelect = (day: Date) => {
		setDate({ date: { from: day, to: day } });
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<div className="text-xl font-semibold">{displayDate}</div>
			</div>
			<div className="inline-flex flex-row flex-wrap gap-3 rounded-lg">
				{days.reverse().map((day) => {
					const formattedDay = format(day, 'dd EEE');
					const isSelected = selectedDate?.from
						? isSameDay(day, selectedDate.from)
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
							<span>{formattedDay.split(' ')?.[1]}</span>
						</div>
					);
				})}
				<Popover>
					<PopoverTrigger asChild>
						<div className="border-black-1/10 flex w-[72px] cursor-pointer flex-col items-center justify-center rounded-lg border bg-white py-3">
							<CalendarIcon />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="range"
							selected={selectedDate}
							onSelect={(range) => {
								if (range?.from) setDate({ date: range });
							}}
							disabled={disabled}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
