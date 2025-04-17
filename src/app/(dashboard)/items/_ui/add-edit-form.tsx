/* eslint-disable max-lines-per-function */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type IProduct } from '../../../../types/invoice';
import {
	Button,
	FloatingInput,
	FloatingTextArea,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../ui/shared';
import { useAddItem } from '../_api/add-item';
import { useUpdateItem } from '../_api/update-item';
import { useGetItemById } from '../edit/[id]/api/get-item-by-id';

const schema = z.object({
	name: z.string().min(3, { message: 'Title is required' }),
	description: z.string().min(6, { message: 'Description is required' }),
	quantity: z.string().min(1, { message: 'Quantity must be at least 1' }),
	mrp: z.string().min(1, { message: 'MRP is required' }),
	price: z.string().min(1, { message: 'Price is required' }),
	type: z.string().min(1, { message: 'Choose a type' }),
	// active: z
	// 	.string()
	// 	.min(1, { message: 'Active status is required' })
	// 	.optional(),
});

type IFormData = z.infer<typeof schema>;

export default function AddEditForm({
	type,
	itemId,
}: {
	type: 'ADD' | 'EDIT';
	itemId?: string;
}) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			description: '',
			quantity: '',
			mrp: '',
			price: '',
			type: '',
			// active: productData?.active ? 'true' : 'false',
		},
	});
	const { mutateAsync: addItem, isPending } = useAddItem();
	const { data, refetch } = useGetItemById(itemId);
	const itemData = data?.data?.item || ({} as IProduct);
	const { mutateAsync: updateItem, isPending: isLoading } = useUpdateItem(
		itemId as string
	);

	useEffect(() => {
		if (type === 'EDIT' && itemId) {
			form.reset({
				name: itemData?.name || '',
				description: itemData?.description || '',
				quantity: itemData?.quantity?.toString() || '',
				mrp: itemData?.mrp?.toString() || '',
				price: itemData?.price?.toString() || '',
				type: itemData?.type,
				// active: productData?.active?.toString() || 'true',
			});
		}
	}, [
		form,
		itemData?.description,
		itemData?.mrp,
		itemData?.name,
		itemData?.price,
		itemData?.quantity,
		itemData?.type,
		itemId,
		type,
	]);

	const onSubmit = async (values: IFormData) => {
		const { mrp, price, quantity, ...rest } = values;
		const payload = {
			...rest,
			mrp: Number(mrp),
			price: Number(price),
			quantity: Number(quantity),
		};
		if (type === 'ADD') {
			const response = await addItem(payload);
			if (response.status === 'SUCCESS') {
				form.reset();
			}
		} else {
			const response = await updateItem(payload);
			if (response.status === 'SUCCESS') {
				form.reset();
				refetch();
			}
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-24"
			>
				{[
					['name', 'Name', 'text'],
					['price', 'Price', 'numeric'],
					['mrp', 'MRP', 'numeric'],
					['quantity', 'Quantity', 'numeric'],
					['description', 'Description', 'text', 'textarea'],
					['type', 'Type', 'numeric', 'select'],
				].map(([name, label, type, select]) => {
					if (select === 'textarea') {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({ field: inputField, fieldState }) => (
									<FormItem className="relative col-span-1">
										<FormControl>
											<FloatingTextArea
												label={label}
												id={name}
												isError={!!fieldState.error}
												{...inputField}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					} else if (select === 'select') {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({
									field: selectField,
									fieldState,
								}) => {
									return (
										<FormItem>
											<FormLabel>Type</FormLabel>
											<Select
												onValueChange={
													selectField.onChange
												}
												defaultValue={selectField.value}
												value={selectField.value}
											>
												<FormControl>
													<SelectTrigger
														isError={
															!!fieldState.error
														}
														className="!mt-6 bg-white"
													>
														<SelectValue placeholder="Select a type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="SERVICE">
														Service
													</SelectItem>
													<SelectItem value="PRODUCT">
														Product
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						);
					}
					return (
						<FormField
							key={name}
							control={form.control}
							name={name as keyof IFormData}
							render={({ field, fieldState }) => (
								<FormItem className="relative">
									<FormControl>
										<FloatingInput
											label={label}
											id={name}
											isError={!!fieldState.error}
											type={type || 'text'}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}
				<Button
					loading={isPending || isLoading}
					disabled={isPending || isLoading}
					className="col-span-1"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
