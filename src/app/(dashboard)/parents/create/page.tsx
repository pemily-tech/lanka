import { ParentForm } from '../_ui/form';

export default function Page() {
	return (
		<div>
			<div className="heading mb-4">Add Parent Details</div>
			<ParentForm type="add" />
		</div>
	);
}
