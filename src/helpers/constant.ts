import { env } from '@/env.mjs';
import { type IHomeInfoCard } from '@/types/common';

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

export const medicalRecordFilters = [
	{
		label: 'Prescription',
		value: 'PRESCRIPTION',
	},
	{
		label: 'Report',
		value: 'REPORT',
	},
	{ label: 'Diet', value: 'DIET' },
	{ label: 'Other Documents', value: 'OTHER' },
];

export const homeInfoCard: IHomeInfoCard[] = [
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

export const addressTypes = [
	{ label: 'Home', value: 'HOME' },
	{ label: 'Work', value: 'WORK' },
	{ label: 'Other', value: 'OTHER' },
];
