import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { type IMedicine } from '../../../../types/prescription';
import { useCreateMedicine } from '../_api/use-create-medicine';
import { useGetMedicineById } from '../_api/use-get-medicine-byid';
import { useUpdateMedicine } from '../_api/use-update-medicine';
import { type IFormData, schema } from './schema';

import { AppConstants } from '@/helpers/primitives';

export const useMedicineForm = (type: 'UPDATE' | 'CREATE') => {
	const params = useParams();
	const router = useRouter();
	const { data } = useGetMedicineById(params?.id as string);
	const { mutateAsync: updateMedicine, isPending } = useUpdateMedicine(
		params?.id as string
	);
	const { mutateAsync: createMedicine, isPending: isLoading } =
		useCreateMedicine();
	const medicine = useMemo(() => {
		return data?.data?.medicine?.medicines?.[0] || ({} as IMedicine);
	}, [data?.data?.medicine?.medicines]);

	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: useMemo(
			() => ({
				name: medicine?.name ?? '',
				dose: medicine?.dose ?? '',
				duration: medicine?.duration ?? '',
				frequency: medicine?.frequency ?? '',
				strength: medicine?.strength ?? '',
				interval: medicine?.interval ?? '',
				take: medicine?.take ?? '',
				active: medicine?.active ?? true,
			}),
			[medicine]
		),
	});

	useEffect(() => {
		if (medicine && Object.keys(medicine).length > 0) {
			form.reset({
				name: medicine?.name ?? '',
				dose: medicine?.dose ?? '',
				duration: medicine?.duration ?? '',
				frequency: medicine?.frequency ?? '',
				strength: medicine?.strength ?? '',
				interval: medicine?.interval ?? '',
				take: medicine?.take ?? '',
				active: medicine?.active ?? false,
			});
		}
	}, [form, medicine]);

	const onSubmit = async (values: IFormData) => {
		if (type === 'UPDATE') {
			updateMedicine(values);
		} else {
			const response = await createMedicine(values);
			if (response.status === AppConstants.Success) {
				router.back();
			}
		}
	};

	return { form, onSubmit, isUpdating: isPending, isCreating: isLoading };
};
