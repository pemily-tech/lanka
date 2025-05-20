'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Roles } from '../../../../../helpers/primitives';
import { useAuthStore } from '../../../../../store/user-auth';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../../ui/shared/tabs';
import AddressForm from './address';
import BusinessDetails from './business-details';
import Contact from './contact';
import Doctors from './doctor';
import PersonalDetailsForm from './personal-details';

export default function UserTabs() {
	const { role } = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;

	useEffect(() => {
		if (role === Roles.Clinic && !type) {
			router.replace(`${pathname}?type=personal`);
		} else if (!type) {
			router.replace(`${pathname}?type=contact`);
		}
	}, [role, pathname, type, router]);

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	const tabData = [
		{
			label: 'Personal Details',
			value: 'personal',
			component: <PersonalDetailsForm />,
			role: [Roles.Clinic],
		},
		{
			label: 'Primary Address',
			value: 'address',
			component: <AddressForm />,
			role: [Roles.Clinic],
		},
		{
			label: 'Business Details',
			value: 'business',
			component: <BusinessDetails />,
			role: [Roles.Clinic],
		},
		{
			label: 'Doctors',
			value: 'doctors',
			component: <Doctors />,
			role: [Roles.Clinic],
		},
		{
			label: 'Contact Us',
			value: 'contact',
			component: <Contact />,
			role: [Roles.Clinic, Roles.Staff],
		},
	];

	const filteredTabs = tabData.filter((item) => {
		if (!item.role) return true;
		return item.role.includes(role as Roles);
	});

	return (
		<div className="w-full">
			<Tabs value={type} onValueChange={handleChange}>
				<TabsList className="mb-12 w-full max-w-3xl justify-start rounded-none border-b bg-white">
					{filteredTabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							className="flex-1 py-12"
							value={tab.value}
						>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{filteredTabs.map((tab) => (
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
