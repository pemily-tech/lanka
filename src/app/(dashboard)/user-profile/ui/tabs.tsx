'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Roles } from '../../../../helpers/primitives';
import { useAppSelector } from '../../../../store';
import { useAuthStore } from '../../../../store/user-auth';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../ui/shared';
import Loading from '../../../loading';

const PersonalDetailsForm = dynamic(() => import('./personal-details'), {
	loading: () => <Loading />,
});

const AddressForm = dynamic(() => import('./address'), {
	loading: () => <Loading />,
});

const BusinessForm = dynamic(() => import('./business-details'), {
	loading: () => <Loading />,
});

const Contact = dynamic(() => import('./contact'), {
	loading: () => <Loading />,
});

export default function UserTabs() {
	const { role } = useAuthStore();
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const type = params.get('type') as string;

	useEffect(() => {
		if (role === Roles.Clinic) {
			router.replace(`${pathname}?type=personal`);
		} else {
			router.replace(`${pathname}?type=contact`);
		}
	}, [role, pathname, router]);

	const handleChange = (val: string) => {
		router.replace(`${pathname}?type=${val}`);
	};

	return (
		<div className="col-span-2 p-16">
			<Tabs value={type} onValueChange={handleChange} className="">
				<TabsList className="mb-12 w-full justify-start bg-white">
					{role === Roles.Clinic && (
						<TabsTrigger className="flex-1 py-12" value="personal">
							Personal Details
						</TabsTrigger>
					)}
					{role === Roles.Clinic && (
						<TabsTrigger className="flex-1 py-12" value="address">
							Primary Address
						</TabsTrigger>
					)}
					{role === Roles.Clinic && (
						<TabsTrigger className="flex-1 py-12" value="business">
							Business Details
						</TabsTrigger>
					)}
					<TabsTrigger className="flex-1 py-12" value="contact">
						Contact Us
					</TabsTrigger>
				</TabsList>
				{role === Roles.Clinic && (
					<TabsContent className="mt-0" value="personal">
						<PersonalDetailsForm />
					</TabsContent>
				)}
				{role === Roles.Clinic && (
					<TabsContent className="mt-0" value="address">
						<AddressForm />
					</TabsContent>
				)}
				{role === Roles.Clinic && (
					<TabsContent className="mt-0" value="business">
						<BusinessForm />
					</TabsContent>
				)}
				<TabsContent className="mt-0" value="contact">
					<Contact />
				</TabsContent>
			</Tabs>
		</div>
	);
}
