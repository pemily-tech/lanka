import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type IItem, IItemType } from '@/types/bills-items';
import { Button } from '@/ui/button';
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { FloatingInput } from '@/ui/input';

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
type IFormData = z.infer<typeof schema>;

export default function UpdateItem({
	item,
	updateItem,
}: {
	item: IItem;
	updateItem: (item: IItem) => void;
}) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: useMemo(() => {
			const isValidType = (val: any): val is IItemType =>
				Object.values(IItemType).includes(val);

			return {
				name: item?.name ?? '',
				description: item?.description ?? '',
				price: item?.price?.toString() ?? '',
				mrp: item?.mrp?.toString() ?? '',
				quantity: item?.quantity?.toString() ?? '',
				discount: item?.discount?.toString() ?? '',
				type: isValidType(item?.type) ? item.type : IItemType.PRODUCT,
			} satisfies IFormData;
		}, [item]),
	});
	const watchMrp = form.watch('mrp');
	const watchPrice = form.watch('price');

	useEffect(() => {
		if (
			watchMrp &&
			watchPrice &&
			!isNaN(+watchMrp) &&
			!isNaN(+watchPrice)
		) {
			const calculatedDiscount = Math.max(+watchMrp - +watchPrice, 0);
			form.setValue('discount', calculatedDiscount.toFixed(2));
		}
	}, [watchMrp, watchPrice, form]);

	const inputFields: Array<[keyof IFormData, string, 'text' | 'numeric']> = [
		['name', 'Name', 'text'],
		['description', 'Description', 'text'],
		['price', 'Price', 'numeric'],
		['mrp', 'Mrp', 'numeric'],
		['quantity', 'Quantity', 'numeric'],
		['discount', 'Discount', 'numeric'],
	];

	const onSubmit = (values: IFormData) => {
		const payload = {
			...item,
			name: values.name,
			price: Math.floor(Number(values.price)),
			quantity: Math.floor(Number(values.quantity)),
			mrp: Math.floor(Number(values.mrp)),
			description: values.description ?? '',
			discount: Math.floor(Number(values.discount)),
		};
		updateItem(payload);
	};

	return (
		<DialogContent className="max-w-3xl gap-4">
			<DialogHeader>
				<DialogTitle>Update Item</DialogTitle>
			</DialogHeader>
			<DialogDescription className="text-neutral-400"></DialogDescription>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-1 grid grid-cols-2 gap-6"
				>
					{inputFields.map(([name, label], i) => (
						<FormField
							key={i}
							control={form.control}
							name={name}
							render={({ field, fieldState }) => (
								<FormItem className="relative">
									<FormControl>
										<FloatingInput
											label={label}
											id={name}
											isError={!!fieldState.error}
											disabled={name === 'discount'}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<DialogFooter className="border-t border-neutral-300 pt-4 col-span-2">
						<div className="gap-2 flex">
							<DialogClose asChild>
								<Button className="px-10" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button
								className="px-10"
								variant="secondary"
								type="submit"
							>
								Save
							</Button>
						</div>
					</DialogFooter>
				</form>
			</Form>
		</DialogContent>
	);
}
