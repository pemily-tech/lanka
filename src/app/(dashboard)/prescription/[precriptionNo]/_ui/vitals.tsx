'use client';

import { useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { type IPrescription } from '../../../../../types/prescription';
import { FloatingTextArea } from '../../../../../ui/text-area';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useMedicineStore } from '../_store/medicine-store';

export default function Vitals() {
	const params = useParams();
	const { data } = useGetPrescriptionById(params?.precriptionNo as string);
	const prescriptionData = useMemo(() => {
		return data?.data?.prescription || ({} as IPrescription);
	}, [data?.data?.prescription]);
	const { vitals, diagnosis, setVitals, setDiagnosis } = useMedicineStore();
	const isPrescriptionSaved = !!prescriptionData.url;

	useEffect(() => {
		if (prescriptionData.vitals) {
			setVitals(prescriptionData?.vitals);
		}

		if (prescriptionData.diagnosis) {
			setDiagnosis(prescriptionData?.diagnosis);
		}
	}, [prescriptionData]);

	return (
		<div className="flex flex-1 flex-row gap-4 px-4 py-6">
			<div className="flex-1">
				{isPrescriptionSaved ? (
					<div>
						<span>Diagnosis: {prescriptionData?.diagnosis}</span>
					</div>
				) : (
					<FloatingTextArea
						label="Diagnosis"
						id="diagnosis"
						value={diagnosis}
						onChange={(e) => setDiagnosis(e.target.value)}
					/>
				)}
			</div>
			<div className="flex-1">
				{isPrescriptionSaved ? (
					<div>
						<span>Vitals: {prescriptionData?.vitals}</span>
					</div>
				) : (
					<FloatingTextArea
						value={vitals}
						label="Vitals"
						id="vitals"
						onChange={(e) => setVitals(e.target.value)}
					/>
				)}
			</div>
		</div>
	);
}
