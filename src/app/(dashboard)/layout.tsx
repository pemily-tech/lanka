'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Routes } from '../../helpers/routes';
import { useIsMobile } from '../../hooks/use-is-mobile';
import useRouterQuery from '../../hooks/use-router-query';
import { useAuthStore } from '../../store/user-auth';
import { AppSidebar } from '../../ui/components/app-sidebar';
import DashboardLayoutHeader from '../../ui/components/dashboard-layout-header/dashboard-layout-header';
import MobileOnly from '../../ui/components/mobile-only';
import { SidebarInset, SidebarProvider } from '../../ui/shared/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const { loggedIn } = useAuthStore();
	const { router, pathname } = useRouterQuery();
	const isMobile = useIsMobile();

	useEffect(() => {
		if (!loggedIn) {
			router.push(Routes.LOGIN);
		}
	}, [loggedIn, router]);

	if (isMobile) {
		return <MobileOnly />;
	}

	return (
		<AnimatePresence>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<DashboardLayoutHeader />
					<motion.div
						key={pathname}
						initial="pageInitial"
						animate="pageAnimate"
						exit="pageExit"
						className="bg-grey-bg3 min-h-[calc(100vh-72px)] p-16"
						variants={{
							pageInitial: {
								opacity: 0,
								y: 50,
							},
							pageAnimate: {
								opacity: 1,
								y: 0,
							},
							pageExit: {
								opacity: 0,
								y: -50,
							},
						}}
						transition={{
							type: 'tween',
							ease: 'easeInOut',
							duration: 0.5,
						}}
					>
						{children}
					</motion.div>
				</SidebarInset>
			</SidebarProvider>
		</AnimatePresence>
	);
};

export default DashboardLayout;
