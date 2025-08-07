import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import z from 'zod';

import { useItemStore } from '../_context/use-items';

import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { FloatingInput } from '@/ui/input';

const schema = z.object({
	invoiceDiscount: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, {
			message:
				'Price must be a valid number with up to two decimal places',
		})
		.transform((val) => parseFloat(val))
		.refine((val) => val > 0, { message: 'Price must be greater than 0' }),
});

export default function InvoiceDiscountForm({
	setTempInvoiceDiscount,
	setInvoiceDialog,
	tempInvoiceDiscount,
}: {
	setTempInvoiceDiscount: (value: number) => void;
	setInvoiceDialog: (value: boolean) => void;
	tempInvoiceDiscount: number;
}) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			invoiceDiscount: '',
		},
	});
	const { setInvoiceDiscount } = useItemStore();
	const watchInvoiceDiscount = form.watch('invoiceDiscount');

	useEffect(() => {
		form.setValue('invoiceDiscount', tempInvoiceDiscount.toString() ?? '');
	}, []);

	useEffect(() => {
		if (watchInvoiceDiscount) {
			setTempInvoiceDiscount(Number(watchInvoiceDiscount));
		}
	}, [watchInvoiceDiscount, setTempInvoiceDiscount]);

	const onSubmit = (data: { invoiceDiscount: number }) => {
		setInvoiceDiscount(data.invoiceDiscount);
		setInvoiceDialog(false);
		form.reset();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex items-center gap-2 w-full mt-4 mb-8"
			>
				<FormField
					control={form.control as any}
					name="invoiceDiscount"
					render={({ field, fieldState }) => (
						<FormItem className="relative w-full">
							<FormControl>
								<FloatingInput
									label="Enter your invoice discount"
									type="numeric"
									id="invoiceDiscount"
									isError={!!fieldState.error}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="size-12 rounded-xl"
					size="icon"
				>
					<Send />
				</Button>
			</form>
		</Form>
	);
}
