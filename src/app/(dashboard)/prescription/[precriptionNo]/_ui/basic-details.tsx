/* eslint-disable max-lines-per-function */
'use client';

import { ImagePlaceholder, Spinner } from '../../../../../ui/shared';
import { useBasicDetails } from '../_hooks/use-basic-details';

export default function BasicDetails() {
	const {
		isPending,
		doctorDetails,
		clinicDetails,
		clinicAddress,
		patientDetails,
		parentOrPatientAddress,
		clinicLogo,
		parentMobile,
		parentName,
	} = useBasicDetails();

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div>
			<div className="flex flex-row justify-between gap-16  pb-16">
				<div className="flex flex-1 gap-24">
					<div className="flex size-[152px] items-center justify-center">
						<div className="border-purple-1/20 size-[142px] rounded-full border-2 p-4">
							{clinicLogo && (
								<ImagePlaceholder
									src={clinicLogo}
									containerClasses="size-full"
									imageClasses="rounded-full object-cover"
								/>
							)}
						</div>
					</div>
					<div className="flex flex-1 flex-col gap-6">
						<div className="flex flex-row gap-6">
							<span className="text-black-1/60">
								Clinic Name:{' '}
							</span>
							<span>{clinicDetails.name}</span>
						</div>
						{clinicDetails.email && (
							<div className="flex flex-row gap-6">
								<span className="text-black-1/60">Email: </span>
								<a
									className="hover:text-purple"
									href={`mailto:${clinicDetails.email}`}
								>
									{clinicDetails.email}
								</a>
							</div>
						)}
						<div className="flex flex-row">
							<span className="text-black-1/60 pr-6">
								Contact:{' '}
							</span>
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
				</div>
				<div className="flex flex-1 flex-col items-end gap-2 overflow-hidden">
					<span className="text-black-1/60">
						Doctor Name:{' '}
						<span className="text-black">{doctorDetails.name}</span>
					</span>
					<span className="text-black-1/60">
						Reg No:{' '}
						<span className="text-black">
							{doctorDetails.regNo}
						</span>
					</span>
					<span className="text-black">
						{doctorDetails.degree},{doctorDetails.speciality},
						{doctorDetails.experience}
					</span>
				</div>
			</div>
			<div className="flex flex-1 flex-col gap-12 border-y py-12">
				<div className="flex gap-16">
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Owner Name: </span>
						<span>{parentName}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Owner Phone: </span>
						<span>{parentMobile}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Owner Address: </span>
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
				<div className="flex gap-16">
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Patient: </span>
						<span>{patientDetails.name}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Type: </span>
						<span>{patientDetails.type}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Sex: </span>
						<span>{patientDetails.gender}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Breed: </span>
						<span>{patientDetails.breed}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Code: </span>
						<span>{patientDetails.code}</span>
					</div>
					{patientDetails.dob && (
						<div className="flex flex-row gap-6">
							<span className="text-black-1/60">DOB: </span>
							<span>{patientDetails.dob}</span>
						</div>
					)}
					{patientDetails?.age && (
						<div className="flex flex-row gap-6">
							<span className="text-black-1/60">Age: </span>
							<span>{patientDetails.age}</span>
						</div>
					)}
					{patientDetails.microChipNo && (
						<div className="flex flex-row gap-6">
							<span className="text-black-1/60">
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
