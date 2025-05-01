'use client';

import { useParams } from 'next/navigation';

import { useGetPrescriptionById } from './_api/use-get-byid';
import { useGetPrescriptionBasicDetails } from './_api/use-get-details';
import BasicDetails from './_ui/basic-details';

export default function Page() {
	const params = useParams();
	const { data } = useGetPrescriptionById(params?.precriptionNo as string);

	return (
		<div className="shadow-card1 rounded-lg bg-white p-16">
			<BasicDetails />
		</div>
	);
}
