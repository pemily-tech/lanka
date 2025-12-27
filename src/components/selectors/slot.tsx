'use client';
import { type UseFormSetValue } from 'react-hook-form';

import { useGetDoctorSlots } from '@/app/(dashboard)/appointments/_api/getDoctorSlots';
import { cn } from '@/helpers/utils';

type SlotSelectorProps = {
	setValue: UseFormSetValue<any>;
	selectedSlot?: string;
	doctorId: string;
};

function formatTime(hour: number, minute: number, period: string) {
	const m = minute.toString().padStart(2, '0');
	return `${hour}:${m} ${period}`;
}

export default function SlotSelector({
	setValue,
	selectedSlot,
	doctorId,
}: SlotSelectorProps) {
	const appointmentDate = new Date().toISOString().split('T')[0];

	const { data, isLoading } = useGetDoctorSlots({
		appointmentDate,
		type: 'CLINIC',
		slotType: 'SIXTY_MINUTE',
		doctorId,
	});

	console.log('Doctor slots API response:', data);

	if (isLoading) {
		return (
			<div className="text-sm text-muted-foreground">
				Loading slots...
			</div>
		);
	}

	const schedules = data?.data?.schedules ?? [];
	const slots = schedules.flatMap((schedule: any) => schedule.slots ?? []);

	return (
		<div className="space-y-3">
			{slots.length === 0 && (
				<div className="text-sm text-muted-foreground">
					No slots available
				</div>
			)}

			{slots.map((slot: any) => {
				const start = formatTime(
					slot.startHour,
					slot.startMinute,
					slot.startTimePeriod
				);

				const end = formatTime(
					slot.endHour,
					slot.endMinute,
					slot.endTimePeriod
				);

				return (
					<div
						key={slot._id}
						onClick={() => setValue('slot', slot._id)}
						className={cn(
							'cursor-pointer rounded-lg border px-4 py-3 text-sm font-medium',
							'hover:border-primary',
							selectedSlot === slot._id
								? 'border-primary bg-primary/10 text-primary'
								: 'bg-background'
						)}
					>
						{start} – {end}
					</div>
				);
			})}
		</div>
	);
}
