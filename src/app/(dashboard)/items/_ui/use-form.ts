import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { useCreateItem } from '../_api/use-create-item';
import { useGetItemById } from '../_api/use-get-item-byid';
import { useUpdateItem } from '../_api/use-update-item';
import { type IFormData, schema } from './schema';

import { AppConstants } from '@/helpers/primitives';
import { type IItem, IItemType } from '@/types/bills-items';

export const useItemForm = (type: 'UPDATE' | 'CREATE') => {
	const params = useParams();
	const router = useRouter();
	const itemId = params?.id as string | undefined;

	const { data } = useGetItemById(itemId ?? '');
	const { mutateAsync: updateItem, isPending } = useUpdateItem(itemId ?? '');
	const { mutateAsync: createItem, isPending: isLoading } = useCreateItem();

	const item = useMemo(() => data?.data?.item || ({} as IItem), [data]);

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: useMemo(() => {
			const isValidType = (val: any): val is IItemType =>
				Object.values(IItemType).includes(val);

			return {
				name: item?.name ?? '',
				description: item?.description ?? '',
				price: item?.price?.toString() ?? '',
				mrp: item?.mrp?.toString() ?? '',
				quantity: item?.quantity?.toString() ?? '',
				discount: item?.discount?.toString() ?? '',
				type: isValidType(item?.type) ? item.type : IItemType.PRODUCT,
			} satisfies IFormData;
		}, [item]),
	});

	const watchMrp = form.watch('mrp');
	const watchPrice = form.watch('price');

	useEffect(() => {
		if (
			watchMrp &&
			watchPrice &&
			!isNaN(+watchMrp) &&
			!isNaN(+watchPrice)
		) {
			const calculatedDiscount = Math.max(+watchMrp - +watchPrice, 0);
			form.setValue('discount', calculatedDiscount.toFixed(2));
		}
	}, [watchMrp, watchPrice, form]);

	const isValidEnum = (val: any): val is IItemType =>
		Object.values(IItemType).includes(val);

	useEffect(() => {
		if (item && Object.keys(item).length > 0) {
			form.reset({
				name: item.name ?? '',
				description: item.description ?? '',
				price: item.price?.toString() ?? '',
				mrp: item.mrp?.toString() ?? '',
				quantity: item.quantity?.toString() ?? '',
				discount: item.discount?.toString() ?? '',
				type: isValidEnum(item.type) ? item.type : IItemType.PRODUCT,
			});
		}
	}, [form, item]);

	const onSubmit = async (values: IFormData) => {
		const payload = {
			name: values.name,
			type: values.type,
			description: values.description ?? '',
			quantity: Number(values.quantity),
			mrp: Number(values.mrp),
			price: Number(values.price),
			discount: Number(values.discount),
		};

		if (type === 'UPDATE') {
			const response = await updateItem(payload);
			if (response.status === AppConstants.Success) {
				router.back();
			}
		} else {
			const response = await createItem(payload);
			if (response.status === AppConstants.Success) {
				router.back();
			}
		}
	};

	return {
		form,
		onSubmit,
		isUpdating: isPending,
		isCreating: isLoading,
	};
};
