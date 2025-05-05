'use client';

import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { type IPrescription } from '../../../../../types/prescription';
import { FloatingInput } from '../../../../../ui/shared';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useMedicineStore } from '../_store/medicine-store';

export default function AdviceFollowup() {
	const params = useParams();
	const { data } = useGetPrescriptionById(params?.precriptionNo as string);
	const prescriptionData = useMemo(() => {
		return data?.data?.prescription || ({} as IPrescription);
	}, [data?.data?.prescription]);
	const { advice, follwup, setAdvice, setFollowup } = useMedicineStore();

	useEffect(() => {
		if (prescriptionData?.advice) {
			setAdvice(prescriptionData?.advice);
		}

		if (prescriptionData?.nextVisit) {
			setFollowup(prescriptionData?.nextVisit);
		}
	}, [prescriptionData]);

	return (
		<div className="flex flex-1 flex-row gap-16 px-16 py-24">
			<div className="flex-1">
				<FloatingInput
					value={advice}
					label="Advice"
					id="advice"
					onChange={(e) => setAdvice(e.target.value)}
				/>
			</div>
			<div className="flex-1">
				<FloatingInput
					label="Follwup"
					id="follwup"
					value={follwup}
					onChange={(e) => setFollowup(e.target.value)}
				/>
			</div>
		</div>
	);
}
