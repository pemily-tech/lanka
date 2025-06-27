'use client';

import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useGetUser } from '@/api/queries/use-get-user-details';
import { Roles } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { useAuthStore } from '@/store/user-auth';
import { Button } from '@/ui/button';
import { Loader } from '@/ui/loader';

export function LayoutHeader() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isHome = pathname === Routes.HOME;

	const handleBack = () => {
		if (pathname.includes(Routes.HEALTH_CERTIFICATE_EDIT_ITEM)) {
			//TODO: we are losing the prev params
			//have to store the prev params in this case and redirect
			const params = new URLSearchParams(searchParams.toString());
			const queryString = params.toString();
			const url = `${Routes.HEALTH_CERTIFICATE_LIST}?${queryString}`;
			router.replace(url);
		} else {
			router.back();
		}
	};

	return (
		<header className="flex h-[72px] shrink-0 items-center justify-between gap-3 border-b border-border bg-white px-4">
			<div className="flex items-center justify-between gap-3 py-6">
				<div className="flex flex-row items-center gap-3">
					{!isHome && (
						<Button
							onClick={handleBack}
							variant="ghost"
							size="icon"
						>
							<ChevronLeft className="size-6" />
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
	return <p className="text-lg font-semibold">{name}</p>;
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
				<p className="text-lg font-medium">{name}</p>
			)}
		</div>
	);
}

export default LayoutHeader;
