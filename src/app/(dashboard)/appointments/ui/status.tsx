'use client';

import { cn } from '@/helpers/utils';

export default function Status({ status }: { status: string }) {
	const isCompleted = status === 'Completed';

	return (
		<span
			className={cn(
				'rounded-md px-2 py-1 text-sm font-medium',
				isCompleted
					? 'bg-green-100 text-green-800'
					: 'bg-yellow-100 text-yellow-800'
			)}
		>
			{status}
		</span>
	);
}
