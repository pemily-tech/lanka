'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { z } from 'zod';

import { getOtpAction } from '../../login/_actions/get-otp-action';

import { AppConstants } from '@/helpers/primitives';
import { phoneValidator } from '@/helpers/utils';
import { Button } from '@/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form';
import { FloatingInput } from '@/ui/input';

const schema = z.object({
	mobileNumber: z
		.string()
		.min(10, { message: 'Mobile number should have minimum 10 digits' })
		.max(10, { message: 'Mobile number cant be more than 10 digits' })
		.regex(phoneValidator, { message: 'Phone number is not valid' }),
	name: z.string().nonempty('Please choose name'),
});

export default function Page() {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			mobileNumber: '',
			name: '',
		},
	});
	const params = useParams<{ mobileNumber: string }>();
	const router = useRouter();
	const { execute, result, isExecuting } = useAction(getOtpAction);

	useEffect(() => {
		form.reset({
			mobileNumber: params?.mobileNumber,
		});
	}, []);

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.status === AppConstants.Success) {
			toast.success(result.data.msg);
			router.push(
				`/otp/${form.getValues('mobileNumber')}?name=${form.getValues('name')}&type=register`
			);
		} else {
			toast.error(result.data.msg);
		}
	}, [form, result, router]);

	const handleBack = () => {
		router.back();
	};

	const onSubmit = async (values: { mobileNumber: string; name: string }) => {
		const payload = {
			mobileNumber: values.mobileNumber,
		};
		execute(payload);
	};

	return (
		<div className="flex flex-col gap-6">
			<h4 className="text-left text-md font-semibold text-black/60">
				It looks like you're not registered with us yet.
			</h4>
			<div onClick={handleBack} className="flex items-center gap-3">
				<div className="flex size-8 cursor-pointer items-center justify-center">
					<ArrowLeft width={24} height={24} />
				</div>
				<span className="text-left text-2xl font-semibold">
					Want to change details?
				</span>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-1">
					<FormField
						control={form.control}
						name="mobileNumber"
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label="Mobile Number"
										type="numeric"
										id="mobileNumber"
										maxLength={10}
										isError={!!fieldState.error}
										disabled
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field, fieldState }) => (
							<FormItem className="relative mt-4">
								<FormControl>
									<FloatingInput
										label="Name"
										id="name"
										isError={!!fieldState.error}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						loading={isExecuting}
						disabled={isExecuting}
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
