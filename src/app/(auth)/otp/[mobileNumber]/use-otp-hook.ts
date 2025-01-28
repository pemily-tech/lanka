'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';

import { signinAction } from './signin-action';

export default function useOtpHook({ mobile }: { mobile: string }) {
	const [otp, updateOtp] = useState<string[]>(Array(6).fill(''));
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
	const router = useRouter();
	const { execute, result, isExecuting } = useAction(signinAction);

	const handleBack = () => {
		router.back();
	};

	const handleOtpChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		i: number
	) => {
		e.preventDefault();
		const value = e.target.value;
		const temp = [...otp];
		temp[i] = value.slice(value.length - 1);
		updateOtp(temp);

		const combinedOtp = temp.join('');
		if (combinedOtp.length === 6) {
			execute({
				mobileNumber: mobile,
				otp: combinedOtp,
			});
		}

		if (value && i < otp.length - 1) {
			otpRefs.current[i + 1]?.focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		i: number
	) => {
		if (e.key === 'Backspace') {
			if (i > 0) {
				if (otp[i] === '') {
					otpRefs.current[i - 1]?.focus();
				}
			}
		}
	};

	const handleClick = (e: React.MouseEvent<HTMLInputElement>, i: number) => {
		otpRefs.current[i]?.setSelectionRange(1, 1);
	};

	return {
		handleClick,
		handleKeyDown,
		handleOtpChange,
		otp,
		otpRefs,
		handleBack,
		isExecuting,
		result,
	};
}
