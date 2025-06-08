import '@/styles/globals.css';

import { type PropsWithChildren } from 'react';
import { type Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import AnalyticsScript from '../components/analytics-script';
import Providers from '../services/providers';

import { siteConfig } from '@/helpers/constant';
import { fonts } from '@/helpers/fonts';
import { cn } from '@/helpers/utils';

export const generateMetadata = (): Metadata => ({
	metadataBase: new URL(siteConfig.url()),
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords(),
	robots: { index: true, follow: true },
	icons: {
		icon: '/favicon/favicon.ico',
		shortcut: '/favicon/favicon-16x16.png',
		apple: '/favicon/apple-touch-icon.png',
	},
	verification: {
		// google: siteConfig.googleSiteVerificationId(),
	},
	openGraph: {
		url: siteConfig.url(),
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.title,
		images: '/favicon/icon-512-maskable.png',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		images: '/favicon/icon-512-maskable.png',
	},
});

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('font-urbanist min-h-screen', fonts)}>
				<NuqsAdapter>
					<Providers>{children}</Providers>
				</NuqsAdapter>
				<AnalyticsScript />
			</body>
		</html>
	);
};

export default RootLayout;
