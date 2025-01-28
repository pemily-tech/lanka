'use server';

import { z } from 'zod';

import { otpValidator, phoneValidator } from '../../../../helpers/utils';
import { safeActionClient } from '../../../../services/next-safe-actions';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
	otp: z
		.string()
		.min(6, { message: 'Otp should have minimum 6 digits' })
		.max(6, { message: 'Otp cant be more than 6 digits' })
		.regex(otpValidator, { message: 'OTP is not valid' }),
});

const signinAction = safeActionClient
	.schema(schema)
	.action(async ({ parsedInput }) => {
		const { mobileNumber, otp } = parsedInput;

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_PATH}/auth/signIn`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						mobile: Number(mobileNumber),
						otp: Number(otp),
					}),
				}
			);
			if (!response.ok) {
				return {
					status: 'ERROR',
					msg: 'Unable to verify OTP. Please try again.',
					data: null,
					statusCode: response.status,
				} as ICommonTypes.IApiResponse<null>;
			}
			const otpData =
				(await response.json()) as ICommonTypes.IApiResponse<IAuthTypes.ILoginInterface>;
			if (otpData.status === 'SUCCESS') {
				return {
					status: 'SUCCESS',
					msg: '',
					data: otpData?.data,
					statusCode: response.status,
				} as ICommonTypes.IApiResponse<IAuthTypes.ILoginInterface>;
			} else {
				return {
					status: 'ERROR',
					msg: 'Unable to signin. Please try again.',
					data: null,
					statusCode: response.status,
				} as ICommonTypes.IApiResponse<null>;
			}
		} catch (err) {
			console.error(err);
			return {
				status: 'ERROR',
				msg: 'A network error occurred. Please check your connection and try again.',
				data: null,
				statusCode: 500,
			};
		}
	});

export { signinAction };
