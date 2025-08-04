'use client';

import { useMemo, useState } from 'react';
import { Pencil, SendHorizonal } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';
import { useItemStore } from '../_context/use-items';
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
	const { items, subTotalAmount, totalAmount, totalItemDiscount } =
		useItemStore();
	const [discount, setDiscount] = useState('');
	const [showDiscount, toggleDiscount] = useState(false);

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
				<div className="flex-1 flex flex-col items-end gap-2">
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Sub Total</div>
						<div className="font-bold">&#8377;{subTotalAmount}</div>
					</div>
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Discount on Items</div>
						<div className="font-bold">
							&#8377;{totalItemDiscount}
						</div>
					</div>
					<div className="flex justify-between items-end flex-1 w-full">
						<div className="font-medium">Invoice Discount</div>
						<div className="">
							{showDiscount ? (
								<div className="flex gap-3">
									<input
										className="border-b border-neutral-500 outline-none text-right w-24"
										value={discount}
										onChange={(e) =>
											setDiscount(e.target.value)
										}
									/>
									<Button size="icon" variant="secondary">
										<SendHorizonal />
									</Button>
								</div>
							) : (
								<div>
									<button
										onClick={() =>
											toggleDiscount(!showDiscount)
										}
										className=""
									>
										<Pencil className="size-4" />
									</button>
								</div>
							)}
						</div>
					</div>
					<div className="my-1 h-[1px] bg-neutral-300 w-full" />
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Total Payable Amount</div>
						<div className="font-bold">&#8377;{totalAmount}</div>
					</div>
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Payments Received</div>
						<div className="font-bold">100</div>
					</div>
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Balance Due</div>
						<div className="font-bold">100</div>
					</div>
				</div>
			</div>
		</div>
	);
}
