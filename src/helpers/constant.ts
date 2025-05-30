import { type IMedicalRecords } from '../types/common';
import PrescriptionIcon from '../ui/icons/prescription-icon';

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

export const medicalRecordsFilters = [
	{
		id: 0,
		name: 'Prescription',
		label: 'Prescription',
		value: 'PRESCRIPTION',
		icon: PrescriptionIcon,
	},
	{
		id: 1,
		name: 'Report',
		label: 'Report',
		value: 'REPORT',
		icon: PrescriptionIcon,
	},
	{
		id: 2,
		name: 'Diet',
		label: 'Diet',
		value: 'DIET',
		icon: PrescriptionIcon,
	},
	{
		id: 3,
		name: 'Other Document',
		label: 'Other Documents',
		value: 'OTHER',
		icon: PrescriptionIcon,
	},
] as unknown as IMedicalRecords[];

export const vaccinationClinicFilters = [
	{
		id: 0,
		name: 'Pending',
		label: 'Pending',
		value: 'PENDING',
		icon: PrescriptionIcon,
	},
	{
		id: 1,
		name: 'Complete',
		label: 'Completed',
		value: 'COMPLETE',
		icon: PrescriptionIcon,
	},
	{ id: 3, name: 'All', label: 'All', value: 'ALL', icon: PrescriptionIcon },
] as unknown as IMedicalRecords[];

export const vaccinationPetFilters = [
	...vaccinationClinicFilters.slice(0, 1),
	{
		id: 4,
		name: 'Upcoming',
		label: 'Upcoming',
		value: 'UPCOMING',
		icon: PrescriptionIcon,
	},
	...vaccinationClinicFilters.slice(1),
] as IMedicalRecords[];

export const follwupFilters = [
	{
		id: 0,
		name: 'Upcoming',
		label: 'Upcoming',
		value: 'UPCOMING',
		icon: PrescriptionIcon,
	},
	{ id: 1, name: 'All', label: 'All', value: 'ALL', icon: PrescriptionIcon },
] as unknown as IMedicalRecords[];

export const dogAndCatVaccines = [
	{ key: 'DHPPi+L', label: 'DHPPi+L' },
	{ key: 'DHPPi', label: 'DHPPi' },
	{ key: 'Corona', label: 'Corona' },
	{ key: 'Anti-Rabies', label: 'Anti-Rabies' },
	{ key: 'Kennel Cough', label: 'Kennel Cough' },
	{ key: 'CRP', label: 'CRP' },
	{ key: '10 in 1', label: '10 in 1' },
	{ key: '9 in 1', label: '9 in 1' },
	{ key: '7 in 1', label: '7 in 1' },
	{ key: 'DHPPi & Anti-Rabies', label: 'DHPPi & Anti-Rabies' },
	{ key: 'DHPPi & Kennel Cough', label: 'DHPPi & Kennel Cough' },
	{ key: 'DHPPi & Corona', label: 'DHPPi & Corona' },
	{ key: 'Corona & Kennel Cough', label: 'Corona & Kennel Cough' },
	{ key: 'Corona & Anti-Rabies', label: 'Corona & Anti-Rabies' },
	{ key: 'Kennel Cough & Anti-Rabies', label: 'Kennel Cough & Anti-Rabies' },
	{ key: 'CRP & Anti-Rabies', label: 'CRP & Anti-Rabies' },
	{ key: 'DHPPi & Deworming', label: 'DHPPi & Deworming' },
	{ key: 'Corona & Deworming', label: 'Corona & Deworming' },
	{ key: 'Kennel Cough & Deworming', label: 'Kennel Cough & Deworming' },
	{ key: 'Anti-Rabies & Deworming', label: 'Anti-Rabies & Deworming' },
	{ key: 'CRP & Deworming', label: 'CRP & Deworming' },
	{
		key: 'DHPPi, Anti-Rabies & Corona',
		label: 'DHPPi, Anti-Rabies & Corona',
	},
	{
		key: 'DHPPi, Anti-Rabies & Kennel Cough',
		label: 'DHPPi, Anti-Rabies & Kennel Cough',
	},
	{
		key: 'Anti-Rabies, Corona & Kennel Cough',
		label: 'Anti-Rabies, Corona & Kennel Cough',
	},
];

export const followupData = [
	{ key: 'Deworming', label: 'Deworming' },
	{ key: 'Grooming', label: 'Grooming' },
	{ key: 'Blood Test', label: 'Blood Test' },
	{ key: 'Spot On', label: 'Spot On' },
	{ key: 'NexGard', label: 'NexGard' },
	{ key: 'Tetanus', label: 'Tetanus' },
	{ key: '1st Post Bite Rabies', label: '1st Post Bite Rabies' },
	{ key: '2nd Post Bite Rabies', label: '2nd Post Bite Rabies' },
	{ key: '3rd Post Bite Rabies', label: '3rd Post Bite Rabies' },
	{ key: '4th Post Bite Rabies', label: '4th Post Bite Rabies' },
	{ key: '5th Post Bite Rabies', label: '5th Post Bite Rabies' },
	{ key: 'Treatment Follow-up', label: 'Treatment Follow-up' },
	{ key: 'Post-Surgery Checkup', label: 'Post-Surgery Checkup' },
	{ key: 'Behavior Evaluation', label: 'Behavior Evaluation' },
	{ key: 'Injury or Wound', label: 'Injury or Wound' },
	{ key: 'Diet and Nutrition Review', label: 'Diet and Nutrition Review' },
	{ key: 'Diagnostic Test', label: 'Diagnostic Test' },
];

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
