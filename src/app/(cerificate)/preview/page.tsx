/* eslint-disable max-lines-per-function */
'use client';

import { useGetClinicLogo } from '../../../api/queries/use-get-clinic-logo';

export default function Page() {
	const { data } = useGetClinicLogo();

	const renderTitle = () => {
		return 'BOARDING AND LODGING CONSENT FORM';
	};

	const renderDesc = () => {
		return (
			<>
				<div>
					This is to certify that the pet described above, owned by{' '}
					<span className="text-[12px] font-bold">Mr./Ms. Test</span>{' '}
					(as detailed above), has been thoroughly examined by the
					undersigned and is found to be in excellent health as of the
					date of examination.
				</div>
				<div className="mt-12">
					Additionally, the pet is fully vaccinated against Rabies, as
					indicated in the vaccination record below.
				</div>
			</>
		);
	};

	return (
		<div
			id="pdf"
			className="pt-50 pb-50 mx-auto flex h-[1122px] w-[793px] flex-col bg-white px-24"
		>
			<div className="bg-purple flex justify-between py-10">
				<div className="relative mx-10 flex flex-col items-center">
					<img
						crossOrigin="anonymous"
						alt="logo"
						src={data?.data?.logoUrl}
						className="size-[100px] rounded-full object-fill"
					/>
				</div>
				{/* <div className="flex-1 flex justify-center flex-col mx-14">
					<h1 className="text-white text-22 font-bold">{clinicData?.name}</h1>
					<div className="flex">
						<p className="text-white text-14 text-left font-medium">
							<span>Mob. : </span>
							{clinicData?.businessContact
								? clinicData?.businessContact
								: clinicData?.mobile}
							<span className="pr-8">,</span>
						</p>
						<p className="text-white text-14 font-medium">
							<span>Address: </span>
							{clinicData?.address?.line1 && `${clinicData?.address?.line1}, `}
							{clinicData?.address?.line2 && `${clinicData?.address?.line2}, `}
							{clinicData?.address?.district && `${clinicData?.address?.district}, `}
							{clinicData?.address?.state && `${clinicData?.address?.state}, `}
							{clinicData?.address?.pincode && clinicData?.address?.pincode}
						</p>
					</div>
				</div> */}
			</div>
			<h2 className="text-18 my-6 text-center font-bold">
				{renderTitle()}
			</h2>
			<div className="px-24">
				<div className="border-purple text-14 grid grid-cols-3 gap-32 border-b-[3px] py-2 font-bold">
					<div className="col-span-1">Owner Details</div>
					<div className="col-span-2">Pet Details</div>
				</div>
				{/* <div className="py-2 grid grid-cols-3 gap-32 border-b border-dashed border-purple">
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Owner Name:</div>
							<div className="pl-8 text-12 font-medium">{parentDetails?.name}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Owner Mob.:</div>
							<div className="pl-8 text-12 font-medium">{parentDetails?.mobile}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Address:</div>
							<div className="pl-8 text-12 font-medium">
								{petAndParentDetail?.parentAddress?.address?.line1 &&
									`${petAndParentDetail?.parentAddress?.address?.line1}, `}
								{petAndParentDetail?.parentAddress?.address?.line2 &&
									`${petAndParentDetail?.parentAddress?.address?.line2}, `}
								{petAndParentDetail?.parentAddress?.address?.district &&
									`${petAndParentDetail?.parentAddress?.address?.district}, `}
								{petAndParentDetail?.parentAddress?.address?.state &&
									`${petAndParentDetail?.parentAddress?.address?.state}, `}
								{petAndParentDetail?.parentAddress?.address?.pincode &&
									petAndParentDetail?.parentAddress?.address?.pincode}
							</div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Name:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.name}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Type:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.type}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Sex:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.gender}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Color:</div>
							<div className="pl-8 text-12 font-medium"></div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Breed:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.breed}</div>
						</div>
					</div>
					<div className="col-span-1">
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet DOB:</div>
							<div className="pl-8 text-12 font-medium">
								{format(petDetails?.dob as string, 'do MMM, yyyy')}
							</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Pet Age:</div>
							<div className="pl-8 text-12 font-medium">
								{calculateAge(petDetails?.dob as string)}
							</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Patient code:</div>
							<div className="pl-8 text-12 font-medium">{petDetails?.code}</div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Microchip No.:</div>
							<div className="pl-8 text-12 font-medium"></div>
						</div>
						<div className="flex items-center py-2">
							<div className="text-12 font-medium">Reg No.:</div>
							<div className="pl-8 text-12 font-medium"></div>
						</div>
					</div>
				</div> */}
			</div>
			<div
				id="page-break"
				className="text-13 mt-16 px-24 text-justify font-medium"
				style={{ wordSpacing: '-0.1em', lineHeight: '1.4' }}
			>
				{renderDesc()}
			</div>
			{/* {heading === 'BOARDING_AND_LODGING' || heading === 'SURGICAL_RISK_NOTE' ? (
				<div className="px-24 pt-50">
					<div className="grid grid-cols-2">
						<div className="flex flex-col gap-6">
							<span className="h-1 w-[292px] bg-black-1 block"></span>
							<span className="font-medium text-14">Signature of Owner/Agent</span>
						</div>
						<div className="flex items-end flex-col gap-6">
							<span className="h-1 w-[292px] bg-black-1 block"></span>
							<span className="font-medium text-14">
								Name and Signature of explaining Doctor
							</span>
						</div>
					</div>
					{heading === 'SURGICAL_RISK_NOTE' && (
						<div className="flex items-end mt-24">
							<span className="font-medium text-14">Date:</span>
							<span className="h-1 w-[172px] bg-black-1 block"></span>
						</div>
					)}
					{heading === 'BOARDING_AND_LODGING' && (
						<div className="flex gap-6">
							<div className="flex items-end my-10">
								<span className="font-medium text-14">Date / Time IN:</span>
								<span className="h-1 w-[172px] bg-black-1 block"></span>
							</div>
							<div className="flex items-end my-10">
								<span className="font-medium text-14">Date / Time OUT:</span>
								<span className="h-1 w-[172px] bg-black-1 block"></span>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="grid grid-cols-2 px-24 pt-40">
					<div className="flex items-end">
						<span className="font-medium text-14">Date:</span>
						<span className="h-1 w-[172px] bg-black-1 block"></span>
					</div>
					<div className="flex items-end flex-col gap-6">
						<span className="h-1 w-[292px] bg-black-1 block"></span>
						<span className="font-medium text-14">
							{heading === 'EUTHANASIA_CERTIFICATE' ||
							heading === 'IDENTIFICATION_CERTIFICATE'
								? 'Signature of Owner/Agent'
								: 'Signature of Doctor'}
						</span>
					</div>
				</div>
			)} */}
			{/* <div className="mt-auto">
				<div className=" bg-purple text-white font-bold text-14 py-6 text-center">
					Please call for an appointment!
				</div>
				<div className="flex justify-between items-center">
					<p className="text-14 font-medium">
						<span>Mob. : </span>
						{clinicData?.businessContact
							? clinicData?.businessContact
							: clinicData?.mobile}
					</p>
					<p className="text-14 font-medium">
						<span>Email: </span>
						{clinicData?.email}
					</p>
				</div>
			</div> */}
		</div>
	);
}
