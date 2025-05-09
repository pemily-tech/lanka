'use client';

import { useEffect } from 'react';
import { Contact } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Roles } from '../../../../../helpers/primitives';
import { useAuthStore } from '../../../../../store/user-auth';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../../ui/shared/tabs';
import BusinessForm from '../../ui/business-details';
import AddressForm from './address';
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
			roleRequired: Roles.Clinic,
		},
		{
			label: 'Primary Address',
			value: 'address',
			component: <AddressForm />,
			roleRequired: Roles.Clinic,
		},
		{
			label: 'Business Details',
			value: 'business',
			component: <BusinessForm />,
			roleRequired: Roles.Clinic,
		},
		{
			label: 'Contact Us',
			value: 'contact',
			component: <Contact />,
			roleRequired: null, // For everyone
		},
	];

	const filteredTabs = tabData.filter(
		(tab) => !tab.roleRequired || tab.roleRequired === role
	);

	return (
		<div className="w-full">
			<Tabs value={type} onValueChange={handleChange} className="">
				<TabsList className="mb-12 w-full justify-start bg-white">
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
