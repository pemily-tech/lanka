import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(3, { message: 'Name is required' }),
	dose: z.string().min(1, { message: 'Dose is required' }),
});

export type IFormData = z.infer<typeof schema>;
