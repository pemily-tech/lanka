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
		calculatedAge,
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
							<span className="text-black-1/60 pr-6">Cell: </span>
							{(clinicDetails.primaryContact ||
								clinicDetails.businessContact) && (
								<a
									className="hover:text-purple"
									href={`tel:+91${
										clinicDetails.primaryContact ||
										clinicDetails.businessContact
									}`}
								>
									+91-
									{clinicDetails.primaryContact ||
										clinicDetails.businessContact}
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
				<div className="flex flex-1 flex-col items-end gap-6 overflow-hidden">
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Doctor Name: </span>
						<span>Dr.{doctorDetails.name}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Degree: </span>
						<span>{doctorDetails.degree}</span>
					</div>
					<div className="flex flex-row gap-6">
						<span>
							{doctorDetails.speciality},{' '}
							{doctorDetails.experience}
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-1 flex-row gap-24 border-y py-12">
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Patient: </span>
					<span>{patientDetails.name}</span>
				</div>
				{patientDetails.dob && (
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">DOB: </span>
						<span>{patientDetails.dob}</span>
					</div>
				)}
				<div className="flex flex-row gap-6">
					<span className="text-black-1/60">Breed: </span>
					<span>{patientDetails.breed}</span>
				</div>
				{calculatedAge && (
					<div className="flex flex-row gap-6">
						<span className="text-black-1/60">Age: </span>
						<span>{patientDetails.age}</span>
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
		</div>
	);
}
