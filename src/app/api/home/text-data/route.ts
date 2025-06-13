import { NextResponse } from 'next/server';

import { type IHomeInfoCard } from '@/types/common';

const data: IHomeInfoCard[] = [
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

export async function GET(): Promise<NextResponse<{ data: IHomeInfoCard[] }>> {
	return NextResponse.json({ data });
}
