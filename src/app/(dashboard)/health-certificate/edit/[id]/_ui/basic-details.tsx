/* eslint-disable max-lines-per-function */
'use client';

import { useBasicDetails } from '../_hooks/use-get-basic-details';

import { BlurImage } from '@/ui/blur-image';
import Spinner from '@/ui/spinner';

export default function BasicDetails() {
	const {
		isPending,
		clinicDetails,
		clinicAddress,
		patientDetails,
		parentOrPatientAddress,
		clinicLogo,
		parentMobile,
		parentName,
		certificateType,
	} = useBasicDetails();
	const typeOfCertificate = certificateType?.split('_').join(' ');

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="mx-6">
			<div className="flex flex-row justify-between gap-4 pb-4">
				<div className="flex flex-1 gap-6">
					<div className="flex size-[152px] items-center justify-center">
						<div className="border-secondary size-[142px] rounded-full border-2 p-4">
							{clinicLogo && (
								<BlurImage
									src={clinicLogo}
									className="size-full"
									width={240}
									height={240}
									imageClasses="rounded-full object-cover"
								/>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col gap-1">
						<div className="flex flex-row gap-1">
							<span className="font-semibold text-black/60">
								{clinicDetails.name}
							</span>
						</div>
						{clinicDetails.email && (
							<div className="flex flex-row gap-1">
								<span className="text-black/60">Email: </span>
								<a
									className="hover:text-purple"
									href={`mailto:${clinicDetails.email}`}
								>
									{clinicDetails.email}
								</a>
							</div>
						)}
						<div className="flex flex-row gap-1">
							<span className="text-black/60">Contact: </span>
							{(clinicDetails.primaryContact ||
								clinicDetails.businessContact) && (
								<a
									className="hover:text-purple"
									href={`tel:+91${
										clinicDetails.businessContact ||
										clinicDetails.primaryContact
									}`}
								>
									+91-
									{clinicDetails.businessContact ||
										clinicDetails.primaryContact}
								</a>
							)}
						</div>
						<div className="flex flex-row gap-1">
							<span className="text-black/60">Address: </span>
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
				</div>
				<div className="text-black/60">
					Certificate Type:{' '}
					<span className="text-black font-semibold">
						{typeOfCertificate}
					</span>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-3 border-y border-border py-3">
				<div className="flex gap-4">
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Owner Name: </span>
						<span>{parentName}</span>
					</div>
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Owner Phone: </span>
						<span>{parentMobile}</span>
					</div>
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Owner Address: </span>
						<span>
							{[
								parentOrPatientAddress?.line1,
								parentOrPatientAddress?.line2,
								parentOrPatientAddress?.district,
								parentOrPatientAddress?.state,
								parentOrPatientAddress?.pincode,
							]
								.filter(Boolean)
								.join(', ')}
						</span>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Pet Name: </span>
						<span>{patientDetails.name}</span>
					</div>
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Type: </span>
						<span>{patientDetails.type}</span>
					</div>
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Sex: </span>
						<span>{patientDetails.gender}</span>
					</div>
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Breed: </span>
						<span>{patientDetails.breed}</span>
					</div>
					<div className="flex flex-row gap-1">
						<span className="text-black/60">Code: </span>
						<span>{patientDetails.code}</span>
					</div>
					{patientDetails.dob && (
						<div className="flex flex-row gap-1">
							<span className="text-black/60">DOB: </span>
							<span>{patientDetails.dob}</span>
						</div>
					)}
					{patientDetails?.age && (
						<div className="flex flex-row gap-1">
							<span className="text-black/60">Age: </span>
							<span>{patientDetails.age}</span>
						</div>
					)}
					{patientDetails.microChipNo && (
						<div className="flex flex-row gap-1">
							<span className="text-black/60">
								MicroChip No:{' '}
							</span>
							<span>{patientDetails.microChipNo}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
