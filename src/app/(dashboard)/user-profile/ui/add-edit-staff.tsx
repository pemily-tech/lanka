/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'lucide-react';
import * as yup from 'yup';

import useCreateStaff from '../../../../api/use-create-staff/create-staff';
import useGetStaffById from '../../../../api/use-get-staff-by-id/get-staff-by-id';
import useUpdateStaff from '../../../../api/use-update-staff/update-staff';
import { type IClinicStaff } from '../../../../types/clinic';
import Switch from '../../../../ui/components/switch';
import TextInput from '../../../../ui/components/text-input';
import { Button } from '../../../../ui/shared/button';
import { Dialog } from '../../../../ui/shared/dialog';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
});

const AddEditStaff = ({
	open,
	handleClose,
	staffId,
	modalType,
}: {
	open: boolean;
	handleClose: () => void;
	staffId: string | null;
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
	const { data } = useGetStaffById(staffId as string);
	const staffData = data?.data?.staffs?.[0] || (null as IClinicStaff | null);
	const { mutate: updateStaff, isPending } = useUpdateStaff(
		staffData?.staff?.staffId as string,
		handleClose
	);
	const { mutate: createStaff, isPending: isLoading } =
		useCreateStaff(handleClose);

	useEffect(() => {
		if (modalType === 'edit' && staffData && staffId) {
			setValue('name', staffData?.staff?.name);
			setChecked(staffData?.staff?.active);
		} else {
			reset({
				name: '',
			});
			setChecked(false);
		}
	}, [staffData, staffId, modalType, reset, setValue]);

	const onSubmit = (values: any) => {
		if (modalType === 'edit') {
			const editData = {
				...values,
				active: checked,
			};
			updateStaff(editData);
		} else {
			createStaff(values);
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<section className="rounded-8 bg-white">
				<section className="border-grey-divider flex items-center justify-between border-b p-16">
					<label className="text-18 font-medium">
						{modalType === 'add'
							? 'Add Staff Details'
							: 'Edit Staff Details'}
					</label>
					<Button onClick={handleClose}>
						<X width={16} height={16} />
					</Button>
				</section>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="mt-[24px] space-y-24 px-24 pb-[42px]"
				>
					<section className="">
						<TextInput
							label="Name"
							placeholder=""
							error={errors?.name}
							{...register('name')}
						/>
					</section>
					{modalType === 'edit' && (
						<section>
							<Switch
								label="Is staff active?"
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
									? 'Add Staff'
									: 'Edit Staff'}
							</span>
						</Button>
					</section>
				</form>
			</section>
		</Dialog>
	);
};

export default AddEditStaff;
