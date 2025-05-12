import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { calculateAge } from '../../../../../helpers/utils';
import useDocumentDownload from '../../../../../hooks/use-download-document';
import { queryClient } from '../../../../../services/providers';
import {
	type IPrescription,
	type IPrescriptionBasicDetails,
} from '../../../../../types/prescription';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useGetPrescriptionBasicDetails } from '../_api/use-get-details';
import { useShareDoc } from '../_api/use-share-doc';
import { useUpdatePrescription } from '../_api/use-update-prescription';
import { useUploadPrescription } from '../_api/use-upload-prescription';
import { useMedicineStore } from '../_store/medicine-store';
import selectedMedicines from '../_ui/medicines/selected-medicines';

export function useFooterActions() {
	const router = useRouter();
	const params = useParams();
	const prescriptionNo = params.precriptionNo as string;
	const { vitals, diagnosis, selectedMedicines, advice, follwup, reset } =
		useMedicineStore();

	const { mutateAsync: updatePrescription, isPending: isUpdating } =
		useUpdatePrescription(prescriptionNo);
	const { mutateAsync: uploadPrescription, isPending: isUploading } =
		useUploadPrescription(prescriptionNo);

	const { data: detailsData } =
		useGetPrescriptionBasicDetails(prescriptionNo);
	const basicDetails =
		detailsData?.data?.prescriptionBasicDetails ||
		({} as IPrescriptionBasicDetails);

	const { data: prescriptionData } = useGetPrescriptionById(prescriptionNo);
	const prescription = useMemo(() => {
		return prescriptionData?.data?.prescription || ({} as IPrescription);
	}, [prescriptionData?.data?.prescription]);
	const { url } = useDocumentDownload(prescription.url);
	const { mutateAsync: shareDoc } = useShareDoc(prescriptionNo);

	const isPrescriptionSaved = !!prescription.url;

	useEffect(() => {
		return reset;
	}, [reset]);
	console.log(selectedMedicines);

	const handleSave = async () => {
		const payload = {
			...basicDetails,
			medicines: selectedMedicines.map(
				({
					name,
					strength,
					interval,
					dose,
					frequency,
					duration,
					take,
					medicineId,
				}) => ({
					name,
					strength,
					interval,
					dose,
					frequency,
					duration,
					take,
					medicineId,
				})
			),
			...(diagnosis && { diagnosis }),
			...(vitals && { vitals }),
			...(advice && { advice }),
			...(follwup && { nextVisit: follwup }),
		};
		const response = await updatePrescription(payload);
		if (response.status === 'SUCCESS') {
			reset();
		}
	};

	const handleCreate = async () => {
		const response = await uploadPrescription();
		if (response?.status === 'SUCCESS') {
			reset();
			queryClient.invalidateQueries({
				queryKey: ['prescription/byNo', params.precriptionNo],
			});
		}
	};

	const handleCancel = () => {
		router.back();
	};

	const handleShare = () => {
		shareDoc({ type: 'PRESCRIPTION' });
	};

	return {
		isPrescriptionSaved,
		isUpdating,
		isUploading,
		handleSave,
		handleCreate,
		handleCancel,
		prescriptionUrl: url,
		handleShare,
	};
}
