'use client';

import { useMemo } from 'react';
import { format } from 'date-fns';
import { useParams } from 'next/navigation';

import { DATE_FORMAT } from '../../../../../helpers/constant';
import { type IPrescription } from '../../../../../types/prescription';
import { useGetPrescriptionById } from '../_api/use-get-byid';

export default function Header() {
	const params = useParams();
	const prescriptionNo = params?.precriptionNo as string;
	const { data: prescriptionData } = useGetPrescriptionById(prescriptionNo);
	const prescription = useMemo(() => {
		return prescriptionData?.data?.prescription ?? ({} as IPrescription);
	}, [prescriptionData]);

	return (
		<div className="mb-16 flex items-center justify-between">
			<div className="flex items-center gap-6">
				<span className="text-black-1/60">RX No: </span>
				<span className="text-lg font-medium">{prescriptionNo}</span>
			</div>
			<div className="flex items-center gap-6">
				<span className="text-black-1/60">Date: </span>
				{prescription?.prescriptionDate && (
					<span className="text-lg font-medium">
						{format(prescription?.prescriptionDate, DATE_FORMAT)}
					</span>
				)}
			</div>
		</div>
	);
}
