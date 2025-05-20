import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(3, { message: 'Name is required' }),
	brand: z.string().min(3, { message: 'Brand is required' }),
	diagnosis: z.string().min(3, { message: 'Diagnosis is required' }),
	dose: z.string().min(1, { message: 'Dose is required' }),
	duration: z.string().min(1, { message: 'Duration is required' }),
	frequency: z.string().min(1, { message: 'Frequency is required' }),
	strength: z.string().min(1, { message: 'Strength is required' }),
	interval: z.string().min(1, { message: 'Interval is required' }),
	take: z.string().min(1, { message: 'Take is required' }),
	active: z.boolean().optional(),
});

export type IFormData = z.infer<typeof schema>;
