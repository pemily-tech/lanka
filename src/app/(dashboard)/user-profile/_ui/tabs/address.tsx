/* eslint-disable max-lines-per-function */
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import useCreateAddress from '../../../../../api/use-create-address/create-address';
import { usePincode } from '../../../../../api/use-pincode/pincode';
import useUpdateAddress from '../../../../../api/use-update-address/update-address';
import { useGetUser } from '../../../../../api/user-details/user-details';
import { useAuthStore } from '../../../../../store/user-auth';
import { type IAddress } from '../../../../../types/common';
import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared';

const schema = z.object({
	line1: z.string().min(1, 'Line1 is required'),
	line2: z.string().optional(),
	pincode: z
		.string()
		.min(6, 'The pincode should consist of 6 digits.')
		.max(6, 'The pincode should consist of 6 digits.')
		.regex(/^[1-9][0-9]{5}$/, 'The pincode should consist of 6 digits.'),
	district: z.string().min(1, 'District is required'),
	state: z.string().min(1, 'State is required'),
	type: z.string().min(1, 'Address type is required'),
});

type IFormData = z.infer<typeof schema>;

interface IPayload {
	line1: string;
	line2?: string;
	pincode: string;
	district: string;
	state: string;
	type: string;
	isPrimary: boolean;
}

const AddressForm = () => {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			line1: '',
			line2: '',
			pincode: '',
			district: '',
			state: '',
			type: 'HOME',
		},
	});

	const { userId } = useAuthStore();
	const { data } = useGetUser(userId as string);
	const { mutate: getPincode } = usePincode();
	const { mutate: updateAddress, isPending } = useUpdateAddress(
		data?.data?.user?.addressId as string
	);
	const { mutate: createAddress, isPending: isLoading } = useCreateAddress();

	const watchPincode = form.watch('pincode');

	useEffect(() => {
		if (data?.data?.user?.address) {
			const { line1, line2, pincode, district, state, type } =
				data.data.user.address;
			form.reset({
				line1: line1 || '',
				line2: line2 || '',
				pincode: pincode || '',
				district: district || '',
				state: state || '',
				type: type || 'HOME',
			});
		}
	}, [data?.data?.user?.address]);

	useEffect(() => {
		if (watchPincode?.length === 6) {
			handlePincode(watchPincode);
		}
	}, [watchPincode]);

	const handlePincode = (pincode: string) => {
		getPincode(pincode, {
			onSuccess: (addressData) => {
				const { district, state } = addressData?.data
					?.address as IAddress;
				form.setValue('district', district);
				form.setValue('state', state);
			},
			onError: (error) => {
				console.error('Error fetching pincode:', error);
			},
		});
	};

	const onSubmit = (values: IFormData) => {
		const payload: IPayload = {
			...values,
			isPrimary: false,
		};
		if (data?.data?.user?.addressId) {
			updateAddress(payload);
		} else {
			payload.isPrimary = true;
			createAddress(payload);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-12 mt-12 grid max-w-3xl grid-cols-2 gap-24 bg-white px-16 py-24"
			>
				{[
					['line1', 'Line1', 'text'],
					['line2', 'Line2', 'text'],
					['pincode', 'Pincode', 'numeric'],
					['district', 'District', 'text'],
					['state', 'State', 'text'],
				].map(([name, label, type]) => (
					<FormField
						key={name}
						control={form.control}
						name={name as keyof IFormData}
						render={({ field, fieldState }) => (
							<FormItem className="relative">
								<FormControl>
									<FloatingInput
										label={label}
										id={name}
										isError={!!fieldState.error}
										type={type}
										disabled={
											name === 'district' ||
											name === 'state'
										}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Choose address type</FormLabel>
							<Select
								onValueChange={field.onChange}
								value={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Choose address type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="HOME">Home</SelectItem>
									<SelectItem value="WORK">Work</SelectItem>
									<SelectItem value="OTHER">Other</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isPending || isLoading}
					loading={isPending || isLoading}
					className="col-span-2 max-w-[240px]"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AddressForm;
