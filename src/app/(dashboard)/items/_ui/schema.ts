import { z } from 'zod';

import { IItemType } from '@/types/bills-items';

export const schema = z
	.object({
		name: z
			.string()
			.min(3, 'Name must be at least 3 characters')
			.max(50, 'Name must not exceed 50 characters')
			.nonempty('Name is required'),

		description: z
			.string()
			.max(200, 'Description must not exceed 200 characters')
			.optional(),

		price: z
			.string()
			.nonempty('Price is required')
			.refine((val) => !isNaN(Number(val)), {
				message: 'Price must be a valid number',
			})
			.refine((val) => Number(val) > 0, {
				message: 'Price must be a positive number',
			})
			.refine((val) => Number(val) <= 100000, {
				message: 'Price must not exceed 100,000',
			})
			.refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
				message: 'Price can have up to two decimal places',
			}),

		mrp: z
			.string()
			.nonempty('MRP is required')
			.refine((val) => !isNaN(Number(val)), {
				message: 'MRP must be a valid number',
			})
			.refine((val) => Number(val) > 0, {
				message: 'MRP must be a positive number',
			})
			.refine((val) => /^\d+(\.\d{1,2})?$/.test(val), {
				message: 'MRP can have up to two decimal places',
			}),

		quantity: z
			.string()
			.nonempty('Quantity is required')
			.refine((val) => !isNaN(Number(val)), {
				message: 'Quantity must be a valid number',
			})
			.refine((val) => Number(val) % 1 === 0, {
				message: 'Quantity must be an integer',
			})
			.refine((val) => Number(val) >= 0, {
				message: 'Quantity must be at least 9',
			})
			.refine((val) => Number(val) <= 1000, {
				message: 'Quantity must not exceed 1000',
			}),

		discount: z
			.string()
			.nonempty('Discount is required')
			.refine((val) => !isNaN(Number(val)), {
				message: 'Discount must be a valid number',
			})
			.refine((val) => Number(val) >= 0, {
				message: 'Discount must be at least 1',
			}),

		type: z.nativeEnum(IItemType, {
			errorMap: () => ({ message: 'Type is required or invalid' }),
		}),
	})
	.refine((data) => Number(data.mrp) >= Number(data.price), {
		message: 'MRP must be greater than or equal to Price',
		path: ['mrp'],
	});

export type IFormData = z.infer<typeof schema>;
