'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

import { AppConstants, TestMobileNumbers } from '@/helpers/primitives';
import { useAuthStore } from '@/store/user-auth';

export default function AnalyticsScript() {
	const [showScript, setShowScript] = useState(false);
	const { loggedIn, mobile } = useAuthStore();

	useEffect(() => {
		if (
			window.location.hostname === AppConstants.HostNameProd &&
			loggedIn &&
			mobile !== TestMobileNumbers.Test1 &&
			mobile !== TestMobileNumbers.Test2
		) {
			setShowScript(true);
		}
	}, [loggedIn, mobile]);

	if (!showScript) return null;

	return (
		<Script
			defer
			src="https://analytics.pemilyy.com/script.js"
			data-website-id="e73663f9-1970-40f8-a82d-72e22dfdb350"
		/>
	);
}
