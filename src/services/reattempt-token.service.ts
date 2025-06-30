import axios, { type AxiosResponse } from 'axios';

import { logout } from '../helpers/utils';
import { useAuthStore } from '../store/user-auth';
import { HttpService } from './http-service';

import { env } from '@/env.mjs';
import { AppConstants } from '@/helpers/primitives';

let isAlreadyFetchingAccessToken = false;
type AccessTokenSubscriber = (accessToken: string) => void;
let subscribers: AccessTokenSubscriber[] = [];

async function ResetTokenAndReattemptRequest(
	error: any
): Promise<AxiosResponse> {
	const retryOriginalRequest = new Promise<AxiosResponse>(
		(resolve, reject) => {
			addSubscriber((accessToken: string) => {
				if (error?.config) {
					error.config.headers.Authorization = `Bearer ${accessToken}`;
					resolve(HttpService(error.config));
				} else {
					reject(new Error('Missing request config'));
				}
			});
		}
	);

	if (!isAlreadyFetchingAccessToken) {
		isAlreadyFetchingAccessToken = true;
		try {
			const authStore = useAuthStore.getState();
			const resp = await axios.post(
				`${env.NEXT_PUBLIC_BASE_PATH}/auth/token`,
				{
					refreshToken: authStore.refreshToken,
				}
			);

			if (resp?.data?.status === AppConstants.Success) {
				const newToken = resp.data.data.accessToken;
				authStore.updateUser({
					...authStore,
					token: newToken,
				});
				notifySubscribers(newToken);
			} else {
				await logout();
				rejectSubscribers(new Error('Token refresh failed'));
			}
		} catch (err: any) {
			await logout();
			rejectSubscribers(err);
		} finally {
			isAlreadyFetchingAccessToken = false;
			clearSubscribers();
		}
	}
	return retryOriginalRequest;
}

function addSubscriber(callback: AccessTokenSubscriber) {
	subscribers.push(callback);
}

function notifySubscribers(token: string) {
	subscribers.forEach((cb) => cb(token));
}

function rejectSubscribers(error: Error) {
	subscribers.forEach((cb) => cb('')); // or add a fallback strategy
	console.error(
		'Token refresh failed for all queued requests:',
		error.message
	);
}

function clearSubscribers() {
	subscribers = [];
}

export { clearSubscribers, ResetTokenAndReattemptRequest };
