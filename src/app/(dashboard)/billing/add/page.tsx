'use client';

import { type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import { Routes } from '../../../../helpers/routes';
import { SearchPetParents } from '../../../../ui/shared';
import { useCreateInvoice } from './_api/create-invoice';

export default function Index() {
	const router = useRouter();
	const { mutateAsync: createInvoice } = useCreateInvoice();
	const handleParent = async (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const target = (e.target as HTMLElement).closest(
			'[data-id]'
		) as HTMLElement;
		if (target && target.dataset.id) {
			const response = await createInvoice({
				parentId: target.dataset.id,
			});
			if (response.status === 'SUCCESS') {
				router.push(
					`${Routes.BILLING_DETAILS}/${response.data?.invoice.invoiceNo}`
				);
			}
		}
	};

	return (
		<div>
			<h1 className="text-24 mb-12 font-medium">
				Choose a Parent to proceed:
			</h1>
			<SearchPetParents handleParent={handleParent} />
		</div>
	);
}
