'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { z } from 'zod';

import { usePincode } from '../../../../api/mutations/use-get-pincode';
import { useCreateAddress } from '../_api/use-create-address';
import { useGetParentAddress } from '../_api/use-get-parent-address';
import { useGetParentById } from '../_api/use-get-parent-byid';
import { useUpdateAddress } from '../_api/use-update-address';

import { AppConstants } from '@/helpers/primitives';
import { queryClient } from '@/services/providers';
import { type IAddress } from '@/types/common';

const schema = z.object({
	line1: z.string().nonempty('Line1 is required'),
	line2: z.string().optional(),
	state: z.string().nonempty('State is required'),
	district: z.string().nonempty('District is required'),
	pincode: z.string().nonempty('Pincode is required'),
	type: z.string().nonempty('Type is required'),
});

export type IFormData = z.infer<typeof schema>;

export function useAddressForm(type: 'add' | 'edit') {
	const params = useParams<{ id: string }>();
	const { data: parents } = useGetParentById(params?.id as string);
	const parentData = parents?.data?.parents?.[0];

	const { data } = useGetParentAddress(
		parentData?.parent?.addressId ?? undefined
	);
	const addressData = data?.data?.address;

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			line1: addressData?.line1 ?? '',
			line2: addressData?.line2 ?? '',
			state: addressData?.state ?? '',
			district: addressData?.district ?? '',
			pincode: addressData?.pincode ?? '',
			type: addressData?.type ?? '',
		},
	});

	const { mutateAsync: createAddress, isPending } = useCreateAddress();
	const { mutateAsync: updateAddress, isPending: isUpdating } =
		useUpdateAddress(parentData?.parent?.addressId as string);
	const { mutate: getPincode } = usePincode();
	const watchPincode = form.watch('pincode');

	useEffect(() => {
		if (type === 'edit' && addressData) {
			form.reset({
				line1: addressData?.line1 ?? '',
				line2: addressData?.line2 ?? '',
				state: addressData?.state ?? '',
				district: addressData?.district ?? '',
				pincode: addressData?.pincode ?? '',
				type: addressData?.type ?? '',
			});
		}
	}, [form, addressData, type]);

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

	const commonInvalidateQuery = () => {
		queryClient.invalidateQueries({
			queryKey: ['clinic/parents', params?.id],
		});
		queryClient.invalidateQueries({
			queryKey: ['address/id', parentData?.parent?.addressId],
		});
	};

	const onSubmit = async (values: IFormData) => {
		if (type === 'add' || !parentData?.parent?.addressId) {
			const res = await createAddress({
				pincode: values.pincode,
				line1: values.line1,
				line2: values.line2 ?? '',
				type: values.type,
				state: values.state,
				district: values.district,
				userId: params?.id,
				isPrimary: true,
			});
			if (res.status === AppConstants.Success) {
				commonInvalidateQuery();
			}
		} else {
			const res = await updateAddress({
				pincode: values.pincode,
				line1: values.line1,
				line2: values.line2 ?? '',
				type: values.type,
				state: values.state,
				district: values.district,
				active: true,
			});
			if (res.status === AppConstants.Success) {
				commonInvalidateQuery();
			}
		}
	};

	return {
		form,
		onSubmit,
		isPending,
		isUpdating,
	};
}
