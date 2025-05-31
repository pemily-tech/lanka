/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosResponse } from 'axios';

import { logout } from '../helpers/utils';
import { useAuthStore } from '../store/user-auth';
// eslint-disable-next-line import/no-cycle
import { HttpService } from './http-service';

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
		console.log(authStore, 'ssss');

		try {
			const resp = await axios.post('/auth/token', {
				refreshToken: authStore.refreshToken,
			});
			console.log(resp, '====');

			if (resp?.data?.status === 'SUCCESS') {
				authStore.updateUser({
					...useAuthStore.getState(),
					token: resp?.data?.data?.accessToken,
				});
				onAccessTokenFetched(resp?.data?.data?.accessToken);
			} else {
				logout();
			}
		} catch (err) {
			console.error(err, '=====');
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
