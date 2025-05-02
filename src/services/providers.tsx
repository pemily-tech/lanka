'use client';

import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../store';
import ModalView from '../ui/components/modal-view';
import { LoadingModal } from '../ui/components/spinner';
import { TooltipProvider } from '../ui/shared/tooltip';

import { Toaster } from '@/ui/shared/toast';

export const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<TooltipProvider>
						{children}
						<Toaster
							closeButton
							richColors
							position="bottom-left"
						/>
						<LoadingModal />
						<ModalView />
					</TooltipProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
