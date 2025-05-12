'use client';

import { memo } from 'react';
import { addDays, format, isSameDay, startOfToday } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '../../../../../helpers/utils';
import {
	Calendar,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared';

interface IProps {
	selectedDate: Date;
	setDate: (payload: { date: Date }) => void;
	active: number;
	setActive: (active: number) => void;
}

function Filters({ selectedDate, setDate, active, setActive }: IProps) {
	const today = startOfToday();
	const days = Array.from({ length: 7 }).map((_, i) => addDays(today, -i));

	return (
		<div>
			<div className="text-24 pb-12 font-medium">
				{format(selectedDate, 'dd MMM, yyyy')}
			</div>
			<div className="flex flex-row items-center justify-between">
				<div className="inline-flex flex-row gap-12 rounded-lg">
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
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div>
					<Select
						value={String(active)}
						onValueChange={(val) => setActive(Number(val))}
					>
						<Label>Choose Active / Inactive</Label>
						<SelectTrigger className="mt-3 w-[180px]">
							<SelectValue placeholder="Theme" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">Active</SelectItem>
							<SelectItem value="0">Inactive</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}

export default memo(Filters);
