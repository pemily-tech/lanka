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
	paymentReceived: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, {
			message:
				'Price must be a valid number with up to two decimal places',
		})
		.transform((val) => parseFloat(val))
		.refine((val) => val > 0, { message: 'Price must be greater than 0' }),
});

export default function PaymentReceivedForm({
	setTempPaidAmount,
	setPaymentsDialog,
	tempPaidAmount,
}: {
	setTempPaidAmount: (value: number) => void;
	setPaymentsDialog: (value: boolean) => void;
	tempPaidAmount: number;
}) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			paymentReceived: '',
		},
	});
	const { setPaidAmount } = useItemStore();
	const watchPaymentReceived = form.watch('paymentReceived');

	useEffect(() => {
		form.setValue('paymentReceived', tempPaidAmount.toString() ?? '');
	}, []);

	useEffect(() => {
		if (watchPaymentReceived) {
			setTempPaidAmount(Number(watchPaymentReceived));
		}
	}, [watchPaymentReceived, setTempPaidAmount]);

	const onSubmit = (data: { paymentReceived: number }) => {
		setPaidAmount(data.paymentReceived);
		setPaymentsDialog(false);
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
					name="paymentReceived"
					render={({ field, fieldState }) => (
						<FormItem className="relative w-full">
							<FormControl>
								<FloatingInput
									label="Enter your price"
									type="numeric"
									id="paymentReceived"
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
