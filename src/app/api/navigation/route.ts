import { NextResponse } from 'next/server';

import { Routes } from '../../../helpers/routes';
import { type INavigationItem } from '../../../types/common';

import { Roles } from '@/helpers/primitives';

const data: INavigationItem[] = [
	{
		id: 1,
		type: 'link',
		path: Routes.HOME,
		title: 'Home',
		isIcon: true,
		icon: 'House',
		roles: [Roles.Clinic, Roles.Staff],
	},
	{
		id: 12,
		type: 'link',
		path: Routes.MEDICAL_RECORDS,
		title: 'Medical Records',
		isIcon: false,
		icon: '/images/medical-records.png',
		roles: [Roles.Clinic, Roles.Staff],
	},
	{
		id: 12,
		type: 'link',
		path: Routes.VACCINATION_RECORDS,
		title: 'Vaccination Records',
		isIcon: false,
		icon: '/images/vaccination-records.png',
		roles: [Roles.Clinic, Roles.Staff],
	},
	{
		id: 2,
		type: 'link',
		path: Routes.FOLLOW_UP,
		title: 'Follow Up',
		isIcon: false,
		icon: '/images/follow-ups.png',
		roles: [Roles.Clinic, Roles.Staff],
	},
	{
		id: 19,
		type: 'link',
		path: '/pet-parents',
		title: 'Pet Parents',
		isIcon: false,
		icon: '/images/Pet-Parent.svg',
		roles: [Roles.Clinic, Roles.Staff],
	},
	{
		id: 3,
		type: 'menu',
		path: '/items/list',
		title: 'ePrescription',
		isIcon: true,
		icon: 'Pill',
		roles: [Roles.Clinic],
		items: [
			{
				id: 3,
				type: 'link',
				path: Routes.PRESCRIPTION_LIST,
				title: 'Rx & SOAP',
				isIcon: false,
				roles: [Roles.Clinic],
			},
			{
				id: 4,
				type: 'link',
				path: Routes.MEDICINES_LIST,
				title: 'My Medications',
				isIcon: false,
				roles: [Roles.Clinic],
			},
		],
	},
	{
		id: 9,
		type: 'link',
		path: '/user-profile',
		title: 'Profile',
		isIcon: true,
		icon: 'UserCircleIcon',
		roles: [Roles.Clinic, Roles.Staff],
	},
];

export async function GET() {
	return NextResponse.json({ data });
}
