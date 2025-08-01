'use client';

import { useMemo } from 'react';
import { Download, Eye, Save } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useGetInvoiceBasicDetails } from '../_api/use-get-basic-details';
import { useGetInvoiceByNo } from '../_api/use-get-invoice-byno';

import {
	type IBillAddress,
	type IInvoice,
	type IInvoiceBasicDetails,
} from '@/types/bills-items';
import { Button } from '@/ui/button';
import Spinner from '@/ui/spinner';

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

	if (isPending || isLoading) {
		return <Spinner />;
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
						<Button size="lg" variant="link" className="flex-1">
							<Eye />
							<span>Preview</span>
						</Button>
						<Button size="lg" variant="link" className="flex-1">
							<Download />
							<span>Download</span>
						</Button>
					</div>
					<Button variant="secondary" size="lg">
						<Save />
						<span>Save PDF</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
