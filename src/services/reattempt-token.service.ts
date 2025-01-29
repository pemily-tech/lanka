/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosResponse } from 'axios';

import { ApiEndpoints } from '../helpers/primitives';
import { logout } from '../helpers/utils';
import { store } from '../store';
import { updateUser } from '../store/auth';
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

		try {
			const resp = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.RefreshToken}`,
				{
					refreshToken: store.getState().auth.refreshToken,
				}
			);

			if (resp?.data?.status === 'SUCCESS') {
				store.dispatch(
					updateUser({
						...store.getState().auth,
						token: resp?.data?.data?.accessToken,
					})
				);
				onAccessTokenFetched(resp?.data?.data?.accessToken);
			} else {
				logout();
			}
		} catch (err) {
			console.error(err);
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
