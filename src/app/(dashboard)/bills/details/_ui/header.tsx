'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

import { useGetInvoiceBasicDetails } from '../_api/use-get-basic-details';
import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';

import { DATE_FORMAT } from '@/helpers/constant';
import { type IInvoice, type IInvoiceBasicDetails } from '@/types/bills-items';
import { Skeleton } from '@/ui/skeleton';
import Spinner from '@/ui/spinner';

export function Header() {
	const params = useParams();
	const invoiceNo = params?.invoiceNo as string;
	const { data, isPending } = useGetInvoiceBasicDetails(invoiceNo);
	const basicDetails = useMemo(() => {
		return data?.data?.invoiceBasicDetails ?? ({} as IInvoiceBasicDetails);
	}, [data]);
	const { data: invoiceData, isPending: isLoading } =
		useGetInvoiceByNo(invoiceNo);
	const invoice = useMemo(() => {
		return invoiceData?.data?.invoice ?? ({} as IInvoice);
	}, [invoiceData]);

	if (isLoading || isPending) {
		return (
			<div className="flex justify-between bg-white p-4 rounded-xl shadow-md">
				<div className="space-y-2">
					<Skeleton className="h-6 w-56" />
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-4 w-42" />
				</div>
				<div className="space-y-2 flex flex-col items-end">
					<Skeleton className="h-6 w-56" />
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-4 w-42" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-between bg-white p-4 rounded-xl shadow-md">
			<div className="flex-1">
				<h1 className="font-semibold mb-2 text-base">Invoice Number</h1>
				<div className="flex flex-col gap-1 text-gray-600">
					<div>{invoiceNo}</div>
					<div>
						Issued Date: {format(invoice.invoiceDate, DATE_FORMAT)}
					</div>
				</div>
			</div>
			<div className="flex-1 flex flex-col items-end">
				<h1 className="font-semibold mb-2 text-base">Billed To</h1>
				<div className="flex flex-col gap-1 text-gray-600 items-end">
					<div>{basicDetails.billToName}</div>
					<div>{basicDetails.billToMobile}</div>
				</div>
			</div>
		</div>
	);
}
