'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { useGetUser } from '@/api/queries/use-get-user-details';
import { Roles } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { useAuthStore } from '@/store/user-auth';
import { Button } from '@/ui/button';
import { Loader } from '@/ui/loader';

export function LayoutHeader() {
	const router = useRouter();
	const pathname = usePathname();

	const isHome = pathname === Routes.HOME;

	return (
		<header className="flex h-[72px] shrink-0 items-center justify-between gap-3 border-b bg-white px-16">
			<div className="flex items-center justify-between gap-3 py-24">
				<div className="flex flex-row items-center gap-3">
					{!isHome && (
						<Button
							onClick={() => router.back()}
							variant="ghost"
							size="icon"
						>
							<ChevronLeft />
						</Button>
					)}
					<ClinicDetails />
				</div>
			</div>
		</header>
	);
}

function StaffName({ id }: { id: string }) {
	const { data } = useGetUser(id as string);
	const { name } = data?.data?.user || {};
	return <p className="text-24 font-semibold">{name}</p>;
}

function ClinicDetails() {
	const { userId, role } = useAuthStore();
	const { data, isLoading } = useGetUser(userId as string);
	const { name, clinicId } = data?.data?.user || {};

	if (isLoading) {
		return <Loader />;
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

export default LayoutHeader;
