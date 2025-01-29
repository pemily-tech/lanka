'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { Routes } from '../../helpers/routes';
import useIsMobile from '../../hooks/use-is-mobile';
import useRouterQuery from '../../hooks/use-router-query';
import { useAppSelector } from '../../store';
import DashboardLayoutHeader from '../../ui/components/dashboard-layout-header/dashboard-layout-header';
import DashboardLayoutSidebar from '../../ui/components/dashboard-layout-sidebar/dashboard-layout-sidebar';
import MobileOnly from '../../ui/components/mobile-only';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const authState = useAppSelector((state) => state.auth);
	const { router, pathname } = useRouterQuery();
	const { isDesktop } = useIsMobile();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (!authState.loggedIn) {
			router.push(Routes.LOGIN);
		}
	}, [authState.loggedIn, router]);

	const handleScroll = () => {
		if (window.scrollY > 6) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const sidebarClasses = useMemo(() => {
		return 'ml-[282px] transition-all duration-150 mr-16 pt-[84px]';
	}, []);

	if (!isDesktop) {
		return <MobileOnly />;
	}

	return (
		<section className="max-w-screen-2xl">
			<DashboardLayoutHeader scrolled={scrolled} />
			<DashboardLayoutSidebar />
			<div className={`${sidebarClasses} `}>
				<motion.div
					key={pathname}
					initial="pageInitial"
					animate="pageAnimate"
					exit="pageExit"
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
			</div>
		</section>
	);
};

export default DashboardLayout;
