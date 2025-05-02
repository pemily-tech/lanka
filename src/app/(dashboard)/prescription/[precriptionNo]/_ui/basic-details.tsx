import { format } from 'date-fns';
import { useParams } from 'next/navigation';

import {
	type IClinicDetails,
	type IDoctorDetails,
	type IPatientDetails,
	type IPrescriptionBasicDetails,
} from '../../../../../types/prescription';
import { ImagePlaceholder, Spinner } from '../../../../../ui/shared';
import { useGetPrescriptionBasicDetails } from '../_api/use-get-details';

export default function BasicDetails() {
	const params = useParams();
	const { data, isPending } = useGetPrescriptionBasicDetails(
		params?.precriptionNo as string
	);
	const basicData =
		data?.data?.prescriptionBasicDetails ||
		({} as IPrescriptionBasicDetails);
	const doctorDetails = basicData?.doctorDetails || ({} as IDoctorDetails);
	const clinicDetails = basicData?.clinicDetails || ({} as IClinicDetails);
	const patientDetails = basicData?.patientDetails || ({} as IPatientDetails);

	if (isPending) {
		return <Spinner />;
	}

	return (
		<div className="flex flex-col gap-16">
			<div className="flex items-center justify-between gap-16">
				<div className="flex flex-1 flex-col gap-16">
					<div className="flex flex-col gap-2">
						<div className="text-purple text-16 font-semibold">
							Dr.{doctorDetails.name}
						</div>
						<div>{doctorDetails.degree}</div>
						<div>
							{doctorDetails.speciality},{' '}
							{doctorDetails.experience}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div>{clinicDetails.name}</div>
						{clinicDetails.email && (
							<a
								className="hover:text-purple"
								href={`mailto:${clinicDetails.email}`}
							>
								Email: {clinicDetails.email}
							</a>
						)}
						{clinicDetails?.primaryContact && (
							<div>
								<span>Cell: </span>
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
					</div>
				</div>
				<div className="size-[152px]">
					<ImagePlaceholder
						src={clinicDetails.logoUrl as string}
						containerClasses="w-[160px] h-[160px] "
						imageClasses="rounded-full object-cover"
					/>
				</div>
			</div>
			<div className="flex items-center justify-between border-y py-12">
				<div className="flex flex-1 flex-row gap-12">
					<div className="flex flex-row gap-2">
						<span className="text-black-1/60">Patient: </span>{' '}
						<span>{patientDetails.name}</span>
					</div>
					{patientDetails.dob && (
						<div className="flex flex-row gap-2">
							<span className="text-black-1/60">DOB: </span>{' '}
							<span>
								{format(patientDetails.dob, 'd MMM, yyyy')}
							</span>
						</div>
					)}
					<div className="flex flex-row gap-2">
						<span className="text-black-1/60">Breed: </span>{' '}
						<span>{patientDetails.breed}</span>
					</div>
					<div className="flex flex-row gap-2">
						<span className="text-black-1/60">Age: </span>{' '}
						<span>{patientDetails.age}</span>
					</div>
					<div className="flex flex-row gap-2">
						<span className="text-black-1/60">Weight: </span>{' '}
						<span>{patientDetails.weight}</span>
					</div>
				</div>
				<div className="flex flex-row gap-12">
					<div className="flex flex-row gap-2">
						<span className="text-black-1/60">Date: </span>{' '}
						<span>{format(new Date(), 'd MMMM, yyyy')}</span>
					</div>
					<div className="flex flex-row gap-2">
						<span className="text-black-1/60">Time: </span>{' '}
						<span>{format(new Date(), 'h:mm a')}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
