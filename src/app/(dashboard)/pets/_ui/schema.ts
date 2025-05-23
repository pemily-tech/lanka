import { z } from 'zod';

export const petSchema = z.object({
	name: z.string().min(3, { message: 'Name is required' }),
	type: z.string().min(1, { message: 'Type is required' }),
	gender: z.string().min(1, { message: 'Gender is required' }),
	breed: z.string().min(1, { message: 'Breed is required' }),
	dob: z.string().min(1, { message: 'Date of birth is required' }),
	microChipNo: z.string().optional(),
});

export type IPetFormData = z.infer<typeof petSchema>;
