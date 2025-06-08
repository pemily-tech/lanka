'use client';

import { useState } from 'react';

import { AppConstants, Roles } from '../../../helpers/primitives';
import { useAuthStore } from '../../../store/user-auth';
import { Button } from '../../../ui/button';
import { useVaccinationExcel } from './_api/analytics';

import { LazyImage } from '@/ui/lazy-image';

const months = [
	{ value: 1, label: 'January' },
	{ value: 2, label: 'February' },
	{ value: 3, label: 'March' },
	{ value: 4, label: 'April' },
	{ value: 5, label: 'May' },
	{ value: 6, label: 'June' },
	{ value: 7, label: 'July' },
	{ value: 8, label: 'August' },
	{ value: 9, label: 'September' },
	{ value: 10, label: 'October' },
	{ value: 11, label: 'November' },
	{ value: 12, label: 'December' },
];

const years = [
	{ value: 2024, label: '2024' },
	{ value: 2025, label: '2025' },
];

const lists = [
	{
		l1: 'Transparency',
		l2: 'Your data belongs to you, and we take pride in making it accessible.',
	},
	{
		l1: 'Security',
		l2: 'Your data is secure. Avoid multiple downloads and sharing with untrusted sources.',
	},
	{
		l1: 'Notifications',
		l2: 'Admins receive WhatsApp alerts for every download.',
	},
	{
		l1: 'User-Friendly',
		l2: 'Data is available in a simple and easy-to-use Excel format.',
	},
	{
		l1: 'Growth-Focused',
		l2: 'Gain monthly insights to support growth and better planning.',
	},
];

export default function Page() {
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(2025);
	const { mutateAsync: vaccinationExcel, isPending } = useVaccinationExcel();
	const { role } = useAuthStore();

	const handleSubmit = async () => {
		const payload = {
			type: 'VACCINATION',
			year,
			month,
		};
		const response = await vaccinationExcel(payload);
		if (
			response.status === AppConstants.Success &&
			response?.data?.signedUrl
		) {
			window.location.href = response.data.signedUrl;
			setYear(2025);
			setMonth(1);
		}
	};

	return (
		<section className="rounded-lg bg-white">
			<div className="grid grid-cols-5">
				<div className="col-span-2 p-4">
					<h1 className="text-3xl font-semibold">
						Data For Your Growth & Trust
					</h1>
					<ul className="space-y-2 py-4 pl-1">
						{lists.map((list, i) => (
							<li
								key={i}
								className="leading-18 relative list-none py-1 pl-2"
							>
								<span className="text-lg font-semibold text-gray-700">
									{list?.l1}:{' '}
								</span>
								<span className="text-black">{list?.l2}</span>
							</li>
						))}
					</ul>
					<div className="mt-1">
						<div className="grid grid-cols-2 gap-6">
							<div className="col-span-1 flex flex-col gap-1">
								<label className="text-xs font-medium">
									Select Year
								</label>
								<select
									value={year}
									onChange={(e) =>
										setYear(Number(e.target.value))
									}
									className="rounded-lg border border-gray-300 p-2 text-sm outline-none"
								>
									{years.map((year) => {
										return (
											<option
												key={year.value}
												value={year.value}
											>
												{year.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className="col-span-1 flex flex-col gap-1">
								<label className="text-xs font-medium">
									Select Month
								</label>
								<select
									value={month}
									onChange={(e) =>
										setMonth(Number(e.target.value))
									}
									className="rounded-lg border border-gray-300 p-2 text-sm outline-none"
								>
									{months.map((month) => {
										return (
											<option
												key={month.value}
												value={month.value}
											>
												{month.label}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<Button
							disabled={isPending || role === Roles.Staff}
							loading={isPending}
							onClick={handleSubmit}
							className="mt-6 w-full"
						>
							<span>Download</span>
						</Button>
					</div>
				</div>
				<div className="col-span-3">
					<LazyImage
						className="size-full object-cover"
						src="/images/home-bg.jpg"
					/>
				</div>
			</div>
		</section>
	);
}
