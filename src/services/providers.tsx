'use client';

import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../store';
import { LoadingModal } from '../ui/components/spinner';

import { Toaster } from '@/ui/shared/toast';

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					{children}
					<Toaster />
					<LoadingModal />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
