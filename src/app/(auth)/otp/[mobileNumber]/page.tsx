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

import { Spinner } from '@/ui/spinner';

export default function Page() {
	const params = useParams<{ mobileNumber: string }>();
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
	} = useOtpHook({
		mobile: params?.mobileNumber ?? '',
	});

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (
			result.data &&
			result.data.status === 'SUCCESS' &&
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

	return (
		<div>
			<Dialog open={isExecuting}>
				<DialogContent
					onInteractOutside={(event) => event.preventDefault()}
					showCloseButton={false}
					className="w-[150px]"
				>
					<DialogHeader>
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<Spinner />
					<span className="text-14 text-center font-medium">
						Setting up user...
					</span>
				</DialogContent>
			</Dialog>
			<div onClick={handleBack} className="flex items-center gap-12">
				<div className="flex size-32 cursor-pointer items-center justify-center">
					<ArrowLeft width={24} height={24} />
				</div>
				<span className="text-left text-[32px] font-semibold leading-[42px]">
					Enter 6 digit OTP code
				</span>
			</div>
			<div className="text-14 text-grey-text3 my-12">
				OTP sent to{' '}
				<span className="text-black-1 font-medium">
					+91-{params?.mobileNumber}
				</span>
			</div>
			<div className="mt-24 flex gap-12">
				{otp.map((_, i) => (
					<input
						key={i}
						ref={(input) => {
							if (otpRefs.current) {
								otpRefs.current[i] = input;
							}
						}}
						className="leading-16 rounded-8 focus:ring-brand border-grey-divider text-24 size-[52px] border px-12 text-center  font-medium outline-none transition
   duration-300 ease-in-out focus:border-none focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-90"
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
