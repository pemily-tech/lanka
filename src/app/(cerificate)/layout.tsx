'use client';

import { useEffect } from 'react';

import { Routes } from '../../helpers/routes';
import { useIsMobile } from '../../hooks/use-is-mobile';
import useRouterQuery from '../../hooks/use-router-query';
import { useAppSelector } from '../../store';
import { useAuthStore } from '../../store/user-auth';
import MobileOnly from '../../ui/components/mobile-only';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const { loggedIn } = useAuthStore();
	const { router } = useRouterQuery();
	const isMobile = useIsMobile();

	useEffect(() => {
		if (!loggedIn) {
			router.push(Routes.LOGIN);
		}
	}, [loggedIn, router]);

	if (isMobile) {
		return <MobileOnly />;
	}

	return <>{children}</>;
};

export default DashboardLayout;
