'use client';

import { Button, Form } from '../../../../ui/shared';
import { fields } from './fields';
import { renderField } from './renderfield';
import { useMedicineForm } from './use-form';

export function MedicineForm() {
	const { form, onSubmit } = useMedicineForm();

	return (
		<div className="rounded-8 shadow-card1 col-span-2 bg-white p-16">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-24 grid grid-cols-2 gap-24"
				>
					{fields.map((field) => renderField(form, field))}
					<div className="col-span-2">
						<Button
							// disabled={isPending}
							// loading={isPending}
							loadingText="Creating Banner..."
							type="submit"
							className="w-[240px]"
						>
							Add
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
