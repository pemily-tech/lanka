'use client';

import * as React from 'react';
import { DayFlag, DayPicker, SelectionState, UI } from 'react-day-picker';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronUpIcon,
} from 'lucide-react';

import { buttonVariants } from './button';

import { cn } from '@/helpers/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export const Calendar = ({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) => {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-6', className)}
			classNames={{
				[UI.Months]: 'relative',
				[UI.Month]: 'space-y-12 ml-0',
				[UI.MonthCaption]: 'flex justify-center items-center h-24',
				[UI.CaptionLabel]: 'text-14 font-medium',
				[UI.PreviousMonthButton]: cn(
					buttonVariants({ variant: 'outline', size: 'icon' }),
					'absolute left-1 top-0 size-[32px] bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				[UI.NextMonthButton]: cn(
					buttonVariants({ variant: 'outline', size: 'icon' }),
					'absolute right-1 top-0 size-[32px] bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				[UI.MonthGrid]: 'w-full border-collapse space-y-6',
				[UI.Weekdays]: 'flex',
				[UI.Weekday]:
					'text-muted-foreground rounded-md flex-1 font-normal text-14 flex justify-center items-center size-[38px]',
				[UI.Week]: 'flex w-full mt-8 gap-6',
				[UI.Day]:
					'size-[38px] flex-1 text-center rounded-md text-14 p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
				[UI.DayButton]: cn(
					buttonVariants({ variant: 'ghost' }),
					'hover:bg-primary hover:text-primary-foreground size-full p-0 font-normal aria-selected:opacity-100'
				),
				[SelectionState.range_end]: 'day-range-end',
				[SelectionState.selected]:
					'selected !bg-primary !text-primary-foreground hover:!bg-primary hover:!text-primary-foreground focus:!bg-primary focus:!text-primary-foreground',
				[SelectionState.range_middle]:
					'aria-selected:bg-accent aria-selected:text-accent-foreground',
				[DayFlag.today]:
					'bg-secondary text-primary-foreground [&:not(.selected)]:bg-secondary [&:not(.selected)]:text-primary-foreground',
				[DayFlag.outside]:
					'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
				[DayFlag.disabled]: 'text-muted-foreground opacity-50',
				[DayFlag.hidden]: 'invisible',
				...classNames,
			}}
			components={{
				Chevron: ({ ...props }) => <Chevron {...props} />,
			}}
			{...props}
		/>
	);
};

const Chevron = ({ orientation = 'left' }) => {
	switch (orientation) {
		case 'left':
			return <ChevronLeftIcon className="size-24" />;
		case 'right':
			return <ChevronRightIcon className="size-24" />;
		case 'up':
			return <ChevronUpIcon className="size-24" />;
		case 'down':
			return <ChevronDownIcon className="size-24" />;
		default:
			return null;
	}
};
