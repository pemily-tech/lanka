/* eslint-disable max-lines-per-function */
'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';

import useGetClinicLogo from '../../../../../api/get-clinic-logo';
import { calculateAge } from '../../../../../helpers/utils';
import {
	type IAddress,
	type IClinicDetails,
	type IDoctorDetails,
	type IPatientDetails,
	type IPrescription,
	type IPrescriptionBasicDetails,
} from '../../../../../types/prescription';
import { ImagePlaceholder, Spinner } from '../../../../../ui/shared';
import { useGetPrescriptionById } from '../_api/use-get-byid';
import { useGetPrescriptionBasicDetails } from '../_api/use-get-details';

export default function BasicDetails() {
	const params = useParams();
	const { data, isPending } = useGetPrescriptionBasicDetails(
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

	const clinicDetails = isPrescriptionSaved
		? prescription?.clinicDetails || ({} as IClinicDetails)
		: basicData?.clinicDetails || ({} as IClinicDetails);

	const clinicAddress = isPrescriptionSaved
		? prescription?.clinicAddress || ({} as IAddress)
		: basicData?.clinicAddress || ({} as IAddress);

	const patientDetails = isPrescriptionSaved
		? prescription?.patientDetails || ({} as IPatientDetails)
		: basicData?.patientDetails || ({} as IPatientDetails);

	const parentOrPatientAddress = isPrescriptionSaved
		? prescription?.parentOrPatientAddress || ({} as IAddress)
		: basicData?.parentOrPatientAddress || ({} as IAddress);

	const { data: logoData } = useGetClinicLogo();
	const clinicLogo = logoData?.data?.logoUrl;

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="flex flex-row gap-16 border-b pb-16">
			<div className="flex flex-1 flex-col gap-6 overflow-hidden">
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Doctor Name: </span>{' '}
					<span>Dr.{doctorDetails.name}</span>
				</div>
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Degree: </span>{' '}
					<span>{doctorDetails.degree}</span>
				</div>
				<div className="flex flex-row gap-6">
					<span>
						{doctorDetails.speciality}, {doctorDetails.experience}
					</span>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-6">
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Clinic Name: </span>{' '}
					<span>{clinicDetails.name}</span>
				</div>
				{clinicDetails.email && (
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Email: </span>{' '}
						<a
							className="hover:text-purple"
							href={`mailto:${clinicDetails.email}`}
						>
							{clinicDetails.email}
						</a>{' '}
					</div>
				)}
				{clinicDetails?.primaryContact && (
					<div className="flex flex-row">
						<span className="text-black-1/60 pr-6">Cell: </span>
						<a
							className="hover:text-purple"
							href={`tel:${clinicDetails.primaryContact}`}
						>
							+91-{clinicDetails.primaryContact}
						</a>
						{clinicDetails?.businessContact && (
							<a
								className="hover:text-purple"
								href={`tel:${clinicDetails.businessContact}`}
							>
								{', '} +91-
								{clinicDetails.businessContact}
							</a>
						)}
					</div>
				)}
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Address: </span>
					<span>
						{[
							clinicAddress.line1,
							clinicAddress.line2,
							clinicAddress.district,
							clinicAddress.state,
							clinicAddress.pincode,
						]
							.filter(Boolean)
							.join(', ')}
					</span>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-6">
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Patient: </span>{' '}
					<span>{patientDetails.name}</span>
				</div>
				{patientDetails.dob && (
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">DOB: </span>{' '}
						<span>{patientDetails.dob}</span>
					</div>
				)}
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Breed: </span>{' '}
					<span>{patientDetails.breed}</span>
				</div>
				{patientDetails.age && (
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Age: </span>{' '}
						<span>{calculateAge(patientDetails.age)}</span>
					</div>
				)}
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Address: </span>
					<span>
						{[
							parentOrPatientAddress.line1,
							parentOrPatientAddress.line2,
							parentOrPatientAddress.district,
							parentOrPatientAddress.state,
							parentOrPatientAddress.pincode,
						]
							.filter(Boolean)
							.join(', ')}
					</span>
				</div>
			</div>
			<div className="flex size-[152px] items-center justify-center">
				<div className="border-purple-1/20 size-[142px] rounded-full border-2 p-12">
					{clinicLogo && (
						<ImagePlaceholder
							src={clinicLogo as string}
							containerClasses="size-full"
							imageClasses="rounded-full object-contain"
						/>
					)}
				</div>
			</div>
		</div>
	);
}
