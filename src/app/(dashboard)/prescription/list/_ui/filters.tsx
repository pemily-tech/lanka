'use client';

import { memo } from 'react';
import { type DateRange } from 'react-day-picker';

import {
	Command,
	CommandInput,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared';
import { DayPicker } from '../../../../../ui/shared/day-picker';

interface IProps {
	selectedDate: DateRange | undefined;
	setDate: (payload: { date: DateRange }) => void;
	active: number;
	setActive: (active: number) => void;
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
}

function Filters({
	selectedDate,
	setDate,
	active,
	setActive,
	searchTerm,
	setSearchTerm,
}: IProps) {
	return (
		<div className="flex flex-row items-end justify-between gap-24">
			<DayPicker
				selectedDate={selectedDate}
				setDate={setDate}
				disabled={{ after: new Date() }}
			/>
			<div className="flex flex-1 flex-col gap-12">
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
				<div className="flex-1">
					<Command className="max-w-[450px] rounded-lg border">
						<CommandInput
							className="py-24"
							placeholder="Search..."
							value={searchTerm}
							onValueChange={setSearchTerm}
						/>
					</Command>
				</div>
			</div>
		</div>
	);
}

export default memo(Filters);
