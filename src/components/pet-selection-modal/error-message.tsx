export default function ErrorMessage({
	selectedDoctorId,
	stepperId,
	doctorError,
	parentError,
	petError,
	selectedParentId,
	selectedPetId,
}: {
	selectedDoctorId: string | undefined;
	selectedParentId: string | undefined;
	selectedPetId: string | undefined;
	stepperId: string;
	doctorError: boolean;
	parentError: boolean;
	petError: boolean;
}) {
	return (
		<>
			{stepperId === 'doctor' && doctorError && !selectedDoctorId && (
				<p className="text-destructive text-sm font-semibold">
					Please choose a doctor to proceed
				</p>
			)}
			{stepperId === 'parent' && parentError && !selectedParentId && (
				<p className="text-destructive text-sm font-semibold">
					Please choose a parent to proceed
				</p>
			)}
			{stepperId === 'pet' && petError && !selectedPetId && (
				<p className="text-destructive text-sm font-semibold">
					Please choose a pet to proceed
				</p>
			)}
		</>
	);
}
