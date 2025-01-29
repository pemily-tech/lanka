import { NextResponse } from 'next/server';

const data: ICommonTypes.INavigationItem[] = [
	{
		id: 1,
		type: 'link',
		path: '/home',
		title: 'Home',
		isIcon: true,
		icon: 'House',
	},
	{
		id: 2,
		type: 'link',
		path: '/follow-up',
		title: 'Follow Up',
		isIcon: false,
		icon: '/images/follow-ups.png',
	},
	{
		id: 3,
		type: 'link',
		path: '/billing',
		title: 'Billing',
		isIcon: true,
		icon: 'ReceiptIndianRupee',
	},
	{
		id: 3,
		type: 'link',
		path: '/items',
		title: 'Products',
		isIcon: true,
		icon: 'PackageSearch',
	},
	{
		id: 19,
		type: 'link',
		path: '/pet-parents',
		title: 'Pet Parents',
		isIcon: true,
		icon: 'UserCircleIcon',
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
