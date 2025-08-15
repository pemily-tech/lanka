'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { useItemStore } from '../../_context/use-items';
import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';
import { BillCalculation } from './bill-calculation';
import { useColumns } from './columns';
import SearchItemsModal from './search-items-modal';
import { ItemsTable } from './table';

import { type IInvoice } from '@/types/bills-items';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import { Skeleton } from '@/ui/skeleton';

export default function Items() {
	const params = useParams();
	const invoiceNo = params?.invoiceNo as string;
	const { data: invoiceData, isPending } = useGetInvoiceByNo(invoiceNo);
	const invoice = useMemo(() => {
		return invoiceData?.data?.invoice ?? ({} as IInvoice);
	}, [invoiceData]);
	const columns = useColumns();
	const [open, setOpen] = useState(false);
	const {
		items,
		subTotalAmount,
		totalItemDiscount,
		setAmount,
		invoiceDiscount,
		paidAmount,
		setItems,
	} = useItemStore();

	useEffect(() => {
		if (invoice) {
			setAmount({
				totalAmount: invoice.totalAmount ?? 0,
				totalItemDiscount: invoice.totalItemDiscount ?? 0,
				subTotalAmount: invoice.subTotalAmount ?? 0,
				invoiceDiscount: invoice.invoiceDiscount ?? 0,
				paidAmount: invoice.paidAmount ?? 0,
			});
		}
	}, [invoice]);

	useEffect(() => {
		if (invoice.items && invoice.items.length > 0) {
			setItems(invoice.items);
		}
	}, [invoice.items]);

	if (isPending) {
		return (
			<div className="bg-white p-4 rounded-xl shadow-md space-y-2 h-[420px]">
				<Skeleton className="h-6 w-92" />
				<Skeleton className="h-4 w-32" />
				<Skeleton className="h-4 w-42" />
			</div>
		);
	}

	return (
		<div className="shadow-md rounded-lg bg-white p-4">
			<h1 className="font-semibold mb-1 text-base">Item Details</h1>
			<p className="text-neutral-500">Details item with more info</p>
			<ItemsTable
				columns={columns}
				data={items}
				getRowId={(row) => row._id}
			/>
			<div className="flex mt-6">
				<div className="flex-1">
					<Dialog open={open} onOpenChange={() => setOpen(!open)}>
						<DialogTrigger asChild>
							<Button
								variant="plain"
								className="text-primary font-semibold hover:text-primary px-2"
								size="none"
							>
								Add Item
							</Button>
						</DialogTrigger>
						{open && <SearchItemsModal setOpen={setOpen} />}
					</Dialog>
				</div>
				<BillCalculation
					subTotalAmount={subTotalAmount}
					totalItemDiscount={totalItemDiscount}
					invoiceDiscount={invoiceDiscount}
					paidAmount={paidAmount}
				/>
			</div>
		</div>
	);
}
