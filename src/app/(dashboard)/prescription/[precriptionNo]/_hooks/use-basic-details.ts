import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import useGetClinicLogo from '../../../../../api/get-clinic-logo';
import {
	type IPrescription,
	type IPrescriptionBasicDetails,
} from '../../../../../types/prescription';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useGetPrescriptionBasicDetails } from '../_api/use-get-details';

export function useBasicDetails() {
	const params = useParams();
	const prescriptionNo = params?.precriptionNo as string;

	const { data, isPending } = useGetPrescriptionBasicDetails(prescriptionNo);
	const basicData =
		data?.data?.prescriptionBasicDetails ??
		({} as IPrescriptionBasicDetails);

	const { data: prescriptionData } = useGetPrescriptionById(prescriptionNo);
	const prescription = useMemo(() => {
		return prescriptionData?.data?.prescription ?? ({} as IPrescription);
	}, [prescriptionData]);

	const isPrescriptionSaved = !!prescription.url;

	const doctorDetails = isPrescriptionSaved
		? (prescription.doctorDetails ?? {})
		: (basicData.doctorDetails ?? {});

	const clinicDetails = isPrescriptionSaved
		? (prescription.clinicDetails ?? {})
		: (basicData.clinicDetails ?? {});

	const clinicAddress = isPrescriptionSaved
		? (prescription.clinicAddress ?? {})
		: (basicData.clinicAddress ?? {});

	const patientDetails = isPrescriptionSaved
		? (prescription.patientDetails ?? {})
		: (basicData.patientDetails ?? {});

	const parentOrPatientAddress = isPrescriptionSaved
		? (prescription.parentOrPatientAddress ?? {})
		: (basicData.parentOrPatientAddress ?? {});

	const parentName = isPrescriptionSaved
		? (prescription.parentName ?? {})
		: (basicData.parentName ?? {});

	const parentMobile = isPrescriptionSaved
		? (prescription.parentMobile ?? {})
		: (basicData.parentMobile ?? {});

	const { data: logoData } = useGetClinicLogo();
	const clinicLogo = logoData?.data?.logoUrl;

	return {
		isPending,
		doctorDetails,
		clinicDetails,
		clinicAddress,
		patientDetails,
		parentOrPatientAddress,
		clinicLogo,
		parentName,
		parentMobile,
	};
}
