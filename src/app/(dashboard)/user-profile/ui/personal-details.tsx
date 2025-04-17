/* eslint-disable max-lines-per-function */
'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';

import { useGetUser } from '../../../../api/user-details/user-details';
import { cn } from '../../../../helpers/utils';
import { useAppSelector } from '../../../../store';
import { type IUserDetails } from '../../../../types/user';
import {
	Button,
	Calendar,
	FloatingInput,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../ui/shared';
import useUpdateUserDetails from '../api/update-user-details';

const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	mobile: z.string().optional(),
	email: z.string().email('Invalid email').optional(),
	gender: z.string().min(1, 'Gender is required').optional(),
	dob: z.string().min(1, 'Date of Birth is required').optional(),
});

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
	const authState = useAppSelector((state) => state.auth);
	const { data, refetch } = useGetUser(authState.userId as string);
	const userData = useMemo(() => {
		return data?.data?.user || ({} as IUserDetails);
	}, [data?.data?.user]);
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
	}, [data?.data?.user, form, userData]);

	const onSubmit = async (values: IFormData) => {
		const { mobile, ...rest } = values;
		console.debug(mobile);
		const response = await updateUser(rest);
		if (response.status === 'SUCCESS') {
			refetch();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="shadow-card1 rounded-12 mt-12 grid grid-cols-2 gap-24 bg-white px-16 py-24"
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
								render={({
									field: selectField,
									fieldState,
								}) => {
									return (
										<FormItem>
											<FormLabel>Choose Gender</FormLabel>
											<Select
												onValueChange={
													selectField.onChange
												}
												defaultValue={selectField.value}
												value={selectField.value}
											>
												<FormControl>
													<SelectTrigger
														isError={
															!!fieldState.error
														}
														className="!mt-6 bg-white"
													>
														<SelectValue placeholder="Select a gender" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="M">
														Male
													</SelectItem>
													<SelectItem value="F">
														Female
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									);
								}}
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
					render={({ field }) => (
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
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
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
										onSelect={field.onChange}
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
					)}
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
