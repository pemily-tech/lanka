'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function AnalyticsScript() {
	const [showScript, setShowScript] = useState(false);

	useEffect(() => {
		if (window.location.hostname === 'clinic.pemilyy.com') {
			setShowScript(true);
		}
	}, []);

	if (!showScript) return null;

	return (
		<Script
			defer
			src="https://analytics.pemilyy.com/script.js"
			data-website-id="e73663f9-1970-40f8-a82d-72e22dfdb350"
		/>
	);
}
