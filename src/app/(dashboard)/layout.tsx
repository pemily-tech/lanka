'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

import { AppSidebar } from '../../components/app-sidebar';
import { SidebarInset, SidebarProvider } from '../../ui/sidebar';

import LayoutHeader from '@/components/layout/header';
import { Routes } from '@/helpers/routes';
import { useAuthStore } from '@/store/user-auth';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const { loggedIn, hasHydrated } = useAuthStore();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (hasHydrated && !loggedIn) {
			router.push(Routes.LOGIN);
		}
	}, [hasHydrated, loggedIn]);

	return (
		<AnimatePresence>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<LayoutHeader />
					<motion.div
						key={pathname}
						initial="pageInitial"
						animate="pageAnimate"
						exit="pageExit"
						className="min-h-[calc(100vh-72px)] bg-gray-100 p-4"
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
