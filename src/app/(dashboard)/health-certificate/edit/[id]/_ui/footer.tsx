'use client';

import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';

import { useGetCertificateBasicDetails } from '../_api/use-get-basic-details';
import { useGetCertificateById } from '../_api/use-get-byid';
import { useUpdateCertificate } from '../_api/use-update-certificate';
import { useVaccineStore } from '../_store/use-vaccine';

import { AppConstants } from '@/helpers/primitives';
import { queryClient } from '@/services/providers';
import {
	type ICertificate,
	type ICertificateBasicDetails,
} from '@/types/health-certificate';
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
} from '@/ui/alert';
import { Button } from '@/ui/button';

export default function Footer() {
	const params = useParams();
	const certificateNo = params?.id as string;
	const { data } = useGetCertificateById(certificateNo);
	const certificateData = data?.data?.certificate || ({} as ICertificate);
	const { data: basicData } = useGetCertificateBasicDetails(certificateNo);
	const certificateBasicDetails =
		basicData?.data?.certificateBasicDetails ??
		({} as ICertificateBasicDetails);

	const vaccines = useVaccineStore((s) => s.vaccines);
	const { mutateAsync: updateCertificate, isPending } =
		useUpdateCertificate(certificateNo);

	const handleSave = async () => {
		const payload = {
			parentName: certificateBasicDetails.parentName,
			parentMobile: certificateBasicDetails.parentMobile,
			patientName: certificateBasicDetails.patientName,
			patientDetails: certificateBasicDetails.patientDetails,
			clinicDetails: certificateBasicDetails.clinicDetails,
			clinicAddress: certificateBasicDetails.clinicAddress,
			parentOrPatientAddress: certificateData.parentOrPatientAddress,
			template: certificateBasicDetails.template,
			vaccines: vaccines.map(
				({ name, brand, batch, givenOn, dueDate }) => {
					return {
						name,
						brand,
						batch,
						givenOn,
						dueDate,
					};
				}
			),
		};
		const response = await updateCertificate(payload);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: ['certificate/basicDetails', certificateNo],
			});
			queryClient.invalidateQueries({
				queryKey: ['certificate/byNo', certificateNo],
			});
		}
	};

	return (
		<div className="mt-4 mx-6 flex items-center justify-end gap-4 border-t border-border py-4">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						loading={isPending}
						// disabled={isPrescriptionSaved || isUpdating}
						className="min-w-[120px] !rounded-2xl"
					>
						<Check className="size-4" />
						<span className="font-normal">Save</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-6">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl">
							Are you sure you want to save this certificate?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Once saved you will not be able to edit this
							certificate.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-2">
						<AlertDialogAction
							onClick={handleSave}
							className="px-6"
							variant="secondary"
						>
							Confirm
						</AlertDialogAction>
						<AlertDialogCancel>
							<span className="px-6 text-sm">Cancel</span>
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
