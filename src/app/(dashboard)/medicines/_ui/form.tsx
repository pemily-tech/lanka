'use client';

import {
	Button,
	FloatingInput,
	FloatingTextArea,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Switch,
} from '../../../../ui/shared';
import SelectField from './select';
import { useMedicineForm } from './use-form';

export function MedicineForm({ type }: { type: 'UPDATE' | 'CREATE' }) {
	const { form, onSubmit, isUpdaing, isCreating } = useMedicineForm(type);

	return (
		<div className="rounded-8 shadow-card1 col-span-2 bg-white p-16">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 gap-24"
				>
					{[
						['name', 'Name'],
						['brand', 'Brand'],
					].map(([name, label], i) => {
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
					{[
						['dose', 'Dose', 'MEDICINE_DOSE'],
						['duration', 'Duration', 'MEDICINE_DURATION'],
						['frequency', 'Frequency', 'MEDICINE_FREQUENCY'],
						['strength', 'Strength', 'MEDICINE_STRENGTH'],
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
					<FormField
						control={form.control}
						name="diagnosis"
						render={({ field: inputField, fieldState }) => (
							<FormItem className="relative col-span-1">
								<FormControl>
									<FloatingTextArea
										label="Diagnosis"
										id="diagnosis"
										isError={!!fieldState.error}
										{...inputField}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{type === 'UPDATE' && (
						<FormField
							control={form.control}
							name="active"
							render={({ field: switchField }) => (
								<FormItem className="flex flex-row items-center gap-12">
									<div className="space-y-2">
										<FormLabel className="text-14">
											Choose Active/InActive
										</FormLabel>
										<FormDescription>
											You have make the field
											Active/InActive
										</FormDescription>
									</div>
									<FormControl>
										<Switch
											checked={switchField.value}
											onCheckedChange={
												switchField.onChange
											}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)}
					<div className="col-span-2">
						<Button
							disabled={isCreating || isUpdaing}
							loading={isCreating || isUpdaing}
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
