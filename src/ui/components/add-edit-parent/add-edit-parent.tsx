/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useCreateParent from '../../../api/use-create-parent/create-parent';
import useGetParentById from '../../../api/use-get-parent-by-id/get-parent-by-id';
import useUpdateParent from '../../../api/use-update-parent/update-parent';
import { phoneValidator } from '../../../helpers/utils';
import { useAppSelector } from '../../../store';
import { Button } from '../../shared/button';
import Switch from '../switch';
import TextInput from '../text-input';

const getValidationSchema = (type: 'add' | 'edit') =>
	yup.object().shape({
		mobileNumber:
			type === 'add'
				? yup
						.string()
						.required('Phone number is required')
						.matches(phoneValidator, 'Phone number is not valid')
				: yup.string().notRequired(),
		name:
			type === 'edit'
				? yup.string().required('Name is required')
				: yup.string().notRequired(),
		comment: yup.string(),
	});

const AddEditParent = () => {
	const modalState = useAppSelector((state) => state.modal);
	const { parentId, memberId } = modalState.data;
	const validationSchema = getValidationSchema(
		modalState.type as 'add' | 'edit'
	);
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		register,
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});
	const [checked, setChecked] = useState(false);
	const { data } = useGetParentById(parentId as string);
	const parentData =
		data?.data?.parents?.[0] || (null as IClinicTypes.IPetParent | null);
	const { mutate: updateParent, isPending } = useUpdateParent({
		memberId,
		parentId,
		refetchParents: modalState.refetch as () => void,
	});
	const { mutate: createParent, isPending: isLoading } = useCreateParent({
		refetch: modalState.refetch as () => void,
	});

	useEffect(() => {
		if (modalState.type === 'edit' && parentData && parentId) {
			setValue('name', parentData?.parent?.name);
			setValue('comment', parentData?.comment);
			setChecked(parentData?.active);
		} else {
			reset({
				mobileNumber: '',
			});
			setChecked(false);
		}
	}, [modalState.type, parentData, parentId, reset, setValue]);

	const onSubmit = (values: any) => {
		if (modalState.type === 'edit') {
			const updateData = {
				name: values.name,
				active: checked,
				...(values.comment.length > 0 && { comment: values.comment }),
			};
			updateParent(updateData);
		} else {
			const payload = {
				mobileNumber: values.mobileNumber,
				...(values.name.length > 0 && { name: values.name }),
			};
			createParent(payload);
		}
	};

	return (
		<section className="rounded-8 bg-white">
			<section className="border-grey-divider flex items-center justify-between border-b p-16">
				<label className="text-18 font-medium">
					{modalState.type === 'add'
						? 'Add Parent Details'
						: 'Edit Parent Details'}
				</label>
			</section>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-[24px] space-y-24 px-24 pb-[42px]"
			>
				{modalState.type === 'add' && (
					<section className="grid grid-cols-2 gap-[42px]">
						<TextInput
							label="Mobile Number"
							placeholder=""
							error={errors?.mobileNumber}
							{...register('mobileNumber')}
						/>
						<TextInput
							label="Name"
							placeholder=""
							error={errors?.name}
							{...register('name')}
						/>
					</section>
				)}
				{modalState.type === 'edit' && (
					<>
						<section className="grid grid-cols-2 gap-[42px]">
							<TextInput
								label="Name"
								placeholder=""
								error={errors?.name}
								{...register('name')}
							/>
							<TextInput
								label="Comment"
								placeholder=""
								error={errors?.name}
								{...register('comment')}
							/>
						</section>
						<section>
							<Switch
								label="Is parent active?"
								value={checked}
								onChange={() => setChecked(!checked)}
							/>
						</section>
					</>
				)}
				<section className="!mt-32 flex items-center justify-end">
					<Button
						className="min-w-[220px]"
						loading={isPending || isLoading}
						disabled={isPending || isLoading}
					>
						<span className="font-black tracking-[-0.41px]">
							{modalState.type === 'add'
								? 'Add Parent'
								: 'Edit Parent'}
						</span>
					</Button>
				</section>
			</form>
		</section>
	);
};

export default AddEditParent;
