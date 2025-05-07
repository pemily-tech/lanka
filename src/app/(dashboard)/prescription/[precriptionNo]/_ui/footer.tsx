'use client';

import { Check, Plus, SendHorizonal, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { calculateAge } from '../../../../../helpers/utils';
import { queryClient } from '../../../../../services/providers';
import { type IPrescriptionBasicDetails } from '../../../../../types/prescription';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
} from '../../../../../ui/shared';
import { useGetPrescriptionBasicDetails } from '../_api/use-get-details';
import { useUpdatePrescription } from '../_api/use-update-prescription';
import { useUploadPrescription } from '../_api/use-upload-prescription';
import { useMedicineStore } from '../_store/medicine-store';

export default function Footer() {
	const router = useRouter();
	const params = useParams();
	const { mutate: updatePrescription, isPending } = useUpdatePrescription(
		params.precriptionNo as string
	);
	const { mutateAsync: uploadPrescription, isPending: isLoading } =
		useUploadPrescription(params.precriptionNo as string);
	const { data } = useGetPrescriptionBasicDetails(
		params?.precriptionNo as string
	);
	const basicPrescriptionData =
		data?.data?.prescriptionBasicDetails ||
		({} as IPrescriptionBasicDetails);
	const { vitals, diagnosis, selectedMedicines, advice, follwup } =
		useMedicineStore();

	const handleSave = async () => {
		const payload = {
			...basicPrescriptionData,
			patientDetails: {
				...basicPrescriptionData.patientDetails,
				age: calculateAge(basicPrescriptionData.patientDetails.dob),
			},
			medicines: selectedMedicines.map(
				({
					name,
					strength,
					interval,
					dose,
					frequency,
					duration,
					take,
				}) => ({
					name,
					strength,
					interval,
					dose,
					frequency,
					duration,
					take,
				})
			),
			...(diagnosis && { diagnosis }),
			...(vitals && { vitals }),
			...(advice && { advice }),
			...(follwup && { nextVisit: follwup }),
		};
		updatePrescription(payload);
	};

	const handleCreate = async () => {
		const response = await uploadPrescription();
		if (response?.status === 'SUCCESS') {
			queryClient.invalidateQueries({
				queryKey: ['prescription/byNo', params.precriptionNo],
			});
		}
	};

	return (
		<div className="mt-16 flex items-center justify-end gap-16 border-t py-16">
			<Button
				loading={isPending}
				disabled={selectedMedicines.length === 0 || isPending}
				onClick={handleSave}
				className="min-w-[160px] !rounded-2xl"
			>
				<Check className="size-16" />
				<span className="font-normal">Save Prescription</span>
			</Button>
			<Button
				loading={isLoading}
				disabled={selectedMedicines.length === 0 || isLoading}
				onClick={handleCreate}
				variant="secondary"
				className="min-w-[160px] !rounded-2xl"
			>
				<Plus className="size-16" />
				<span className="font-normal">Create Prescription</span>
			</Button>
			<Button
				disabled={selectedMedicines.length === 0}
				className="min-w-[120px] !rounded-2xl"
				variant="outline"
			>
				<SendHorizonal className="size-16" />
				<span className="font-normal">Share Prescription</span>
			</Button>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="outline"
						className="bg-black-1/20 min-w-[120px] !rounded-2xl"
					>
						<X className="size-16" />
						<span className="font-normal">Cancel</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-24">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-24">
							Cancel
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to cancel this prescription?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-32">
						<AlertDialogAction
							onClick={() => router.back()}
							className="px-24"
						>
							Confirm
						</AlertDialogAction>
						<AlertDialogCancel>
							<span className="text-14">Cancel</span>
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
