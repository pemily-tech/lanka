'use client';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../../ui/form';
import SelectField from './select';
import { useMedicineForm } from './use-form';

import { Button } from '@/ui/button';
import { FloatingInput } from '@/ui/input';
import { Switch } from '@/ui/switch';

export function MedicineForm({ type }: { type: 'UPDATE' | 'CREATE' }) {
	const { form, onSubmit, isUpdating, isCreating } = useMedicineForm(type);

	return (
		<div className="col-span-2 rounded-lg bg-white p-4 shadow-md">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-1 grid grid-cols-2 gap-6"
				>
					{[['name', 'Name']].map(([name, label], i) => {
						return (
							<FormField
								key={i}
								control={form.control}
								name={name as any}
								render={({ field: inputField, fieldState }) => (
									<FormItem className="relative">
										<FormControl>
											<FloatingInput
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
					})}
					<FormField
						control={form.control}
						name="active"
						render={({ field: switchField }) => (
							<FormItem className="flex flex-row items-center gap-3">
								<div className="space-y-1">
									<FormLabel className="text-sm">
										Choose Active/InActive
									</FormLabel>
									<FormDescription>
										You have make the field Active/InActive
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={switchField.value}
										onCheckedChange={switchField.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					{[
						['strength', 'Strength', 'MEDICINE_STRENGTH'],
						['dose', 'Dose', 'MEDICINE_DOSE'],
						['duration', 'Duration', 'MEDICINE_DURATION'],
						['frequency', 'Frequency', 'MEDICINE_FREQUENCY'],
						['interval', 'Interval', 'MEDICINE_INTERVAL'],
						['take', 'Take', 'MEDICINE_TAKE'],
					].map(([name, label, option], i) => {
						return (
							<SelectField
								key={i}
								form={form}
								name={name as string}
								label={label as string}
								apiKey={option}
							/>
						);
					})}
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
