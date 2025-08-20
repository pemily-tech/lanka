'use client';

import { useMemo } from 'react';
import { Download, Eye, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useItemStore } from '../../_context/use-items';
import { useGetInvoiceBasicDetails } from '../_api/use-get-basic-details';
import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';
import { useCreateInvoice } from '../_api/use-save-invoice';

import { env } from '@/env.mjs';
import useDocumentDownload from '@/hooks/use-download-document';
import {
	type IBillAddress,
	type IInvoice,
	type IInvoiceBasicDetails,
} from '@/types/bills-items';
import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';

const addressFields: (keyof IBillAddress)[] = [
	'line1',
	'line2',
	'district',
	'state',
	'pincode',
];

export function BilledBy() {
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
	const { mutateAsync: saveInvoice, isPending: isSaving } =
		useCreateInvoice(invoiceNo);
	const { url } = useDocumentDownload(invoice?.url);

	const {
		items,
		paidAmount,
		getBalanceDue,
		getTotalPayable,
		subTotalAmount,
		invoiceDiscount,
		totalItemDiscount,
	} = useItemStore();
	const balanceDue = getBalanceDue();

	const handleSave = async () => {
		const payload = {
			...basicDetails,
			items: items.map(({ createdAt, updatedAt, ...rest }) => rest),
			totalAmount: getTotalPayable(),
			paidAmount,
			dueAmount: balanceDue,
			totalDiscount: parseFloat(
				(totalItemDiscount + invoiceDiscount).toFixed(2)
			),
			invoiceDiscount: invoiceDiscount,
			totalItemDiscount,
			subTotalAmount,
		};
		await saveInvoice(payload);
	};

	if (isLoading || isPending) {
		return (
			<div className="flex flex-col gap-6">
				<div className="space-y-2 bg-white p-4 rounded-xl shadow-md w-full">
					<Skeleton className="h-4 w-56" />
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-4 w-92" />
				</div>
				<div className="bg-white p-4 rounded-xl shadow-md space-y-4">
					<Skeleton className="h-6 w-32" />
					<div className="flex gap-4">
						<Skeleton className="h-14 w-full" />
						<Skeleton className="h-14 w-full" />
					</div>
					<Skeleton className="h-14 w-full" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="bg-white p-4 rounded-xl shadow-md">
				<h1 className="font-semibold mb-2 text-base">Billed By</h1>
				<div className="flex flex-col gap-1 text-gray-600">
					<div>{basicDetails.billByName}</div>
					<div>{basicDetails.billByMobile}</div>
					<div className="flex">
						{basicDetails?.billByAddress &&
							addressFields.map((field, index) => {
								return (
									<div key={field}>
										{basicDetails.billByAddress[field]}
										{index < addressFields.length - 1 &&
											', '}
									</div>
								);
							})}
					</div>
				</div>
			</div>
			<div className="bg-white p-4 rounded-xl shadow-md">
				<h2 className="font-semibold mb-4 text-base">Actions</h2>
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						<Button
							disabled={isSaving || items.length === 0}
							size="lg"
							variant="link"
							className="flex-1"
						>
							<Eye />
							<span>Preview</span>
						</Button>
						<Button
							disabled={
								isSaving || !invoice.url || items.length === 0
							}
							size="lg"
							variant="link"
							className="flex-1"
						>
							<Link
								className="flex gap-2 items-center"
								href={url || ''}
							>
								<Download />
								<span>Download</span>
							</Link>
						</Button>
					</div>
					<Button
						disabled={isSaving || items.length === 0}
						onClick={handleSave}
						variant="secondary"
						size="lg"
					>
						<Save />
						<span>Save PDF</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
