'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import MedicalRecord from '../_ui/medical-record';
import VaccinationRecord from './vaccination-records';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/shared/tabs';

export default function RecordTabs() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	const tabData = [
		{
			label: 'Medical Records',
			value: 'medical',
			component: <MedicalRecord />,
		},
		{
			label: 'Vaccination Records',
			value: 'vaccination',
			component: <VaccinationRecord />,
		},
		{
			label: 'Follow Ups',
			value: 'followups',
			component: <div>Follow Ups</div>,
		},
		{
			label: 'Health Certificate',
			value: 'health_certificate',
			component: <div>Health Certificate</div>,
		},
	];

	return (
		<div className="w-full">
			<Tabs value={type} onValueChange={handleChange}>
				<TabsList className="mb-12 w-full max-w-3xl justify-start rounded-none border-b bg-white">
					{tabData.map((tab) => (
						<TabsTrigger
							key={tab.value}
							className="flex-1 py-12"
							value={tab.value}
						>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{tabData.map((tab) => (
					<TabsContent
						key={tab.value}
						className="mt-0"
						value={tab.value}
					>
						{tab.component}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
