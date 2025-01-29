'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import * as yup from 'yup';

import useUpdateUserDetails from '../../../../api/update-user-details/update-user-details';
import { useGetUser } from '../../../../api/user-details/user-details';
import { useAppSelector } from '../../../../store';
import Radio from '../../../../ui/components/radio';
import TextInput from '../../../../ui/components/text-input';
import { Button } from '../../../../ui/shared/button';

const validationSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	mobile: yup.string(),
	email: yup.string().email('Invalid email'),
});

const PersonalDetailsForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'all',
	});
	const authState = useAppSelector((state) => state.auth);
	const { data } = useGetUser(authState.userId as string);
	const [userDob, setDob] = useState<Date>(new Date());
	const [userGender, setGender] = useState('M');
	const { mutate: updateUser, isPending } = useUpdateUserDetails();
	const { name, mobile, email, dob, gender } = data?.data?.user || {};

	useEffect(() => {
		if (data?.data?.user) {
			setValue('name', name as string);
			setValue('mobile', mobile);
			setValue('email', email);
			if (dob) {
				setDob(new Date(dob));
			}
			setGender(gender || 'M');
		}
	}, [data?.data?.user, dob, email, gender, mobile, name, setValue]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (values: any) => {
		const payload = {
			name: values.name,
			email: values.email,
			gender: userGender,
			dob: format(userDob, 'yyyy-MM-dd'),
		};
		updateUser(payload);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<section className="mb-24 grid grid-cols-2 gap-24">
				<TextInput
					label="Name"
					placeholder="Enter your Mobile Number"
					error={errors?.name}
					{...register('name')}
				/>
				<TextInput
					label="Mobile Number"
					type="numeric"
					placeholder=""
					error={errors?.mobile}
					maxLength={10}
					readonly={true}
					disabled={true}
					{...register('mobile')}
				/>
			</section>
			<section className="mb-24 grid grid-cols-2 gap-24">
				<TextInput
					label="Email"
					placeholder="Enter your Email ID"
					error={errors?.email}
					{...register('email')}
				/>
				<section className="flex flex-col">
					<label className="text-14">Date of Birth</label>
					<DatePicker
						className="mt-[4px] bg-white"
						onChange={(date) => date && setDob(date)}
						selected={userDob}
						maxDate={new Date()}
						dateFormat="yyyy-MM-dd"
					/>
				</section>
			</section>
			<section className="mb-24 grid grid-cols-2 gap-24">
				<section>
					<label className="text-14 leading-14 mb-10 block">
						Choose Gender
					</label>
					<section className="rounded-8 border-grey-divider flex h-[52px] items-center gap-24 border bg-white px-12">
						<Radio
							label="Male"
							value="M"
							checked={userGender === 'M'}
							name="male"
							onChange={() => setGender('M')}
						/>
						<Radio
							label="Female"
							value="F"
							checked={userGender === 'F'}
							name="female"
							onChange={() => setGender('F')}
						/>
					</section>
				</section>
			</section>
			<section className="!mt-[42px]">
				<Button
					className="min-w-[250px]"
					loading={isPending}
					disabled={isPending}
				>
					<span className="font-bold">Save Profile</span>
				</Button>
			</section>
		</form>
	);
};

export default PersonalDetailsForm;
