import { type ClassValue, clsx } from 'clsx';
import {
	addMonths,
	addYears,
	differenceInDays,
	differenceInMonths,
	differenceInYears,
	format,
} from 'date-fns';
import { twMerge } from 'tailwind-merge';

import { clearSubscribers } from '../services/reattempt-token.service';
import { useAuthStore } from '../store/user-auth';
import { Routes } from './routes';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const phoneValidator = /^[6-9]\d{9}$/;

export const otpValidator = /^[0-9]{1,6}$/;

export const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const gstValidator = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export const logout = async () => {
	localStorage.removeItem('persist:root');
	useAuthStore.getState().resetUser();
	clearSubscribers();
	//TODO: need a better way to logout
	window.location.href = Routes.LOGIN;
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

export const convertDates = (dates: Date[] | Date) => {
	const isArray = Array.isArray(dates);
	if (isArray) {
		const mappedDates = dates.map((date) => {
			return format(date, 'yyyy-MM-dd');
		});
		return mappedDates;
	} else {
		return format(dates, 'yyyy-MM-dd');
	}
};

export const firstCharCapital = (str: string) => {
	if (str && str !== '') {
		const first = str.slice(0, 1).toUpperCase();
		const remaining = str.slice(1).toLowerCase();

		return first + remaining;
	}

	return '';
};

export const calculateAge = (birthDateString: string) => {
	const birthDate = new Date(birthDateString);
	const today = new Date();

	if (isNaN(birthDate.getTime()) || birthDate > today) {
		return `${0}Y, ${0}M, ${0}D`;
	}

	const years = differenceInYears(today, birthDate);
	const adjustedDateAfterYears = addYears(birthDate, years);

	const months = differenceInMonths(today, adjustedDateAfterYears);
	const adjustedDateAfterMonths = addMonths(adjustedDateAfterYears, months);

	const days = differenceInDays(today, adjustedDateAfterMonths);

	if (years === 0) {
		if (months === 0) {
			return `${days}D`;
		}
		return `${months}M, ${days}D`;
	}

	return `${years}Y, ${months}M, ${days}D`;
};

export const dateDisable = (date: Date) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const minDate = new Date('1900-01-01');
	minDate.setHours(0, 0, 0, 0);

	const normalizedDate = new Date(date);
	normalizedDate.setHours(0, 0, 0, 0);

	return normalizedDate < minDate;
	// return normalizedDate < today || normalizedDate < minDate;
};

export const getYears = () => {
	const date = new Date();
	const currentYear = date.getFullYear();
	const startYear = 2024;
	const years = Array.from({ length: 5 }, (_, i) => {
		const calculatedYear = startYear + i;
		if (calculatedYear <= currentYear) {
			return {
				label: calculatedYear.toString(),
				value: calculatedYear.toString(),
			};
		}
	}).filter(Boolean);
	return years;
};

export const getMonths = () => {
	const months = Array.from({ length: 12 }, (_, i) => {
		return {
			value: String(i + 1),
			label: new Date(0, i).toLocaleString('default', { month: 'long' }),
		};
	});
	return months;
};
