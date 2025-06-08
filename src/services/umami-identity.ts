'use client';

import { useEffect } from 'react';

import { useAuthStore } from '../store/user-auth';

import { AppConstants, TestMobileNumbers } from '@/helpers/primitives';

export function UmamiIdentify() {
	const { loggedIn, mobile } = useAuthStore();

	useEffect(() => {
		if (
			loggedIn &&
			!!mobile &&
			mobile !== TestMobileNumbers.Test1 &&
			mobile !== TestMobileNumbers.Test2 &&
			typeof window !== 'undefined' &&
			window.location.hostname === AppConstants.HostNameProd &&
			window.umami
		) {
			let attempts = 0;
			const maxAttempts = 5;
			const interval = setInterval(() => {
				if (window.umami) {
					window.umami.identify(mobile);
					clearInterval(interval);
				} else if (attempts > maxAttempts) {
					clearInterval(interval);
				}
				attempts++;
			}, 200);

			return () => clearInterval(interval);
		}
	}, [loggedIn, mobile]);

	return null;
}
