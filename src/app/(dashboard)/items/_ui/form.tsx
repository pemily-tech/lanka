'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../../../ui/form';
import { type IFormData } from './schema';
import SelectField from './select';
import { useItemForm } from './use-form';

import { Button } from '@/ui/button';
import { FloatingInput } from '@/ui/input';

export function ItemForm({ type }: { type: 'UPDATE' | 'CREATE' }) {
	const { form, onSubmit, isCreating, isUpdating } = useItemForm(type);

	const inputFields: Array<[keyof IFormData, string, 'text' | 'numeric']> = [
		['name', 'Name', 'text'],
		['description', 'Description', 'text'],
		['price', 'Price', 'numeric'],
		['mrp', 'Mrp', 'numeric'],
		['quantity', 'Quantity', 'numeric'],
		['discount', 'Discount', 'numeric'],
	];

	return (
		<div className="col-span-2 rounded-lg bg-white p-4 shadow-md">
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
					<SelectField form={form} name="type" label="Type" />
					<div className="col-span-2">
						<Button
							disabled={isCreating || isUpdating}
							loading={isCreating || isUpdating}
							loadingText={
								type === 'UPDATE'
									? 'Updating ...'
									: 'Creating ...'
							}
							type="submit"
							className="w-[240px]"
						>
							{type === 'UPDATE' ? 'Update' : 'Create'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
