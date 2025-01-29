/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const userAgent =
			navigator.userAgent || navigator.vendor || (window as any).opera;
		setIsMobile(
			/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
				userAgent
			)
		);
	}, []);

	return isMobile;
};
