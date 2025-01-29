import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { store } from '../store';
import { resetUser } from '../store/auth';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const phoneValidator = /^[6-9]\d{9}$/;

export const otpValidator = /^[0-9]{1,6}$/;

export const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const gstValidator = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export const logout = () => {
	localStorage.removeItem('persist:root');
	store.dispatch(resetUser());
};

export const createFormDataForImage = (
	photo: File,
	keyName: string,
	body?: Record<string, string | Blob | number | boolean | null | undefined>
): FormData => {
	const data = new FormData();
	data.append(keyName, photo);

	if (body) {
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const value = body[key];
				// Append only non-null, non-undefined, non-empty values
				if (value !== null && value !== undefined && value !== '') {
					data.append(key, value.toString());
				}
			}
		}
	}

	return data;
};

export const createFormDataForDocument = (
	document?: File | null,
	keyName?: string | null,
	body?: Record<string, string | Blob | number | boolean | null | undefined>
): FormData => {
	const data = new FormData();

	if (keyName && document) {
		data.append(keyName, document);
	}

	if (body) {
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const value = body[key];
				// Append only non-null, non-undefined, non-empty values
				if (value !== null && value !== undefined && value !== '') {
					data.append(key, value.toString());
				}
			}
		}
	}

	return data;
};
