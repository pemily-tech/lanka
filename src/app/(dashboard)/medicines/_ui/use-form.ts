import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';

import { type IMedicine } from '../../../../types/prescription';
import { useCreateMedicine } from '../_api/use-create-medicine';
import { useGetMedicineById } from '../_api/use-get-medicine-byid';
import { useUpdateMedicine } from '../_api/use-update-medicine';
import { type IFormData, schema } from './schema';

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
				brand: medicine?.brand ?? '',
				dose: medicine?.dose ?? '',
				duration: medicine?.duration ?? '',
				frequency: medicine?.frequency ?? '',
				strength: medicine?.strength ?? '',
				interval: medicine?.interval ?? '',
				take: medicine?.take ?? '',
				diagnosis: medicine?.diagnosis ?? '',
				active: medicine?.active,
			}),
			[medicine]
		),
	});

	useEffect(() => {
		if (medicine && Object.keys(medicine).length > 0) {
			form.reset({
				name: medicine?.name ?? '',
				brand: medicine?.brand ?? '',
				dose: medicine?.dose ?? '',
				duration: medicine?.duration ?? '',
				frequency: medicine?.frequency ?? '',
				strength: medicine?.strength ?? '',
				interval: medicine?.interval ?? '',
				take: medicine?.take ?? '',
				diagnosis: medicine?.diagnosis ?? '',
				active: medicine?.active ?? false,
			});
		}
	}, [form, medicine]);

	const onSubmit = async (values: IFormData) => {
		if (type === 'UPDATE') {
			updateMedicine(values);
		} else {
			const { active, ...tempPayload } = values;
			const response = await createMedicine(tempPayload);
			if (response.status === 'SUCCESS') {
				router.back();
			}
		}
	};

	return { form, onSubmit, isUpdaing: isPending, isCreating: isLoading };
};
