'use client';

import { format } from 'date-fns';
import { useParams } from 'next/navigation';

import { Spinner } from '../../../../../../ui/shared';
import { useGetInvoiceById } from '../../../_api/get-invoice-byid';

export default function Header() {
	const params = useParams();
	const invoiceNo = params?.invoiceNo as string;
	const { data, isPending } = useGetInvoiceById(invoiceNo);
	const invoiceData = data?.data?.invoice || ({} as IInvoiceTypes.IInvoice);

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div>
			<h1 className="text-24 mb-24 text-center font-semibold">
				{invoiceNo}
			</h1>
			<div className="shadow-card1 rounded-12 flex flex-col gap-16 bg-white p-16">
				<div className="flex items-center gap-12">
					<div className="text-16 border-secondary border-b border-dashed">
						Invoice No:
					</div>
					<div className="font-medium">{invoiceNo}</div>
				</div>
				<div className="flex items-center gap-12">
					<div className="text-16 border-secondary border-b border-dashed">
						Invoice Date
					</div>
					<div className="font-medium">
						{format(invoiceData.invoiceDate, 'MMM dd, yyyy')}
					</div>
				</div>
			</div>
		</div>
	);
}
