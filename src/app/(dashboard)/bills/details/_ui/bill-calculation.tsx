import { useState } from 'react';

import { useItemStore } from '../_context/use-items';
import InvoiceDiscountForm from './invoice-discount-form';
import PaymentReceivedForm from './payments-received-form';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';

export function BillCalculation({
	subTotalAmount,
	totalItemDiscount,
	invoiceDiscount,
	paidAmount,
}: {
	subTotalAmount: number;
	totalItemDiscount: number;
	invoiceDiscount: number;
	paidAmount: number;
}) {
	const [tempInvoiceDiscount, setTempInvoiceDiscount] =
		useState(invoiceDiscount);
	const [tempPaidAmount, setTempPaidAmount] = useState(paidAmount);
	const [showInvoiceDialog, setInvoiceDialog] = useState(false);
	const [paymentsDialog, setPaymentsDialog] = useState(false);
	const totalPayable = useItemStore((s) => s.getTotalPayable());
	const balanceDue = useItemStore((s) => s.getBalanceDue());
	const items = useItemStore((s) => s.items);

	return (
		<div className="flex-1 flex flex-col items-end gap-2">
			<div className="flex justify-between flex-1 w-full">
				<div className="font-medium">Sub Total</div>
				<div className="font-bold">&#8377;{subTotalAmount}</div>
			</div>
			<div className="flex justify-between flex-1 w-full">
				<div className="font-medium">Discount on Items</div>
				<div className="font-bold">&#8377;{totalItemDiscount}</div>
			</div>
			<div className="flex justify-between items-end flex-1 w-full">
				<div className="font-medium flex items-center gap-1">
					<span>Invoice Discount</span>
					<button
						onClick={() => setInvoiceDialog(!showInvoiceDialog)}
						className="cursor-pointer text-primary font-extrabold text-xs"
						disabled={items.length === 0}
					>
						Update
					</button>
				</div>
				<div className="font-bold">&#8377;{invoiceDiscount}</div>
			</div>
			<div className="my-1 h-[1px] bg-neutral-300 w-full" />
			<div className="flex justify-between flex-1 w-full">
				<div className="font-medium">Total Payable Amount</div>
				<div className="font-bold">&#8377;{totalPayable}</div>
			</div>
			<div className="flex justify-between flex-1 w-full">
				<div className="font-medium flex items-center gap-1">
					<span>Payments Received</span>
					<button
						onClick={() => setPaymentsDialog(!paymentsDialog)}
						className="cursor-pointer text-primary font-extrabold text-xs"
						disabled={items.length === 0}
					>
						Update
					</button>
				</div>
				<div className="font-bold">&#8377;{paidAmount}</div>
			</div>
			<div className="flex justify-between flex-1 w-full">
				<div className="font-medium">Balance Due</div>
				<div className="font-bold">{balanceDue}</div>
			</div>
			<Dialog open={showInvoiceDialog} onOpenChange={setInvoiceDialog}>
				<DialogContent className="max-w-xl">
					<DialogHeader>
						<DialogTitle>Update Invoice Discount</DialogTitle>
						<DialogDescription>
							<span className="font-medium">
								Current Discount:
							</span>
							<span className="font-bold">
								&#8377;{tempInvoiceDiscount}
							</span>
						</DialogDescription>
					</DialogHeader>
					<InvoiceDiscountForm
						setTempInvoiceDiscount={setTempInvoiceDiscount}
						setInvoiceDialog={setInvoiceDialog}
						tempInvoiceDiscount={tempInvoiceDiscount}
					/>
				</DialogContent>
			</Dialog>
			<Dialog open={paymentsDialog} onOpenChange={setPaymentsDialog}>
				<DialogContent className="max-w-xl">
					<DialogHeader>
						<DialogTitle>Update Payments Received</DialogTitle>
						<DialogDescription>
							<span className="font-medium">Current price:</span>
							<span className="font-bold">
								&#8377;{tempPaidAmount}
							</span>
						</DialogDescription>
					</DialogHeader>
					<PaymentReceivedForm
						setTempPaidAmount={setTempPaidAmount}
						setPaymentsDialog={setPaymentsDialog}
						tempPaidAmount={tempPaidAmount}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
