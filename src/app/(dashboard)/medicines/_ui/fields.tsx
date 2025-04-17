import { type IFormData } from './schema';

export const fields: {
	name: keyof IFormData;
	label: string;
	type: 'text' | 'select' | 'textarea';
	options?: { value: string; label: string }[];
}[] = [
	{ name: 'name', label: 'Name', type: 'text' },
	{ name: 'dose', label: 'Dose', type: 'select' },
];
