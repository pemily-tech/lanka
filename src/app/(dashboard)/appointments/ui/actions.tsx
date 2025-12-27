'use client';

import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/ui/button';

type Appointment = {
	_id: string;
};

export default function Actions({ record }: { record: Appointment }) {
	const handleEdit = () => {
		console.log('Edit appointment', record._id);
	};

	const handleCancel = () => {
		console.log('Cancel appointment', record._id);
	};

	return (
		<div className="flex items-center gap-2">
			<Button size="icon" variant="ghost" onClick={handleEdit}>
				<Pencil className="size-4" />
			</Button>

			<Button size="icon" variant="ghost" onClick={handleCancel}>
				<Trash2 className="size-4 text-red-600" />
			</Button>
		</div>
	);
}
