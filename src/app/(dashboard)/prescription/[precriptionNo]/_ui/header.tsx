'use client';

import { useParams } from 'next/navigation';

export default function Header() {
	const params = useParams();
	const prescriptionNo = params?.precriptionNo as string;

	return (
		<div className="mb-16 flex">
			<div className="flex items-center gap-6">
				<span className="text-black-1/60">RX No: </span>
				<span className="text-lg font-medium">{prescriptionNo}</span>
			</div>
		</div>
	);
}
