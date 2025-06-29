'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { z } from 'zod';

import { phoneValidator } from '../../../helpers/utils';
import { Button } from '../../../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../../ui/form';
import { FloatingInput } from '../../../ui/input/';
import { getOtpAction } from './_actions/get-otp-action';

import { env } from '@/env.mjs';
import { AppConstants, Roles } from '@/helpers/primitives';
import { type IsUserRegisteredInterface } from '@/types/auth';
import { type IApiResponse } from '@/types/common';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
});

export default function Page() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			mobileNumber: '',
		},
	});
	const { execute, result, isExecuting } = useAction(getOtpAction);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.status === AppConstants.Success) {
			toast.success(result.data.msg);
			router.push(`otp/${form.getValues('mobileNumber')}?type=login`);
		} else {
			toast.error(result.data.msg);
		}
	}, [form, result, router]);

	const onSubmit = async (values: { mobileNumber: string }) => {
		setIsLoading(true);
		try {
			const { data } = await axios.get<
				IApiResponse<IsUserRegisteredInterface>
			>(
				`${env.NEXT_PUBLIC_BASE_PATH}/auth/isUser/${values.mobileNumber}`
			);

			if (
				data.status === AppConstants.Success &&
				data.data?.isUser &&
				(data?.data?.role === Roles.Clinic ||
					data?.data?.role === Roles.Staff)
			) {
				const payload = {
					mobileNumber: values.mobileNumber,
				};
				execute(payload);
			} else {
				router.push(`registration/${form.getValues('mobileNumber')}`);
			}
		} catch (error) {
			toast.error('Error checking user');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center">
				<p className="mb-4 mt-1 text-lg">
					Welcome to{' '}
					<span className="text-primary font-bold">Pemilyy</span>
				</p>
			</div>
			<h4 className="text-left text-2xl font-semibold">
				Get started with your 10 digit mobile number
			</h4>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-1">
					<FormField
						control={form.control}
						name="mobileNumber"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Enter your Mobile Number"
										type="numeric"
										id="mobileNumber"
										maxLength={10}
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						loading={isExecuting || isLoading}
						disabled={isExecuting || isLoading}
						loadingText="Sending Otp"
						type="submit"
						className="mt-6 w-full"
					>
						Get OTP
					</Button>
				</form>
			</Form>
		</div>
	);
}
