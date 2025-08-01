'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';
import { useColumns } from './columns';
import { ItemsTable } from './table';

import { type IInvoice } from '@/types/bills-items';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import Spinner from '@/ui/spinner';

const SearchItemsModal = dynamic(() => import('./search-items-modal'), {
	loading: () => <Spinner />,
	ssr: false,
});

export default function Items() {
	const params = useParams();
	const invoiceNo = params?.invoiceNo as string;
	const { data: invoiceData, isPending } = useGetInvoiceByNo(invoiceNo);
	const invoice = useMemo(() => {
		return invoiceData?.data?.invoice ?? ({} as IInvoice);
	}, [invoiceData]);
	const columns = useColumns();
	const [open, setOpen] = useState(false);

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="shadow-md rounded-lg bg-white p-4">
			<h1 className="font-semibold mb-1 text-base">Item Details</h1>
			<p className="text-neutral-500">Details item with more info</p>
			<ItemsTable
				columns={columns}
				data={invoice?.items}
				getRowId={(row) => row._id}
			/>
			<div className="flex">
				<div className="flex-1">
					<Dialog open={open} onOpenChange={() => setOpen(!open)}>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								className="text-primary font-semibold hover:text-primary"
							>
								Add Item
							</Button>
						</DialogTrigger>
						{open && <SearchItemsModal />}
					</Dialog>
				</div>
				<div className="flex-1 flex flex-col items-end mt-2 gap-2">
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Sub Total</div>
						<div className="font-bold">100</div>
					</div>
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Discount</div>
						<div className="font-bold">100</div>
					</div>
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Invoice Discount</div>
						<div className="font-bold">100</div>
					</div>
					<div className="my-1 h-[1px] bg-neutral-300 w-full" />
					<div className="flex justify-between flex-1 w-full">
						<div className="font-medium">Total Payable Amount</div>
						<div className="font-bold">100</div>
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
