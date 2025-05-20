'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Routes } from '../../../helpers/routes';
import { Button } from '../../shared';
import ClinicDetails from './components/clinic-details';

export function DashboardLayoutHeader() {
	const router = useRouter();
	const pathname = usePathname();

	const isHome = pathname === Routes.HOME;

	return (
		<header className="flex h-[72px] shrink-0 items-center justify-between gap-12 border-b bg-white px-16">
			<div className="flex items-center justify-between gap-12 py-24">
				<div className="flex flex-row items-center gap-12">
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

export default DashboardLayoutHeader;
