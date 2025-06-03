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

export const certificateData = [
	{ value: 'ARV_CERTIFICATE', label: 'Arv Certificate' },
	{
		value: 'HEALTH_CUM_VACCINATION_CERTIFICATE',
		label: 'Health Cum Vaccination Certificate',
	},
	{
		value: 'TRAVEL_CUM_VACCINATION_CERTIFICATE',
		label: 'Travel Cum Vaccination Certificate',
	},
	{ value: 'EUTHANASIA_CERTIFICATE', label: 'Euthanasia Certificate' },
	{ value: 'SURGICAL_RISK_NOTE', label: 'Surgical Risk Note' },
	{ value: 'STERILIZATION_CERTIFICATE', label: 'Sterilization Certificate' },
	{ value: 'DEATH_CERTIFICATE', label: 'Death Certificate' },
	{
		value: 'MICROCHIP_IMPLANTATION_CERTIFICATE',
		label: 'Microchip Implantation Certificate',
	},
	{
		value: 'IDENTIFICATION_CERTIFICATE',
		label: 'Identification Certificate',
	},
	{ value: 'BOARDING_AND_LODGING', label: 'Boarding & Lodging' },
];

export const DATE_FORMAT = 'do MMM, yyyy';
export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';
export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_BE_FORMAT = 'dd-MM-yyyy';

export const MAX_SIZE_500 = 500 * 1024;
export const MAX_SIZE_2MB = 2 * 1024 * 1024;
