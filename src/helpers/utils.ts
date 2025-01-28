import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const phoneValidator = /^[6-9]\d{9}$/;

export const otpValidator = /^[0-9]{1,6}$/;

export const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

export const gstValidator = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
