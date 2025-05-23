'use client';

import { useGetUser } from '../../../../api/user-details/user-details';
import { Roles } from '../../../../helpers/primitives';
import { useAppSelector } from '../../../../store';
import { useAuthStore } from '../../../../store/user-auth';
import Spinner from '../../../shared/spinner';

function StaffName({ id }: { id: string }) {
	const { data } = useGetUser(id as string);
	const { name } = data?.data?.user || {};
	return <p className="text-24 font-semibold">{name}</p>;
}

export default function ClinicDetails() {
	const { userId, role } = useAuthStore();
	const { data, isPending } = useGetUser(userId as string);
	const { name, clinicId } = data?.data?.user || {};

	if (isPending) {
		return (
			<div className="w-[250px]">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="flex-1">
			{role === Roles.Staff ? (
				<StaffName id={clinicId as string} />
			) : (
				<p className="text-18 font-medium">{name}</p>
			)}
		</div>
	);
}
