/* eslint-disable max-lines-per-function */
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
	gstValidator,
	panValidator,
	phoneValidator,
} from '../../../../../../helpers/utils';
import { useAuthStore } from '../../../../../../store/user-auth';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../../../../../ui/shared/form';
import { FloatingInput } from '../../../../../../ui/shared/input';
import { useUpdateBusiness } from '../../../_api/update-business';

import { useGetUser } from '@/api/queries/use-get-user-details';
import { Button } from '@/ui/shared/button';

const schema = z.object({
	ownerName: z.string().optional().or(z.literal('')),
	pan: z
		.string()
		.regex(panValidator, 'Pan is not valid')
		.optional()
		.or(z.literal('')),
	gstNo: z
		.string()
		.regex(gstValidator, 'Gst is not valid')
		.optional()
		.or(z.literal('')),
	businessContact: z
		.string()
		.regex(phoneValidator, 'Phone number is not valid')
		.optional()
		.or(z.literal('')),
});

type IFormData = z.infer<typeof schema>;

const BusinessForm = () => {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			ownerName: '',
			pan: '',
			gstNo: '',
			businessContact: '',
		},
	});
	const { userId } = useAuthStore();
	const { data } = useGetUser(userId as string);
	const { mutate: updateBusiness, isPending } = useUpdateBusiness();

	useEffect(() => {
		const user = data?.data?.user;
		if (user) {
			form.reset({
				ownerName: user.ownerName || '',
				pan: user.pan || '',
				gstNo: user.gstNo || '',
				businessContact: user.businessContact || '',
			});
		}
	}, [data?.data?.user]);

	const onSubmit = (values: IFormData) => {
		const { businessContact, ...restValues } = values;
		const payload = {
			...restValues,
			...(businessContact
				? { businessContact: Number(businessContact) }
				: {}),
		};
		if (businessContact !== '') {
			payload.businessContact = Number(businessContact);
		}
		updateBusiness(payload);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-12 mt-12 grid flex-1 grid-cols-2 gap-24 bg-white px-16 py-24"
			>
				{[
					['businessContact', 'Business Contact Number', 'numeric'],
					['ownerName', 'Owner Name', 'text'],
					['pan', 'PAN', 'text'],
					['gstNo', 'GST No', 'text'],
				].map(([name, label, type, placeholder]) => {
					return (
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
											type={type || 'text'}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}
				<Button
					disabled={isPending}
					loading={isPending}
					className="col-span-2 max-w-[240px]"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default BusinessForm;
