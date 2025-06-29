import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import z from 'zod';

import { useCreateCertificate } from '@/api/mutations/use-create-certificate';
import { useGetDropdownList } from '@/api/queries/use-get-dropdownlist';
import { AppConstants } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { cn } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { Button } from '@/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

const schema = z.object({
	type: z.string().nonempty('Please select a type'),
});

type IFormData = z.infer<typeof schema>;

export default function HealthCertificateForm({
	parentId,
	petId,
}: {
	parentId: string;
	petId: string;
}) {
	const form = useForm<IFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			type: '',
		},
	});
	const { data } = useGetDropdownList('CERTIFICATE');
	const dropdownData =
		data?.data?.dropdown || ([] as { label: string; value: string }[]);
	const searchParams = useSearchParams();
	const startDate = searchParams.get('startDate');
	const endDate = searchParams.get('endDate');
	const active = searchParams.get('active');
	const page = searchParams.get('page');
	const searchTerm = searchParams.get('searchTerm');
	const { mutateAsync: createCertificate, isPending } =
		useCreateCertificate();
	const router = useRouter();

	const onSubmit = async (values: IFormData) => {
		const payload = {
			patientId: petId,
			parentId,
			type: values.type,
		};
		const response = await createCertificate(payload);
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: [
					'certificate/list',
					{
						count: 1,
						startDate,
						endDate,
						active,
						page,
						searchTerm,
					},
				],
			});
			router.push(
				`${Routes.HEALTH_CERTIFICATE_EDIT_ITEM}/${response?.data?.certificate?.certificateNo}`
			);
		}
	};

	return (
		<div className={cn('mb-12 mt-1 flex h-full flex-col')}>
			<h2 className="mx-6 text-2xl font-semibold mb-6">
				Please select a certificate type
			</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-1 flex-col"
				>
					<div className="mx-6 flex max-w-sm flex-1 flex-col gap-6">
						<FormField
							control={form.control}
							name="type"
							render={({ field: selectField }) => {
								return (
									<FormItem className="col-span-1 space-y-[0px]">
										<FormLabel>Type</FormLabel>
										<Select
											onValueChange={selectField.onChange}
											defaultValue={selectField.value}
											value={selectField.value}
										>
											<FormControl>
												<SelectTrigger className="bg-white w-full">
													<SelectValue placeholder="Select a type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{dropdownData.map((item, i) => {
													return (
														<SelectItem
															key={`${i}`}
															value={item.value}
														>
															{item.label}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<Button
							type="submit"
							disabled={isPending}
							className="px-6"
						>
							Confirm
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
