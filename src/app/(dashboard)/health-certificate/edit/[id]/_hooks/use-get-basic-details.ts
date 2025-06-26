import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useGetCertificateBasicDetails } from '../_api/use-get-basic-details';
import { useGetCertificateById } from '../_api/use-get-byid';

import { useGetClinicLogo } from '@/api/queries/use-get-clinic-logo';
import useDocumentDownload from '@/hooks/use-download-document';
import {
	type ICertificate,
	type ICertificateBasicDetails,
} from '@/types/health-certificate';

export function useBasicDetails() {
	const params = useParams();
	const certificateNo = params?.id as string;

	const { data, isPending } = useGetCertificateBasicDetails(certificateNo);
	const basicData =
		data?.data?.certificateBasicDetails ?? ({} as ICertificateBasicDetails);

	const { data: certificateData } = useGetCertificateById(certificateNo);
	const certificate = useMemo(() => {
		return certificateData?.data?.certificate ?? ({} as ICertificate);
	}, [certificateData]);

	const isPrescriptionSaved = !!certificate.url;

	const clinicDetails = isPrescriptionSaved
		? (certificate.clinicDetails ?? {})
		: (basicData.clinicDetails ?? {});

	const clinicAddress = isPrescriptionSaved
		? (certificate.clinicAddress ?? {})
		: (basicData.clinicAddress ?? {});

	const patientDetails = isPrescriptionSaved
		? (certificate.patientDetails ?? {})
		: (basicData.patientDetails ?? {});

	const parentOrPatientAddress = isPrescriptionSaved
		? (certificate.parentOrPatientAddress ?? {})
		: (basicData.patientDetails ?? {});

	const parentName = isPrescriptionSaved
		? (certificate.parentName ?? '')
		: (basicData.parentName ?? '');

	const parentMobile = isPrescriptionSaved
		? (certificate.parentMobile ?? '')
		: (basicData.parentMobile ?? '');

	const { data: logoData } = useGetClinicLogo();
	const clinicLogo = logoData?.data?.logoUrl;
	const { url } = useDocumentDownload(
		certificate?.clinicDetails?.logoUrl,
		true
	);

	return {
		isPending,
		clinicDetails,
		clinicAddress,
		patientDetails,
		parentOrPatientAddress,
		clinicLogo: isPrescriptionSaved ? url : clinicLogo,
		parentName,
		parentMobile,
		certificateType: certificate.type,
	};
}
