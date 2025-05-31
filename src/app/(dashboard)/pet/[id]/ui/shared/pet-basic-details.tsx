function PetBasicDetails({
	name,
	breed,
	gender,
	type,
	dob,
	code,
	microChipNo,
	oldCode,
}: {
	name: string;
	breed: string;
	gender: string;
	type: string;
	dob: string;
	code: string;
	microChipNo?: string;
	oldCode?: string;
}) {
	return (
		<div className="mt-24 flex w-full flex-col gap-16">
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Code: </span>
				<span className="text-14 font-medium">{code}</span>
			</div>
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Name: </span>
				<span className="text-14 font-medium">{name}</span>
			</div>
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Breed: </span>
				<span className="text-14 font-medium">{breed}</span>
			</div>
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Gender: </span>
				<span className="text-14 font-medium">
					{gender === 'M' ? 'Male' : 'Female'}
				</span>
			</div>
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Type: </span>
				<span className="text-14 font-medium">{type}</span>
			</div>
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Dob: </span>
				<span className="text-14 font-medium">{dob}</span>
			</div>
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Microchip No.: </span>
				<span className="text-14 font-medium">
					{microChipNo ? microChipNo : ''}
				</span>
			</div>
			<div className="border-grey-border1 rounded-8 flex items-center gap-12 border p-12">
				<span className="text-14 text-grey-text3">Old Code: </span>
				<span className="text-14 font-medium">
					{oldCode ? oldCode : ''}
				</span>
			</div>
		</div>
	);
}

export default PetBasicDetails;
