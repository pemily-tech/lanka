import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type ISubscription } from '../types/auth';

import { Roles } from '@/helpers/primitives';

type AuthState = {
	loading: boolean;
	loggedIn: boolean;
	token: string | null;
	refreshToken: string | null;
	userId?: string | null;
	mobile?: string | null;
	name?: string;
	active?: boolean;
	gender?: string;
	role: string;
	clinicIds?: string[];
	createdAt?: string;
	updatedAt?: string;
	iat?: number;
	exp?: number;
	subscription?: ISubscription | null;
	hasHydrated: boolean;
};

type AuthActions = {
	updateUser: (data: Partial<AuthState>) => void;
	resetUser: () => void;
	verifyUser: (
		token: string,
		refreshToken: string,
		navigateFunction: () => void
	) => Promise<void>;
};

const initialState: AuthState = {
	loading: false,
	loggedIn: false,
	token: null,
	refreshToken: null,
	role: Roles.Clinic,
	hasHydrated: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
	persist(
		(set) => ({
			...initialState,

			updateUser: (data) => set((state) => ({ ...state, ...data })),

			resetUser: () => set(() => ({ ...initialState })),

			verifyUser: async (token, refreshToken, navigateFunction) => {
				set({ loading: true });
				try {
					const userDetails = jwtDecode(token) as Partial<AuthState>;
					set({
						...userDetails,
						token,
						refreshToken,
						loggedIn: true,
						loading: false,
					});
					navigateFunction();
				} catch (error) {
					console.error('Failed to decode token:', error);
					set({ loading: false });
				}
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({
				token: state.token,
				refreshToken: state.refreshToken,
				loggedIn: state.loggedIn,
				userId: state.userId,
				mobile: state.mobile,
				name: state.name,
				role: state.role,
			}),
			onRehydrateStorage: () => (state) => {
				state?.updateUser({ hasHydrated: true });
			},
		}
	)
);
