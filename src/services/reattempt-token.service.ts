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
	const retryOriginalRequest = new Promise<AxiosResponse>((resolve) => {
		addSubscriber((accessToken: string) => {
			error.config.headers.Authorization = `Bearer ${accessToken}`;
			resolve(HttpService(error.config));
		});
	});

	if (!isAlreadyFetchingAccessToken) {
		isAlreadyFetchingAccessToken = true;
		const authStore = useAuthStore.getState();

		try {
			const resp = await axios.post(
				`${env.NEXT_PUBLIC_BASE_PATH}/auth/token`,
				{
					refreshToken: authStore.refreshToken,
				}
			);
			if (resp?.data?.status === AppConstants.Success) {
				authStore.updateUser({
					...useAuthStore.getState(),
					token: resp?.data?.data?.accessToken,
				});
				onAccessTokenFetched(resp?.data?.data?.accessToken);
			} else {
				logout();
			}
		} catch (err) {
			logout();
			// Handle errors
		} finally {
			isAlreadyFetchingAccessToken = false;
		}
	}
	return retryOriginalRequest;
}

function onAccessTokenFetched(accessToken: string) {
	subscribers.forEach((callback) => callback(accessToken));
	subscribers = [];
}

function addSubscriber(callback: AccessTokenSubscriber) {
	subscribers.push(callback);
}

export { ResetTokenAndReattemptRequest };
