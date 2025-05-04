'use client';

import { useParams } from 'next/navigation';

import { useGetPrescriptionById } from './_api/use-get-byid';
import BasicDetails from './_ui/basic-details';
import Medicines from './_ui/medicines';

export default function Page() {
	const params = useParams();
	const { data } = useGetPrescriptionById(params?.precriptionNo as string);

	return (
		<div className="shadow-card1 rounded-lg bg-white p-16">
			<BasicDetails />
			<div className="grid grid-cols-6">
				<div className="col-span-2"></div>
				<div className="col-span-4">
					<Medicines />
				</div>
			</div>
		</div>
	);
}
