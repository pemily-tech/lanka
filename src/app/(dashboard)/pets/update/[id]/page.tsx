import { PetForm } from '../../_ui/form';

export default function Page() {
	return (
		<div>
			<div className="heading mb-4">Add Pet Details</div>
			<PetForm type="edit" />
		</div>
	);
}
