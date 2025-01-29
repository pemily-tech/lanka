'use client';

import { Tab } from '@headlessui/react';

import PrescriptionIcon from '../../../../../ui/icons/prescription-icon';

export default function TabItem({ title }: { title: string }) {
	const tabClass =
		'data-[selected]:font-semibold focus:outline-none cursor-pointer text-center data-[selected]:border-b-2 data-[selected]:border-purple flex items-center gap-8 pb-6 ';

	return (
		<Tab className={tabClass}>
			{({ selected }) => (
				<>
					<PrescriptionIcon
						className={selected ? 'text-purple' : ''}
						width={18}
						height={18}
					/>
					<span
						className={`${selected ? 'text-purple' : ''} text-14`}
					>
						{title}
					</span>
				</>
			)}
		</Tab>
	);
}
