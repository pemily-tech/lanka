/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays, format, isToday, isTomorrow } from 'date-fns';
import { Calendar } from 'lucide-react';

import { type IDayItem } from '../../../types/common';

import { Button } from '@/ui/shared/button';

export function DaysItem({
	defaultDays = 6,
	selectedDate,
	handleDate,
}: {
	defaultDays?: number;
	selectedDate: string;
	handleDate: (d: string) => void;
}) {
	const daysArray = Array.from({ length: defaultDays }, (_, i) => i);
	const [daysHeader, setDaysData] = useState<IDayItem[]>([]);

	useEffect(() => {
		setDaysHeaderData(selectedDate);
	}, []);

	const setDaysHeaderData = (newDate: string) => {
		const daysData = daysArray.map((i) => {
			const date = addDays(new Date(newDate), i);
			let displayDate = format(date, 'd MMM EEE');
			if (isToday(date)) {
				displayDate = format(date, 'd MMM') + ' Today';
			} else if (isTomorrow(date)) {
				displayDate = format(date, 'd MMM') + ' Tomorrow';
			}

			return {
				displayDate,
				fullDate: format(date, 'yyyy-MM-dd'),
			};
		});
		setDaysData([...daysData]);
	};

	const handleCalender = (date: any) => {
		const formatDate = format(date, 'yyyy-MM-dd');
		setDaysHeaderData(date);
		handleDate(formatDate);
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center justify-center gap-16">
				{daysHeader.map((day, i) => {
					const split = day.displayDate.split(' ');
					const active = selectedDate === day.fullDate;
					return (
						<Button
							className={`shadow-base rounded-8 h-[62px] w-[140px] py-6 ${
								active
									? 'bg-brand text-white'
									: 'bg-white text-black'
							}`}
							key={i.toString()}
							data-id={day.fullDate}
							onClick={() => handleDate(day.fullDate)}
						>
							<div className="flex flex-col">
								<span className="text-24 font-normal">
									{split[0] + ' ' + split[1]}
								</span>
								<span className="font-normal">{split[2]}</span>
							</div>
						</Button>
					);
				})}
				<div className="calender">
					<DatePicker
						className="w-auto cursor-pointer"
						onChange={handleCalender}
						selected={new Date(selectedDate)}
						customInput={
							<div className=" shadow-base rounded-8 flex flex-col items-center justify-center bg-white px-6 py-8">
								<Calendar />
								<p className="text-12">Choose from Calender</p>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
}

export default DaysItem;
