import '@/styles/globals.css';
// import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

import { type PropsWithChildren } from 'react';
import { type Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Providers from '../services/providers';

import 'swiper/css';
import 'swiper/css/pagination';
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
			<body className={cn('font-satoshi min-h-screen', fonts)}>
				<NuqsAdapter>
					<Providers>{children}</Providers>
				</NuqsAdapter>
			</body>
		</html>
	);
};

export default RootLayout;
