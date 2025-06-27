/* eslint-disable indent */
'use client';

import { ChevronDown } from 'lucide-react';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../../ui/form';
import { FloatingInput } from '../../../../ui/input';
import { type IFormData, useAddressForm } from '../_hooks/use-address';

import { addressTypes } from '@/helpers/constant';
import { cn } from '@/helpers/utils';
import { Button } from '@/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

export function AddressForm({ type }: { type: 'add' | 'edit' }) {
	const { form, onSubmit, isPending, isUpdating } = useAddressForm(type);

	return (
		<div
			className={cn(
				'rounded-lg bg-white p-4 shadow-md',
				type === 'add' && 'max-w-2xl'
			)}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-1 grid grid-cols-2 gap-6"
				>
					{[
						['line1', 'Line 1'],
						['line2', 'Line2'],
						['pincode', 'Pincode'],
						['district', 'District', true],
						['state', 'State', true],
					].map(([name, label, disabled], i) => (
						<FormField
							key={i}
							control={form.control}
							name={name as keyof IFormData}
							render={({ field, fieldState }) => (
								<FormItem className="relative">
									<FormControl>
										<FloatingInput
											label={label}
											id={name}
											isError={!!fieldState.error}
											disabled={disabled}
											{...(field as any)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
					<FormField
						control={form.control}
						name={'type' as keyof IFormData}
						render={({ field }) => (
							<FormItem className="flex flex-col space-y-1">
								<FormLabel>Choose address type</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												'justify-between font-normal',
												!field.value &&
													'text-muted-foreground'
											)}
										>
											{field.value
												? addressTypes.find(
														(item) =>
															item.value ===
															field.value
													)?.label
												: 'Choose address type'}
											<ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
										{addressTypes.map((type) => (
											<Button
												key={type.value}
												variant="ghost"
												className="w-full justify-start px-4 text-left"
												onClick={() =>
													field.onChange(type.value)
												}
											>
												{type.label}
											</Button>
										))}
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="col-span-2">
						<Button
							disabled={isPending || isUpdating}
							loading={isPending || isUpdating}
							type="submit"
							className="w-[240px]"
						>
							{type === 'edit'
								? 'Update Address'
								: 'Create Address'}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
