import axios, { type AxiosError, type AxiosResponse } from 'axios';

import { logout } from '../helpers/utils';
import { useAuthStore } from '../store/user-auth';
import { ResetTokenAndReattemptRequest } from './reattempt-token.service';

import { env } from '@/env.mjs';

// Interface for the error response data
interface AxiosErrorResponseData {
	status: string;
	msg: string;
	statusCode: number;
}

// Custom Axios error interface
interface CustomAxiosError extends AxiosError {
	response?: AxiosResponse<AxiosErrorResponseData>;
}

// Create an instance of axios
const HttpService = axios.create({
	baseURL: env.NEXT_PUBLIC_BASE_PATH,
});

HttpService.interceptors.request.use(
	async (config) => {
		try {
			const state = useAuthStore.getState();
			if (state?.loggedIn && state?.token) {
				config.headers.Authorization = `Bearer ${state.token}`;
			}
			return config;
		} catch (error) {
			return Promise.reject(error);
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

HttpService.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	async (error: CustomAxiosError) => {
		if (error.response) {
			// Handle specific error responses
			if (
				error.response.data?.statusCode === 401 &&
				error.response.data?.msg === 'jwt expired'
			) {
				return ResetTokenAndReattemptRequest(error.response);
			} else if (error.response.data?.msg === 'Inactive user!') {
				logout();
			}
			const message =
				error.response?.data?.msg ||
				error.message ||
				'Something went wrong. Please try again.';
			return Promise.reject(new Error(message));
		} else if (error.request) {
			console.error('No response received:', error.request);
			return Promise.reject(
				new Error(
					'No response from server. Please check your connection.'
				)
			);
		} else {
			console.error('Unexpected error:', error);
			return Promise.reject(
				new Error('Unexpected error occurred. Please try again.')
			);
		}
	}
);

export { HttpService };
