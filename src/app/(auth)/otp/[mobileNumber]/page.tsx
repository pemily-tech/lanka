'use client';

import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Routes } from '../../../../helpers/routes';
import { useAuthStore } from '../../../../store/user-auth';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../../../../ui/dialog';
import useOtpHook from './_hooks/use-otp-hook';

import { AppConstants } from '@/helpers/primitives';
import { Spinner } from '@/ui/spinner';

export default function Page() {
	const params = useParams<{
		mobileNumber: string;
		type: string;
		name: string;
	}>();
	const router = useRouter();
	const verifyUser = useAuthStore((state) => state.verifyUser);

	const {
		otp,
		otpRefs,
		handleClick,
		handleKeyDown,
		handleOtpChange,
		handleBack,
		isExecuting,
		result,
		signupResult,
		isSignupExecuting,
	} = useOtpHook();

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (
			result.data &&
			result.data.status === AppConstants.Success &&
			result.data.data?.accessToken
		) {
			verifyUser(
				result.data.data?.accessToken ?? '',
				result.data.data?.refreshToken ?? '',
				() => {
					router.push(Routes.HOME);
				}
			);
		} else {
			toast.error(result.data.msg ?? 'An error occurred');
		}
	}, [result, result.data, router]);

	useEffect(() => {
		if (!signupResult.data) {
			return;
		}

		if (
			signupResult.data &&
			signupResult.data.status === AppConstants.Success &&
			signupResult.data.data?.accessToken
		) {
			verifyUser(
				signupResult.data.data?.accessToken ?? '',
				signupResult.data.data?.refreshToken ?? '',
				() => {
					router.push(Routes.HOME);
				}
			);
		} else {
			toast.error(signupResult.data.msg ?? 'An error occurred');
		}
	}, [signupResult, signupResult.data, router]);

	return (
		<div>
			<Dialog open={isExecuting || isSignupExecuting}>
				<DialogContent
					onInteractOutside={(event) => event.preventDefault()}
					showCloseButton={false}
					className="flex size-42 flex-col items-center justify-center gap-3"
				>
					<DialogHeader className="hidden">
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<Spinner />
					<span className="text-center text-sm font-medium">
						Setting up user...
					</span>
				</DialogContent>
			</Dialog>
			<div onClick={handleBack} className="flex items-center gap-3">
				<div className="flex size-8 cursor-pointer items-center justify-center">
					<ArrowLeft width={24} height={24} />
				</div>
				<span className="text-left text-2xl font-semibold">
					Enter 6 digit OTP code
				</span>
			</div>
			<div className="my-3 text-sm text-black/50">
				OTP sent to{' '}
				<span className="font-medium text-black">
					+91-{params?.mobileNumber}
				</span>
			</div>
			<div className="flex gap-4 pt-6">
				{otp.map((_, i) => (
					<input
						key={i}
						ref={(input) => {
							if (otpRefs.current) {
								otpRefs.current[i] = input;
							}
						}}
						className="focus:ring-primary focus:ring-opacity/90 size-12 rounded-lg border border-gray-300 px-3 text-center text-xl font-medium
   outline-none transition duration-300 ease-in-out focus:border-none focus:shadow-sm focus:outline-none focus:ring-2"
						onChange={(e) => handleOtpChange(e, i)}
						onKeyDown={(e) => handleKeyDown(e, i)}
						value={(otp[i] ?? '') as string}
						onClick={(e) => handleClick(e, i)}
						maxLength={1}
					/>
				))}
			</div>
		</div>
	);
}
