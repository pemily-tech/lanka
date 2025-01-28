import { env } from '@/env.mjs';

export const siteConfig = {
	title: 'Pemilyy - Your Digital Pet Clinic Companion',
	description:
		'Transitioning Your Pet Clinic into the Digital Age with Our Advanced Platform',
	keywords: () => [
		'pemilyy',
		'pemily',
		'pets',
		'cats',
		'dogs',
		'family',
		'familyy',
		'digital clinic',
		'pet clinic',
		'clinic',
	],
	url: () => env.APP_URL,
	// googleSiteVerificationId: () => env.GOOGLE_SITE_VERIFICATION_ID || '',
};
