import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';

import { type IMedicine } from '../../../../types/prescription';
import { useGetMedicineById } from '../_api/use-get-medicine-byid';
import { type IFormData, schema } from './schema';

export const useMedicineForm = () => {
	const params = useParams();
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			dose: '',
		},
	});
	const { data } = useGetMedicineById(params?.id as string);
	const medicine = data?.data?.medicine?.medicines?.[0] || ({} as IMedicine);

	useEffect(() => {
		if (medicine && Object.keys(medicine).length > 0) {
			form.reset({
				name: medicine?.name,
				dose: medicine?.dose,
			});
		}
	}, []);

	const onSubmit = async (values: IFormData) => {
		console.log(values);
	};

	return { form, onSubmit };
};
