'use client';

import { addDays, format, isSameDay, parseISO, startOfToday } from 'date-fns';
import { useQueryStates } from 'nuqs';

import { cn } from '../../../../../helpers/utils';

export default function Filters() {
	const today = startOfToday();
	const [{ date }, setQuery] = useQueryStates({
		date: {
			defaultValue: format(today, 'yyyy-MM-dd'),
			parse: parseISO,
			serialize: (date: Date) => format(date, 'yyyy-MM-dd'),
		},
	});
	const selectedDate = date ?? today;

	const days = Array.from({ length: 7 }).map((_, i) => addDays(today, i));

	return (
		<div>
			<div className="inline-flex flex-row gap-12 rounded-lg">
				{days.map((day) => {
					const formattedDay = format(day, 'dd MMM');
					const isSelected = isSameDay(day, selectedDate);

					return (
						<div
							className={cn(
								'border-black-1/10 flex w-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border bg-white py-12',
								isSelected && 'bg-primary text-white'
							)}
							key={day.toISOString()}
							onClick={() => setQuery({ date: day })}
						>
							<span className="text-24 leading-24 font-semibold">
								{formattedDay.split(' ')?.[0]}
							</span>
							<span className="text-16 leading-16">
								{formattedDay.split(' ')?.[1]}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
