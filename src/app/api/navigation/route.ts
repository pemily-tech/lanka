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
		id: 12,
		type: 'link',
		path: '/medical-records',
		title: 'Medical Records',
		isIcon: false,
		icon: '/images/medical-records.png',
	},
	{
		id: 12,
		type: 'link',
		path: '/vaccination-records',
		title: 'Vaccination Records',
		isIcon: false,
		icon: '/images/vaccination-records.png',
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
