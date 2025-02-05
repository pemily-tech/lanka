'use client';

import { useState } from 'react';
import { EditIcon, PlusIcon, UploadIcon } from 'lucide-react';

import useGetStaff from '../../../../api/use-get-staff/get-staff';
import useUpdateClinicMemberProfile from '../../../../api/use-update-clinic-member-profile/update-clinic-member-profile';
import { createFormDataForImage } from '../../../../helpers/utils';
import UserProfileImage from '../../../../ui/components/user-profile';
import { Button } from '../../../../ui/shared/button';
import Spinner from '../../../../ui/shared/spinner';
import AddEditStaff from './add-edit-staff';

const StaffList = () => {
	const { data, isPending } = useGetStaff();
	const [open, setOpen] = useState(false);
	const [staffId, setStaffId] = useState<string | null>(null);
	const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
	const { mutate: uploadClinicMemberProfile } = useUpdateClinicMemberProfile(
		staffId as string
	);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const id = buttonElement?.getAttribute('data-id') as string;
		setStaffId(id);
		setOpen(!open);
		setModalType('edit');
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		id: string
	) => {
		setStaffId(id);
		const file = event.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadClinicMemberProfile(formData);
		}
	};

	const handleAdd = () => {
		setOpen(!open);
		setModalType('add');
		setStaffId(null);
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<>
			<AddEditStaff
				staffId={staffId}
				modalType={modalType}
				open={open}
				handleClose={() => setOpen(false)}
			/>
			<section
				onClick={handleClick}
				className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-24 "
			>
				{data?.data?.staffs?.map((staff) => {
					return (
						<section key={staff?.staff?.staffId}>
							<section className="relative w-full cursor-pointer">
								<UserProfileImage
									id={staff?.staff?.staffId}
									containerClasses="!w-full !h-[154px]"
									imageClasses="!rounded-8"
									iconHeight={154}
									iconWidth="100%"
								/>
							</section>
							<section className="flex w-full items-center justify-between gap-6 py-6">
								<span className="flex-1 text-left font-medium">
									{staff?.staff?.name}
								</span>
								<section className="flex gap-8">
									<label className="flex size-24 cursor-pointer items-center justify-center">
										<input
											type="file"
											onChange={(e) =>
												handleChange(
													e,
													staff?.staff?.staffId
												)
											}
											className="hidden w-full"
										/>
										<UploadIcon className="w-22 h-22" />
									</label>
									<Button
										data-id={staff?.staff?.staffId}
										className="flex size-24 items-center justify-center"
									>
										<EditIcon className="size-16" />
									</Button>
								</section>
							</section>
						</section>
					);
				})}
				<Button
					onClick={handleAdd}
					className="border-primary-1 rounded-8 flex size-[154px] cursor-pointer items-center justify-center border-2 border-dashed"
				>
					<section className="bg-primary flex size-[58px] items-center justify-center rounded-full">
						<PlusIcon className="text-white" />
					</section>
				</Button>
			</section>
		</>
	);
};

export default StaffList;
