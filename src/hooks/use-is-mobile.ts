'use client';

import { useEffect, useState } from 'react';

export function useIsMobile() {
	const [isDesktop, setIsDesktop] = useState(() => {
		if (typeof window !== 'undefined') {
			return window.innerWidth >= 1024;
		}
		return false;
	});

	useEffect(() => {
		const updateDesktop = () => {
			setIsDesktop(window.innerWidth >= 1024);
		};

		window.addEventListener('resize', updateDesktop);

		updateDesktop();

		return () => window.removeEventListener('resize', updateDesktop);
	}, []);

	return {
		isDesktop,
	};
}

export default useIsMobile;
