'use client';

import { url } from 'inspector';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useGetDoctorSignature } from '../../../../../api/queries/use-doctor-signature';
import {
	type IDoctorDetails,
	type IPrescription,
	type IPrescriptionBasicDetails,
} from '../../../../../types/prescription';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useGetPrescriptionBasicDetails } from '../_api/use-get-details';

import useDocumentDownload from '@/hooks/use-download-document';

export default function Signature() {
	const params = useParams();
	const { data } = useGetPrescriptionBasicDetails(
		params?.precriptionNo as string
	);
	const basicData =
		data?.data?.prescriptionBasicDetails ||
		({} as IPrescriptionBasicDetails);
	const { data: prescriptionData } = useGetPrescriptionById(
		params?.precriptionNo as string
	);
	const prescription = useMemo(() => {
		return prescriptionData?.data?.prescription || ({} as IPrescription);
	}, [prescriptionData?.data?.prescription]);
	const isPrescriptionSaved = !!prescription.url;
	const doctorDetails = isPrescriptionSaved
		? prescription?.doctorDetails || ({} as IDoctorDetails)
		: basicData?.doctorDetails || ({} as IDoctorDetails);

	const { data: signatureData } = useGetDoctorSignature({
		doctorId: prescription?.doctorId,
	});
	const { url } = useDocumentDownload(
		prescription?.doctorDetails?.signatureUrl
	);

	return (
		<div className="flex flex-col items-end justify-center gap-12 pb-24">
			<img
				src={
					isPrescriptionSaved
						? url || signatureData?.data?.signatureUrl
						: signatureData?.data?.signatureUrl
				}
				className="h-[42px] w-[120px]"
			/>
			<div className="flex flex-col items-end justify-end">
				<p className="text-primary font-semibold">
					{doctorDetails?.name}
				</p>
				<p>{doctorDetails?.degree}</p>
				<p>Reg No: {doctorDetails?.regNo}</p>
			</div>
		</div>
	);
}
