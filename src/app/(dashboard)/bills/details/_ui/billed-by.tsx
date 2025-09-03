/* eslint-disable max-lines-per-function */
'use client';

import { useMemo } from 'react';
import { Download, Save, SendHorizonal } from 'lucide-react';
import { useParams } from 'next/navigation';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../../../../ui/alert';
import { useItemStore } from '../../_context/use-items';
import { useGetInvoiceBasicDetails } from '../_api/use-get-basic-details';
import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';
import { useCreateInvoice } from '../_api/use-save-invoice';
import { useShareInvoice } from '../_api/use-share-invoice';
import { ClinicLogo } from './clinic-logo';

import { AppConstants } from '@/helpers/primitives';
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
	const {
		data: invoiceData,
		isPending: isLoading,
		refetch,
	} = useGetInvoiceByNo(invoiceNo);
	const invoice = useMemo(() => {
		return invoiceData?.data?.invoice ?? ({} as IInvoice);
	}, [invoiceData]);
	const { mutateAsync: saveInvoice, isPending: isSaving } =
		useCreateInvoice(invoiceNo);
	const { url } = useDocumentDownload(invoice?.url);
	const { mutateAsync: shareInvoice } = useShareInvoice(invoiceNo);

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
		const response = await saveInvoice(payload);
		if (response.status === AppConstants.Success) {
			refetch();
			useItemStore.getState().reset();
		}
	};

	const handleShare = () => {
		shareInvoice();
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
				<div className="flex justify-between gap-4">
					<div className="flex flex-col gap-1 text-gray-600">
						<h1 className="font-semibold mb-2 text-base">
							Billed By
						</h1>
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
					<ClinicLogo />
				</div>
			</div>
			<div className="bg-white p-4 rounded-xl shadow-md">
				<h2 className="font-semibold mb-4 text-base">Actions</h2>
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									disabled={
										isSaving ||
										!invoice.url ||
										items.length === 0 ||
										!invoice.active
									}
									size="lg"
									variant="link"
									className="flex-1"
								>
									<SendHorizonal className="size-4" />
									<span>Share</span>
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent className="gap-6">
								<AlertDialogHeader>
									<AlertDialogTitle className="text-2xl">
										Share Invoice via WhatsApp?
									</AlertDialogTitle>
									<AlertDialogDescription>
										This invoice will be shared with the pet
										parent via WhatsApp on their registered
										mobile number (as mentioned in the
										Invoice).
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter className="!pt-2">
									<AlertDialogAction
										onClick={handleShare}
										className="bg-secondary hover:bg-secondary/90 px-6 text-white hover:text-white"
									>
										Confirm
									</AlertDialogAction>
									<AlertDialogCancel className="bg-transparent px-6 hover:bg-transparent">
										<span className="text-sm font-normal text-black">
											Cancel
										</span>
									</AlertDialogCancel>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						<Button
							disabled={
								isSaving || !invoice.url || items.length === 0
							}
							size="lg"
							variant="link"
							className="flex-1"
							onClick={() => window.open(url ?? '')}
						>
							<Download />
							<span>View/Download</span>
						</Button>
					</div>
					<Button
						disabled={
							isSaving || items.length === 0 || !invoice.active
						}
						onClick={handleSave}
						variant="secondary"
						size="lg"
					>
						<Save />
						<span className="text-sm font-bold">
							Create/Update Invoice
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
