import { MedicineForm } from '../../_ui/form';

export default function Page() {
	return (
		<div className="max-w-screen-md">
			<h2 className="mb-4 text-2xl font-medium">Edit Medicine Details</h2>
			<MedicineForm type="UPDATE" />
		</div>
	);
}
