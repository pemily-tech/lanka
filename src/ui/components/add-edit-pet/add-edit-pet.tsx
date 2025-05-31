/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import Select, { type SingleValue } from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { toast } from 'sonner';
import * as yup from 'yup';

import useCreatePet from '../../../api/use-create-pet/create-pet';
import useGetPetById from '../../../api/use-get-pet-by-id/get-pet-by-id';
import usePetBreed from '../../../api/use-pet-breed/pet-breed';
import useUpdatePet from '../../../api/use-update-pet/update-pet';
import { customSelectBoxStyles } from '../../../helpers/utils';
import { useAppSelector } from '../../../store';
import { Button } from '../../shared/button';
import Radio from '../radio';
import TextInput from '../text-input';

interface OptionType {
	value: string;
	label: string;
}

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	microChipNo: yup.string(),
	oldCode: yup.string(),
});

export function AddEditPet() {
	const modalState = useAppSelector((state) => state.modal);
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		register,
		reset,
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const { data } = useGetPetById(modalState.data?.petId as string);
	const {
		name,
		breed,
		microChipNo,
		oldCode,
		type: petType,
		dob: petDob,
		gender: petGender,
	} = data?.data?.pet || {};
	const [dob, setDob] = useState<any>(new Date());
	const [gender, setGender] = useState('M');
	const [type, setType] = useState<string>('');
	const { mutate: updatePet, isPending } = useUpdatePet(
		modalState.data?.petId as string
	);
	const { mutate: createPet, isPending: isLoading } = useCreatePet({
		parentId: modalState?.data?.parentId,
		refetchParents: modalState?.refetch as () => void,
	});
	const { data: breedsData } = usePetBreed({ type });
	const breedData = breedsData?.data?.breeds;
	const [selectedBreed, setSelectedBreed] =
		useState<SingleValue<OptionType>>(null);

	useEffect(() => {
		if (modalState.type === 'edit' && name && modalState.data?.petId) {
			setValue('name', name);
			if (microChipNo) {
				setValue('microChipNo', microChipNo);
			}
			if (oldCode) {
				setValue('oldCode', oldCode);
			}
			if (breed) {
				setSelectedBreed({ value: breed, label: breed });
			}
			if (petDob) {
				setDob(new Date(petDob));
			}
			if (petType) {
				setType(petType);
			}
			setGender(petGender || 'M');
		} else {
			reset({
				name: '',
			});
			reset({
				microChipNo: '',
			});
			reset({
				oldCode: '',
			});
			setType('');
			setSelectedBreed(null);
			setGender(petGender || 'M');
			if (petDob) {
				setDob(new Date(petDob));
			}
		}
	}, [
		breed,
		microChipNo,
		oldCode,
		modalState.data?.petId,
		modalState.type,
		name,
		petDob,
		petGender,
		petType,
		reset,
		setValue,
	]);

	const handleChange = (option: SingleValue<OptionType>) => {
		setSelectedBreed(option);
	};

	const onSubmit = (values: any) => {
		if (!type) {
			toast.error('Choose type');
			return;
		}
		if (!selectedBreed) {
			toast.error('Choose Breed');
			return;
		}
		if (modalState.type === 'edit') {
			const payload = {
				...values,
				gender,
				breed: selectedBreed?.value,
				type,
				dob: format(dob, 'yyyy-MM-dd'),
			};
			updatePet(payload);
		} else {
			const payload = {
				...values,
				gender,
				type,
				breed: selectedBreed?.value,
				dob: format(dob, 'yyyy-MM-dd'),
				parentId: modalState?.data?.parentId,
			};
			createPet(payload);
		}
	};

	return (
		<div className="rounded-8 bg-white">
			<div className="border-grey-divider flex items-center justify-between border-b p-16">
				<label className="text-18 font-medium">
					{modalState.type === 'add'
						? 'Add Pet Details'
						: 'Edit Pet Details'}
				</label>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-[24px] space-y-24 px-24 pb-[42px]"
			>
				<div className="grid grid-cols-2 gap-[42px]">
					<TextInput
						label="Name"
						placeholder=""
						error={errors?.name}
						{...register('name')}
					/>
					<div className="flex flex-col">
						<label className="text-14">Date of Birth</label>
						<DatePicker
							className="mt-[4px] bg-white"
							onChange={setDob}
							selected={dob}
							maxDate={new Date()}
							dateFormat="yyyy-MM-dd"
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-[42px]">
					<div>
						<label className="text-14 leading-14 mb-10 block">
							Choose Type
						</label>
						<div className="rounded-8 border-grey-divider flex h-[52px] items-center gap-24 border bg-white px-12">
							<Radio
								label="Dog"
								value="DOG"
								checked={type === 'DOG'}
								name="male"
								onChange={() => {
									setType('DOG');
									setSelectedBreed(null);
								}}
							/>
							<Radio
								label="Cat"
								value="CAT"
								checked={type === 'CAT'}
								name="female"
								onChange={() => {
									setType('CAT');
									setSelectedBreed(null);
								}}
							/>
						</div>
					</div>
					<div>
						<label className="text-14 leading-14 mb-[10px] block cursor-pointer">
							Choose Breed
						</label>
						<Select
							options={breedData}
							className="react-select-container h-[52px]"
							classNamePrefix="react-select"
							styles={customSelectBoxStyles}
							onChange={handleChange}
							value={selectedBreed}
							isDisabled={!type}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-[42px]">
					<div>
						<label className="text-14 leading-14 mb-10 block">
							Choose Gender
						</label>
						<div className="rounded-8 border-grey-divider flex h-[52px] items-center gap-24 border bg-white px-12">
							<Radio
								label="Male"
								value="M"
								checked={gender === 'M'}
								name="male"
								onChange={() => setGender('M')}
							/>
							<Radio
								label="Female"
								value="F"
								checked={gender === 'F'}
								name="female"
								onChange={() => setGender('F')}
							/>
						</div>
					</div>
					<div>
						<TextInput
							label="Microchip No."
							placeholder=""
							error={errors?.microChipNo}
							{...register('microChipNo')}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-[42px]">
					<div>
						<TextInput
							label="Old Code"
							placeholder=""
							error={errors?.oldCode}
							{...register('oldCode')}
						/>
					</div>
				</div>
				<div className="!mt-32 flex items-center justify-end">
					<Button
						className="min-w-[220px]"
						loading={isPending || isLoading}
						disabled={isPending || isLoading}
					>
						<span className="font-semibold">
							{modalState.type === 'add' ? 'Add Pet' : 'Edit Pet'}
						</span>
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AddEditPet;
