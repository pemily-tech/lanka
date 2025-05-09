/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { register } from 'module';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { errors } from '@playwright/test';
import { z } from 'zod';

import useCreateAddress from '../../../../../api/use-create-address/create-address';
import { usePincode } from '../../../../../api/use-pincode/pincode';
import useUpdateAddress from '../../../../../api/use-update-address/update-address';
import { useGetUser } from '../../../../../api/user-details/user-details';
import { useAuthStore } from '../../../../../store/user-auth';
import { type IAddress } from '../../../../../types/common';
import TextInput from '../../../../../ui/components/text-input';
import {
	Button,
	Calendar,
	FloatingInput,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Popover,
	PopoverContent,
	PopoverTrigger,
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
});

interface IPayload {
	line1: string;
	line2: string;
	pincode: string;
	district: string;
	state: string;
	type: string;
	isPrimary: boolean;
}

const AddressForm = () => {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			line1: '',
			line2: '',
			pincode: '',
			district: '',
			state: '',
		},
	});
	const { userId } = useAuthStore();
	const { data } = useGetUser(userId as string);
	const [addressType, setType] = useState('HOME');
	const { mutate: getPincode } = usePincode();
	const { mutate: updateAddress, isPending } = useUpdateAddress(
		data?.data?.user?.addressId as string
	);
	const { mutate: createAddress, isPending: isLoading } = useCreateAddress();
	const { line1, line2, pincode, district, state, type } =
		data?.data?.user?.address || {};
	const watchPincode = form.watch('pincode');

	useEffect(() => {
		if (data?.data?.user) {
			form.reset({
				line1: line1 || '',
				line2: line2 || '',
				pincode: pincode || '',
				district: district || '',
				state: state || '',
			});
		}
	}, [data?.data?.user, district, form, line1, line2, pincode, state, type]);

	useEffect(() => {
		if (watchPincode?.length === 6) {
			handlePincode(watchPincode);
		}
	}, [watchPincode]);

	const handlePincode = (pincode: string) => {
		// getPincode(pincode, {
		// 	onSuccess: (addressData) => {
		// 		const { district, state } = addressData?.data
		// 			?.address as IAddress;
		// 		setValue('district', district);
		// 		setValue('state', state);
		// 	},
		// 	onError: (error) => {
		// 		console.error('Error fetching pincode:', error);
		// 	},
		// });
	};

	const onSubmit = (values: any) => {
		const payload = {
			...values,
			type: addressType,
		} as IPayload;
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
				className="shadow-card1 rounded-12 mt-12 grid grid-cols-2 gap-24 bg-white px-16 py-24"
			></form>
		</Form>
	);

	// return (
	// 	<form onSubmit={handleSubmit(onSubmit)}>
	// 		<section className="mb-24 grid grid-cols-2 gap-24">
	// 			<TextInput
	// 				label="Line1"
	// 				placeholder=""
	// 				error={errors?.line1}
	// 				{...register('line1')}
	// 			/>
	// 			<TextInput
	// 				label="Line2"
	// 				placeholder=""
	// 				error={errors?.line2}
	// 				{...register('line2')}
	// 			/>
	// 		</section>
	// 		<section className="mb-24 grid grid-cols-2 gap-24">
	// 			<TextInput
	// 				label="Pincode"
	// 				placeholder=""
	// 				error={errors?.pincode}
	// 				type="numeric"
	// 				maxLength={6}
	// 				minLength={6}
	// 				{...register('pincode')}
	// 			/>
	// 			<TextInput
	// 				label="District"
	// 				placeholder=""
	// 				error={errors?.district}
	// 				readonly={true}
	// 				disabled={true}
	// 				{...register('district')}
	// 			/>
	// 		</section>
	// 		<section className="mb-24 grid grid-cols-2 gap-24">
	// 			<TextInput
	// 				label="State"
	// 				placeholder=""
	// 				error={errors?.state}
	// 				readonly={true}
	// 				disabled={true}
	// 				{...register('state')}
	// 			/>
	// 			<section>
	// 				<label className="text-14 leading-14 mb-10 block">
	// 					Choose Gender
	// 				</label>
	// 				<section className="rounded-8 border-grey-divider flex h-[52px] items-center gap-24 border bg-white px-12">
	// 					<Radio
	// 						label="Home"
	// 						value="HOME"
	// 						checked={addressType === 'HOME'}
	// 						name="home"
	// 						onChange={() => setType('HOME')}
	// 					/>
	// 					<Radio
	// 						label="Work"
	// 						value="WORK"
	// 						checked={addressType === 'WORK'}
	// 						name="work"
	// 						onChange={() => setType('WORK')}
	// 					/>
	// 					<Radio
	// 						label="Other"
	// 						value="OTHER"
	// 						checked={addressType === 'OTHER'}
	// 						name="other"
	// 						onChange={() => setType('OTHER')}
	// 					/>
	// 				</section>
	// 			</section>
	// 		</section>
	// 		<section className="!mt-[42px]">
	// 			<Button
	// 				className="min-w-[250px]"
	// 				loading={isPending || isLoading}
	// 				disabled={isPending || isLoading}
	// 			>
	// 				<span className="font-bold">Save Address</span>
	// 			</Button>
	// 		</section>
	// 	</form>
	// );
};

export default AddressForm;
