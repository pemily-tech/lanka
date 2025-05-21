'use client';

import { useEffect } from 'react';

import { useAuthStore } from '../store/user-auth';

export function UmamiIdentify() {
	const { loggedIn, mobile } = useAuthStore();

	useEffect(() => {
		if (
			loggedIn &&
			mobile &&
			typeof window !== 'undefined' &&
			window.location.hostname === 'clinic.pemilyy.com' &&
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
