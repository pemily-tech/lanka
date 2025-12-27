'use client';

import { type ReactNode } from 'react';
import { type DateRange } from 'react-day-picker';

import { DayPickerRange } from '@/ui/day-picker-range';
import {} from '@/ui/input';
import Input from '@/ui/input/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

type FiltersProps = {
	selectedDate?: DateRange;
	onDateChange?: (range: DateRange | undefined) => void;

	search?: string;
	onSearchChange?: (value: string) => void;

	status?: 'active' | 'inactive' | 'all';
	onStatusChange?: (value: 'active' | 'inactive' | 'all') => void;

	children?: ReactNode;
};

export default function Filters({
	selectedDate,
	onDateChange,
	search,
	onSearchChange,
	status = 'all',
	onStatusChange,
	children,
}: FiltersProps) {
	return (
		<div className="flex w-full items-end gap-4">
			{/* LEFT — Calendar */}
			<DayPickerRange
				selectedDate={selectedDate}
				setDate={({ date }) => onDateChange?.(date)}
			/>

			{/* RIGHT — pushed to extreme right corner */}
			<div className="ml-auto flex items-end gap-3">
				<Input
					placeholder="Search appointments..."
					value={search}
					onChange={(e) => onSearchChange?.(e.target.value)}
					className="w-[220px]"
				/>

				<Select value={status} onValueChange={onStatusChange}>
					<SelectTrigger className="w-[160px]">
						<SelectValue placeholder="Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="active">Active</SelectItem>
						<SelectItem value="inactive">Inactive</SelectItem>
					</SelectContent>
				</Select>

				{children}
			</div>
		</div>
	);
}
