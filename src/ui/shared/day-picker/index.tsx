import { addDays, format, isSameDay, startOfToday } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '../../../helpers/utils';
import { Calendar } from '../calender';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

export function DayPicker({
	selectedDate,
	setDate,
}: {
	selectedDate: Date;
	setDate: (payload: { date: Date }) => void;
}) {
	const today = startOfToday();
	const days = Array.from({ length: 7 }).map((_, i) => addDays(today, -i));

	return (
		<div className="flex flex-col gap-12">
			<div className="flex items-center justify-between">
				<div className="text-24 font-medium">
					{format(selectedDate, 'dd MMM, yyyy')}
				</div>
			</div>
			<div className="inline-flex flex-row flex-wrap gap-12 rounded-lg">
				{days.reverse().map((day) => {
					const formattedDay = format(day, 'dd EEE');
					const isSelected = isSameDay(day, selectedDate);

					return (
						<div
							className={cn(
								'border-black-1/10 flex w-[90px] cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border bg-white py-12',
								isSelected && 'bg-primary text-white'
							)}
							key={day.toISOString()}
							onClick={() => setDate({ date: day })}
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
						<div
							className={cn(
								'border-black-1/10 flex w-[90px] cursor-pointer flex-col items-center justify-center rounded-lg border bg-white py-12'
							)}
						>
							<CalendarIcon />
						</div>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={(day) => {
								if (day) {
									setDate({ date: day });
								}
							}}
							disabled={{ after: new Date() }}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
