'use client';

import { memo } from 'react';
import { format } from 'date-fns';

import {
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared';
import { DayPicker } from '../../../../../ui/shared/day-picker';

interface IProps {
	selectedDate: Date;
	setDate: (payload: { date: Date }) => void;
	active: number;
	setActive: (active: number) => void;
}

function Filters({ selectedDate, setDate, active, setActive }: IProps) {
	return (
		<div className="flex flex-row items-end justify-between gap-24">
			<DayPicker selectedDate={selectedDate} setDate={setDate} />
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
	);
}

export default memo(Filters);
