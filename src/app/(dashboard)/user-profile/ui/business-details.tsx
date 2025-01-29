'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CameraIcon, UserIcon } from 'lucide-react';

import useGetClinicLogo from '../../../../api/get-clinic-logo';
import useUploadClinicLogo from '../../../../api/upload-clinic-logo';
import useUpdateBusiness from '../../../../api/use-update-business/update-business';
import { useGetUser } from '../../../../api/user-details/user-details';
import { createFormDataForImage } from '../../../../helpers/utils';
import { useAppSelector } from '../../../../store';
import TextInput from '../../../../ui/components/text-input';
import { Button } from '../../../../ui/shared/button';

// const validationSchema = yup.object().shape({
// 	ownerName: yup.string(),
// 	pan: yup.string().matches(panValidator, 'Pan is not valid'),
// 	gstNo: yup.string().matches(gstValidator, 'Gst is not valid'),
// 	businessContact: yup.string().matches(phoneValidator, 'Phone number is not valid'),
// });

const BusinessForm = () => {
	const { register, handleSubmit, setValue } = useForm();
	const authState = useAppSelector((state) => state.auth);
	const { data } = useGetUser(authState.userId as string);
	const { mutate: updateBusiness, isPending } = useUpdateBusiness();
	const { ownerName, pan, gstNo, businessContact } = data?.data?.user || {};
	const { data: getLogo } = useGetClinicLogo();
	const { mutate: uploadLogo } = useUploadClinicLogo();

	useEffect(() => {
		if (data?.data?.user) {
			setValue('ownerName', ownerName || '');
			setValue('pan', pan || '');
			setValue('gstNo', gstNo || '');
			setValue('businessContact', businessContact || '');
		}
	}, [businessContact, data?.data?.user, gstNo, ownerName, pan, setValue]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (values: any) => {
		const { businessContact, ...restValues } = values;
		const payload = { ...restValues };
		if (businessContact !== '') {
			payload.businessContact = Number(businessContact);
		}
		updateBusiness(payload);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadLogo(formData);
		}
	};

	return (
		<div className="flex gap-32">
			<div>
				<div className="border-primary-1 relative size-[200px] rounded-full border bg-white">
					{getLogo?.data?.logoUrl && getLogo?.data?.logoUrl !== '' ? (
						<img
							crossOrigin="anonymous"
							alt="logo"
							src={getLogo?.data?.logoUrl as string}
							className="size-[200px] rounded-full object-fill"
						/>
					) : (
						<UserIcon width={200} height={200} />
					)}
					<label className="z-3 bg-primary-1 shadow-base3 absolute right-0 top-[26px] flex size-[32px] cursor-pointer items-center justify-center rounded-full">
						<input
							type="file"
							onChange={onChange}
							className="hidden w-full"
						/>
						<CameraIcon
							className="text-white"
							width={18}
							height={18}
						/>
					</label>
					<div
						className="text-10 text-purple mt-6 text-center font-medium"
						style={{ wordSpacing: '-0.1em', lineHeight: '1.2' }}
					>
						<span className="font-bold">NOTE: </span>THE ABOVE IMAGE
						IS A PREVIEW AND WILL APPEAR AS THE LOGO ON HEALTH
						CERTIFICATES. PLEASE USE A HIGH-QUALITY IMAGE,
						PREFERABLY 200x200px.
					</div>
				</div>
			</div>
			<form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
				<section className="mb-24 grid grid-cols-2 gap-24">
					<TextInput
						label="Business Contact Number"
						type="numeric"
						placeholder=""
						maxLength={10}
						{...register('businessContact')}
					/>
					<TextInput
						label="Owner Name"
						placeholder=""
						{...register('ownerName')}
					/>
				</section>
				<section className="mb-24 grid grid-cols-2 gap-24">
					<TextInput
						label="PAN"
						placeholder="FLKPXXXXXX"
						{...register('pan')}
					/>
					<TextInput
						label="GST No"
						placeholder="29AAXXXXXXXXXXX"
						{...register('gstNo')}
					/>
				</section>
				<section className="!mt-[42px]">
					<Button
						className="min-w-[250px]"
						loading={isPending}
						disabled={isPending}
					>
						<span className="font-bold">Save</span>
					</Button>
				</section>
			</form>
		</div>
	);
};

export default BusinessForm;
