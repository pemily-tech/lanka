'use client';

import { useParams } from 'next/navigation';

import AddEditForm from '../../_ui/add-edit-form';

export default function Page() {
	const params = useParams();

	return (
		<div>
			<h1 className="text-24 mb-12 font-medium">Edit Item</h1>
			<div className="shadow-card max-w-[720px] rounded-xl bg-white p-4">
				<AddEditForm type="EDIT" itemId={params?.id as string} />
			</div>
		</div>
	);
}
