'use client';

import { useState } from 'react';
import { EditIcon, PlusIcon, UploadIcon } from 'lucide-react';

import useGetDoctors from '../../../../api/use-get-doctors/get-doctors';
import useUpdateClinicMemberProfile from '../../../../api/use-update-clinic-member-profile/update-clinic-member-profile';
import { createFormDataForImage } from '../../../../helpers/utils';
import UserProfileImage from '../../../../ui/components/user-profile';
import { Button } from '../../../../ui/shared/button';
import Spinner from '../../../../ui/shared/spinner';
import AddEditDoctor from './add-edit-doctor';

const DoctorsList = () => {
	const { data, isPending } = useGetDoctors();
	const [open, setOpen] = useState(false);
	const [doctorId, setDoctorId] = useState<string | null>(null);
	const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
	const { mutate: uploadClinicMemberProfile } = useUpdateClinicMemberProfile(
		doctorId as string
	);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const buttonElement = (event.target as HTMLElement).closest('button');
		const id = buttonElement?.getAttribute('data-id') as string;
		setDoctorId(id);
		setOpen(!open);
		setModalType('edit');
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		id: string
	) => {
		setDoctorId(id);
		const file = event.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			uploadClinicMemberProfile(formData);
		}
	};

	const handleAdd = () => {
		setOpen(!open);
		setModalType('add');
		setDoctorId(null);
	};

	if (isPending) {
		return <Spinner />;
	}

	return (
		<>
			<AddEditDoctor
				doctorId={doctorId}
				modalType={modalType}
				open={open}
				handleClose={() => setOpen(false)}
			/>
			<section
				onClick={handleClick}
				className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-24 "
			>
				{data?.data?.doctors?.map((doctor) => {
					return (
						<section key={doctor?.doctor?.doctorId}>
							<section className="relative w-full cursor-pointer">
								<UserProfileImage
									id={doctor?.doctor?.doctorId}
									containerClasses="!w-full !h-[154px]"
									imageClasses="!rounded-8"
									iconHeight={154}
									iconWidth="100%"
								/>
							</section>
							<section className="flex w-full items-center justify-between gap-6 py-6">
								<span className="flex-1 text-left font-medium">
									{doctor?.doctor?.name}
								</span>
								<section className="flex gap-8">
									<label className="flex size-24 cursor-pointer items-center justify-center">
										<input
											type="file"
											onChange={(e) =>
												handleChange(
													e,
													doctor?.doctor?.doctorId
												)
											}
											className="hidden w-full"
										/>
										<UploadIcon className="w-22 h-22" />
									</label>
									<Button
										data-id={doctor?.doctor?.doctorId}
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

export default DoctorsList;
