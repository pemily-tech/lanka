import { type IPetFormData } from './schema';

export const formFields: {
	name: keyof IPetFormData;
	label: string;
	type: 'textField' | 'select' | 'calendar' | 'combobox';
	options?: { label: string; value: string }[];
}[] = [
	{ name: 'name', label: 'Name', type: 'textField' },
	{
		name: 'type',
		label: 'Type',
		type: 'select',
		options: [
			{ label: 'Dog', value: 'DOG' },
			{ label: 'Cat', value: 'CAT' },
		],
	},
	{ name: 'breed', label: 'Breed', type: 'combobox', options: [] },
	{
		name: 'gender',
		label: 'Gender',
		type: 'select',
		options: [
			{ label: 'Male', value: 'M' },
			{ label: 'Female', value: 'F' },
		],
	},
	{ name: 'dob', label: 'Date of Birth', type: 'calendar' },
	{ name: 'microChipNo', label: 'Microchip No.', type: 'textField' },
];
