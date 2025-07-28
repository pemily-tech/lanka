'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';

import { type IInvoice } from '@/types/bills-items';

export default function Items() {
	const params = useParams();
	const invoiceNo = params?.invoiceNo as string;
	const { data: invoiceData } = useGetInvoiceByNo(invoiceNo);
	const invoice = useMemo(() => {
		return invoiceData?.data?.invoice ?? ({} as IInvoice);
	}, [invoiceData]);

	return (
		<div className="shadow-md rounded-lg bg-white p-4">
			{/* Items component content goes here */}
			<p>Items will be displayed here.</p>
		</div>
	);
}
