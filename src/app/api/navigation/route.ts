import { NextResponse } from 'next/server';

import { Routes } from '../../../helpers/routes';

const data: ICommonTypes.INavigationItem[] = [
	{
		id: 1,
		type: 'link',
		path: Routes.HOME,
		title: 'Home',
		isIcon: true,
		icon: 'House',
	},
	{
		id: 12,
		type: 'link',
		path: Routes.MEDICAL_RECORDS,
		title: 'Medical Records',
		isIcon: false,
		icon: '/images/medical-records.png',
	},
	{
		id: 12,
		type: 'link',
		path: Routes.VACCINATION_RECORDS,
		title: 'Vaccination Records',
		isIcon: false,
		icon: '/images/vaccination-records.png',
	},
	{
		id: 2,
		type: 'link',
		path: Routes.FOLLOW_UP,
		title: 'Follow Up',
		isIcon: false,
		icon: '/images/follow-ups.png',
	},
	{
		id: 3,
		type: 'menu',
		path: '/billing',
		title: 'Billing',
		isIcon: true,
		icon: 'ReceiptIndianRupee',
		items: [
			{
				id: 3,
				type: 'link',
				path: Routes.BILLING_LIST,
				title: 'Invoice List',
				isIcon: false,
			},
			{
				id: 4,
				type: 'link',
				path: Routes.ADD_BILLING_ITEM,
				title: 'Create Invoice',
				isIcon: false,
			},
		],
	},
	{
		id: 3,
		type: 'menu',
		path: '/items/list',
		title: 'Products',
		isIcon: true,
		icon: 'PackageSearch',
		items: [
			{
				id: 3,
				type: 'link',
				path: Routes.ITEMS_LIST,
				title: 'Items',
				isIcon: false,
			},
			{
				id: 4,
				type: 'link',
				path: Routes.ADD_ITEM,
				title: 'Add Item',
				isIcon: false,
			},
		],
	},
	{
		id: 19,
		type: 'link',
		path: '/pet-parents',
		title: 'Pet Parents',
		isIcon: false,
		icon: '/images/Pet-Parent.svg',
	},
	{
		id: 9,
		type: 'link',
		path: '/user-profile',
		title: 'Profile',
		isIcon: true,
		icon: 'UserCircleIcon',
	},
];

export async function GET() {
	return NextResponse.json({ data });
}
