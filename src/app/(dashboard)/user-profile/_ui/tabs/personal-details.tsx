/* eslint-disable indent */
/* eslint-disable max-lines-per-function */
'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { z } from 'zod';

import { cn } from '../../../../../helpers/utils';
import { useAuthStore } from '../../../../../store/user-auth';
import { type IUserDetails } from '../../../../../types/user';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../../../ui/shared/form';
import { FloatingInput } from '../../../../../ui/shared/input';
import useUpdateUserDetails from '../../_api/update-user-details';

import { useGetUser } from '@/api/user-details';
import { DEFAULT_DATE_FORMAT } from '@/helpers/constant';
import { Button } from '@/ui/shared/button';
import { Calendar } from '@/ui/shared/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/shared/popover';

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	mobile: z.string().optional(),
	email: z.string().email('Invalid email').optional().or(z.literal('')),
	gender: z
		.string()
		.min(1, 'Gender is required')
		.optional()
		.or(z.literal('')),
	dob: z
		.string()
		.min(1, 'Date of Birth is required')
		.optional()
		.or(z.literal('')),
});

const genders = [
	{ label: 'Male', value: 'M' },
	{ label: 'Female', value: 'F' },
];

type IFormData = z.infer<typeof schema>;

const PersonalDetailsForm = () => {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			mobile: '',
			email: '',
			gender: '',
			dob: '',
		},
	});

	const { userId } = useAuthStore();
	const { data, refetch } = useGetUser(userId as string);
	const userData = useMemo(
		() => data?.data?.user || ({} as IUserDetails),
		[data]
	);

	const { mutateAsync: updateUser, isPending } = useUpdateUserDetails();

	useEffect(() => {
		if (userData) {
			form.reset({
				name: userData?.name || '',
				mobile: userData?.mobile || '',
				email: userData?.email || '',
				gender: userData?.gender || '',
				dob: userData?.dob || '',
			});
		}
	}, [userData, form]);

	const onSubmit = async (values: IFormData) => {
		const { mobile, dob, email, gender, ...rest } = values;

		const payload = {
			...rest,
			email: email || '',
			gender: gender || '',
			dob: dob ? format(new Date(dob), DEFAULT_DATE_FORMAT) : '',
		};
		const response = await updateUser(payload);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="rounded-12 mt-12 grid max-w-3xl grid-cols-2 gap-24 bg-white px-16 py-24"
			>
				{[
					['name', 'Name', 'text'],
					['mobile', 'Mobile Number', 'numeric'],
					['email', 'Email', 'email'],
					['gender', 'Gender', 'text', 'select'],
				].map(([name, label, type, select]) => {
					if (select === 'select') {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({ field }) => (
									<FormItem className="flex flex-col space-y-6">
										<FormLabel>Choose Gender</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														'justify-between font-normal',
														!field.value &&
															'text-muted-foreground'
													)}
												>
													{field.value
														? genders.find(
																(item) =>
																	item.value ===
																	field.value
															)?.label
														: 'Select a gender'}
													<ChevronDown className="ml-2 size-16 shrink-0 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
												{genders.map((item) => (
													<Button
														key={item.value}
														variant="ghost"
														className="w-full justify-start"
														onClick={() =>
															field.onChange(
																item.value
															)
														}
													>
														{item.label}
													</Button>
												))}
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					}
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
											disabled={name === 'mobile'}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					);
				})}
				<FormField
					control={form.control}
					name="dob"
					render={({ field }) => {
						const dateValue = field.value
							? new Date(field.value)
							: undefined;

						return (
							<FormItem className="flex flex-col">
								<FormLabel>Date of birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={'outline'}
												className={cn(
													'text-left font-normal',
													!field.value &&
														'text-muted-foreground'
												)}
											>
												{field.value
													? format(
															new Date(
																field.value
															),
															'PPP'
														)
													: 'Pick a date'}
												<CalendarIcon className="ml-auto size-24 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width]"
										align="start"
									>
										<Calendar
											mode="single"
											selected={dateValue}
											onSelect={(selectedDate) => {
												field.onChange(
													selectedDate
														? selectedDate.toISOString()
														: ''
												);
											}}
											disabled={(date) =>
												date > new Date() ||
												date < new Date('1900-01-01')
											}
										/>
									</PopoverContent>
								</Popover>
								<FormDescription>
									Your date of birth is used to calculate your
									age.
								</FormDescription>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button
					disabled={isPending}
					loading={isPending}
					className="col-span-2 max-w-[240px]"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default PersonalDetailsForm;
