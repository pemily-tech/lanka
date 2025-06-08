'use client';

import AddEditForm from '../_ui/add-edit-form';

export default function Page() {
	return (
		<div>
			<h1 className="mb-3 text-2xl font-medium">Add Item</h1>
			<div className="max-w-[720px] rounded-xl bg-white p-4 shadow-md">
				<AddEditForm type="ADD" />
			</div>
		</div>
	);
}
