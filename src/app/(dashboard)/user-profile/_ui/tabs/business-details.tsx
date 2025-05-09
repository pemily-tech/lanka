'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CameraIcon, UserIcon } from 'lucide-react';
import { z } from 'zod';

import useGetClinicLogo from '../../../../../api/get-clinic-logo';
import useUploadClinicLogo from '../../../../../api/upload-clinic-logo';
import useUpdateBusiness from '../../../../../api/use-update-business/update-business';
import { useGetUser } from '../../../../../api/user-details/user-details';
import {
	createFormDataForImage,
	gstValidator,
	panValidator,
	phoneValidator,
} from '../../../../../helpers/utils';
import { useAuthStore } from '../../../../../store/user-auth';
import {
	Button,
	FloatingInput,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../../../../ui/shared';

const schema = z.object({
	ownerName: z.string().optional().or(z.literal('')),
	pan: z
		.string()
		.regex(panValidator, 'Pan is not valid')
		.optional()
		.or(z.literal('')),
	gstNo: z
		.string()
		.regex(gstValidator, 'Gst is not valid')
		.optional()
		.or(z.literal('')),
	businessContact: z
		.string()
		.regex(phoneValidator, 'Phone number is not valid')
		.optional()
		.or(z.literal('')),
});

type IFormData = z.infer<typeof schema>;

const BusinessForm = () => {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			ownerName: '',
			pan: '',
			gstNo: '',
			businessContact: '',
		},
	});
	const { userId } = useAuthStore();
	const { data } = useGetUser(userId as string);
	const { mutate: updateBusiness, isPending } = useUpdateBusiness();
	const { data: getLogo } = useGetClinicLogo();
	const { mutate: uploadLogo } = useUploadClinicLogo();

	useEffect(() => {
		const user = data?.data?.user;
		if (user) {
			form.reset({
				ownerName: user.ownerName || '',
				pan: user.pan || '',
				gstNo: user.gstNo || '',
				businessContact: user.businessContact || '',
			});
		}
	}, [data?.data?.user]);

	const onSubmit = (values: IFormData) => {
		const { businessContact, ...restValues } = values;
		const payload = {
			...restValues,
			...(businessContact
				? { businessContact: Number(businessContact) }
				: {}),
		};
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
		<div className="flex max-w-4xl gap-32 bg-white">
			<div className="w-[200px]">
				<div className="border-primary-1 relative flex size-[200px] items-center justify-center rounded-full border">
					{getLogo?.data?.logoUrl && getLogo?.data?.logoUrl !== '' ? (
						<img
							alt="logo"
							src={getLogo?.data?.logoUrl as string}
							className="size-[200px] rounded-full object-fill"
						/>
					) : (
						<UserIcon width={120} height={120} />
					)}
					<label className="z-3 bg-primary shadow-base3 absolute right-0 top-[26px] flex size-[32px] cursor-pointer items-center justify-center rounded-full">
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
				</div>
				<div
					className="text-10 text-purple mt-6 text-center font-medium"
					style={{ wordSpacing: '-0.1em', lineHeight: '1.2' }}
				>
					<span className="font-bold">NOTE: </span>THE ABOVE IMAGE IS
					A PREVIEW AND WILL APPEAR AS THE LOGO ON HEALTH
					CERTIFICATES. PLEASE USE A HIGH-QUALITY IMAGE, PREFERABLY
					200x200px.
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="rounded-12 mt-12 grid flex-1 grid-cols-2 gap-24 bg-white px-16 py-24"
				>
					{[
						[
							'businessContact',
							'Business Contact Number',
							'numeric',
						],
						['ownerName', 'Owner Name', 'text'],
						['pan', 'PAN', 'text'],
						['gstNo', 'GST No', 'text'],
					].map(([name, label, type, placeholder]) => {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({ field, fieldState }) => (
									<FormItem className="relative">
										<FormControl>
											<FloatingInput
												label={label}
												id={name}
												isError={!!fieldState.error}
												type={type || 'text'}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					})}
					<Button
						disabled={isPending}
						loading={isPending}
						className="col-span-2 max-w-[240px]"
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default BusinessForm;
