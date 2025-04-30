'use client';

import { useParams } from 'next/navigation';

import { useGetPrescriptionById } from './_api/use-get-byid';
import { useGetPrescriptionBasicDetails } from './_api/use-get-details';

export default function Page() {
	const params = useParams();
	const { data } = useGetPrescriptionById(params?.precriptionNo as string);
	const { data: basicData } = useGetPrescriptionBasicDetails(
		params?.precriptionNo as string
	);

	return <div></div>;
}
