/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'lucide-react';
import * as yup from 'yup';

import useCreateDoctor from '../../../../api/use-create-doctor/create-doctor';
import useGetDoctorById from '../../../../api/use-get-doctor-by-id/get-doctor-by-id';
import useUpdateDoctor from '../../../../api/use-update-doctor/update-doctor';
import Switch from '../../../../ui/components/switch';
import TextInput from '../../../../ui/components/text-input';
import { Button } from '../../../../ui/shared/button';
import { Dialog } from '../../../../ui/shared/dialog';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	degree: yup.string().required('Degree is required'),
	experience: yup
		.string()
		.required('Experience in years is required')
		.matches(/^\d+$/, 'Expereince should contain only digits'),
	speciality: yup.string().required('Speciality is required'),
});

const AddEditDoctor = ({
	open,
	handleClose,
	doctorId,
	modalType,
}: {
	open: boolean;
	handleClose: () => void;
	doctorId: string | null;
	modalType: 'add' | 'edit' | null;
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const [checked, setChecked] = useState(false);
	const { data } = useGetDoctorById(doctorId as string);
	const doctorData =
		data?.data?.doctors?.[0] || (null as IClinicTypes.IClinicDoctor | null);
	const { mutate: updateDoctor, isPending } = useUpdateDoctor(
		doctorData?.doctor?.doctorId as string,
		handleClose
	);

	const { mutate: createDoctor, isPending: isLoading } =
		useCreateDoctor(handleClose);

	useEffect(() => {
		if (modalType === 'edit' && doctorData && doctorId) {
			setValue('name', doctorData?.doctor?.name);
			setValue('degree', doctorData?.doctor?.degree);
			setValue(
				'experience',
				doctorData?.doctor?.experience
					? String(doctorData?.doctor?.experience)
					: ''
			);
			setValue('speciality', doctorData?.doctor?.speciality);
			setChecked(doctorData?.doctor?.active);
		} else {
			reset({
				name: '',
				degree: '',
				experience: '',
				speciality: '',
			});
			setChecked(false);
		}
	}, [doctorData, doctorId, modalType, reset, setValue]);

	const onSubmit = (values: any) => {
		if (modalType === 'edit') {
			const editData = {
				...values,
				active: checked,
			};
			updateDoctor(editData);
		} else {
			createDoctor(values);
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<section className="rounded-8 bg-white">
				<section className="border-grey-divider flex items-center justify-between border-b p-16">
					<label className="text-18 font-medium">
						{modalType === 'add'
							? 'Add Doctor Details'
							: 'Edit Doctor Details'}
					</label>
					<Button onClick={handleClose}>
						<X width={16} height={16} />
					</Button>
				</section>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mt-[24px] space-y-24 px-24 pb-[42px]"
				>
					<section className="grid grid-cols-2 gap-[42px]">
						<TextInput
							label="Name"
							placeholder=""
							error={errors?.name}
							{...register('name')}
						/>
						<TextInput
							label="Degree"
							placeholder=""
							error={errors?.degree}
							{...register('degree')}
						/>
					</section>
					<section className="grid grid-cols-2 gap-[42px]">
						<TextInput
							label="Experience in Years"
							placeholder=""
							error={errors?.experience}
							{...register('experience')}
						/>
						<TextInput
							label="Speciality"
							placeholder=""
							error={errors?.speciality}
							{...register('speciality')}
						/>
					</section>
					{modalType === 'edit' && (
						<section>
							<Switch
								label="Is doctor active?"
								value={checked}
								onChange={() => setChecked(!checked)}
							/>
						</section>
					)}
					<section className="!mt-32 flex items-center justify-end">
						<Button
							className="min-w-[220px]"
							loading={isPending || isLoading}
							disabled={isPending || isLoading}
						>
							<span className="font-semibold">
								{modalType === 'add'
									? 'Add Doctor'
									: 'Edit Doctor'}
							</span>
						</Button>
					</section>
				</form>
			</section>
		</Dialog>
	);
};

export default AddEditDoctor;
