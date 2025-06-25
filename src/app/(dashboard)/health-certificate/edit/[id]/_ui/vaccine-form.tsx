import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import z from 'zod';

import { useVaccineStore } from '../_store/use-vaccine';

import { DATE_FORMAT } from '@/helpers/constant';
import { type IVaccine } from '@/types/health-certificate';
import { Button } from '@/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { FloatingInput } from '@/ui/input';

const schema = z.object({
	batch: z.string().nonempty('Please choose a batch'),
	brand: z.string().nonempty('Please choose a brand'),
	name: z.string().optional(),
	givenOn: z.string().optional(),
});

type IFormData = z.infer<typeof schema>;

export function VaccineDialogForm({
	open,
	setOpen,
	original,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	original: IVaccine;
}) {
	const vaccines = useVaccineStore((s) => s.vaccines);
	const setVaccines = useVaccineStore((s) => s.setVaccines);
	const vaccineItem = vaccines.find((item) => item._id === original._id);
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			brand: vaccineItem?.brand ?? '',
			batch: vaccineItem?.batch ?? '',
			name: vaccineItem?.name ?? '',
			givenOn: vaccineItem?.givenOn ?? '',
		},
	});

	useEffect(() => {
		if (vaccineItem) {
			form.reset({
				brand: vaccineItem.brand ?? '',
				batch: vaccineItem.batch ?? '',
				name: vaccineItem?.name ?? '',
				givenOn: format(vaccineItem?.givenOn, DATE_FORMAT) ?? '',
			});
		}
	}, [vaccineItem, form]);

	const fields: {
		name: keyof IFormData | keyof IVaccine;
		label: string;
		disabled?: boolean;
	}[] = [
		{ name: 'name', label: 'Name', disabled: true },
		{ name: 'brand', label: 'Brand' },
		{ name: 'batch', label: 'Batch' },
		{ name: 'givenOn', label: 'Given On', disabled: true },
	];

	const onSubmit = async (values: IFormData) => {
		const newData = vaccines.map((vaccine) => {
			if (vaccine._id === vaccineItem?._id) {
				return {
					...vaccine,
					brand: values.brand,
					batch: values.batch,
				};
			}
			return vaccine;
		});
		setVaccines(newData);
	};

	return (
		<Dialog open={open} onOpenChange={() => setOpen(!open)}>
			<DialogContent className="max-w-[720px]">
				<DialogHeader className="border-b border-border">
					<DialogTitle>Update Vaccine</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-2 gap-6"
					>
						{fields.map(({ name, label, disabled }) => (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({ field, fieldState }) => (
									<FormItem>
										<FormControl>
											<FloatingInput
												label={label}
												id={name}
												disabled={disabled}
												isError={!!fieldState.error}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
						<Button variant="secondary">
							<span>Submit</span>
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
