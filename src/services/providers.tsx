'use client';

import React, { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

import { TooltipProvider } from '../ui/tooltip';
import { UmamiIdentify } from './umami-identity';

import { Toaster } from '@/ui/toast';

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem={false}
				forcedTheme="light"
			>
				<TooltipProvider>
					<UmamiIdentify />
					{children}
					<Toaster closeButton richColors position="bottom-left" />
				</TooltipProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
