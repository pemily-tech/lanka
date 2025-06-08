'use client';

import AddEditForm from '../_ui/add-edit-form';

export default function Page() {
	return (
		<div>
			<h1 className="text-24 mb-12 font-medium">Add Item</h1>
			<div className="shadow-card max-w-[720px] rounded-xl bg-white p-4">
				<AddEditForm type="ADD" />
			</div>
		</div>
	);
}
