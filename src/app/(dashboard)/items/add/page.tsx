import { ItemForm } from '../_ui/form';

export default function Page() {
	return (
		<div className="max-w-screen-md">
			<h2 className="mb-4 heading">Add Item Details</h2>
			<ItemForm type="CREATE" />
		</div>
	);
}
