'use server';

import axios from 'axios';
import { z } from 'zod';

import { env } from '@/env.mjs';
import { AppConstants } from '@/helpers/primitives';
import { phoneValidator } from '@/helpers/utils';
import { safeActionClient } from '@/services/next-safe-actions';
import { type IApiResponse } from '@/types/common';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
});

export const getOtpAction = safeActionClient
	.schema(schema)
	.action(async ({ parsedInput }) => {
		const { mobileNumber } = parsedInput;

		try {
			const otpResponse = await axios.post<
				IApiResponse<{ type: 'success' }>
			>(
				`${env.NEXT_PUBLIC_BASE_PATH}/auth/sendOtp`,
				{ mobile: mobileNumber },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			return otpResponse.data;
		} catch (error: any) {
			console.error(error);
			if (axios.isAxiosError(error) && error.response) {
				return {
					status: AppConstants.Error,
					msg: 'Failed to check user registration.',
					data: null,
					statusCode: error.response.status,
				} as IApiResponse<null>;
			}

			return {
				status: AppConstants.Error,
				msg: 'A network error occurred. Please check your connection and try again.',
				data: null,
				statusCode: 500,
			} as IApiResponse<null>;
		}
	});
