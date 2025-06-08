'use client';

import { useParams } from 'next/navigation';

import AddEditForm from '../../_ui/add-edit-form';

export default function Page() {
	const params = useParams();

	return (
		<div>
			<h1 className="mb-3 text-2xl font-medium">Edit Item</h1>
			<div className="max-w-[720px] rounded-xl bg-white p-4 shadow-md">
				<AddEditForm type="EDIT" itemId={params?.id as string} />
			</div>
		</div>
	);
}
