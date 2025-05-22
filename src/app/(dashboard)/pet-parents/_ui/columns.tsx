import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { type ColumnDef } from '@tanstack/react-table';
import { CircleUserRound, Edit, Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { useUploadPetParentProfile } from '../_api/use-upload-profile';

import { useGetUserProfileUrl } from '@/api/profile-image';
import { MAX_SIZE_500 } from '@/helpers/constant';
import { Routes } from '@/helpers/routes';
import { cn, createFormDataForImage } from '@/helpers/utils';
import { queryClient } from '@/services/providers';
import { type IPetParent } from '@/types/clinic';
import { Button } from '@/ui/shared/button';
import { LazyImage } from '@/ui/shared/lazy-image';

export function useColumns(): ColumnDef<IPetParent>[] {
	return [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className="flex items-center gap-12">
					<UserImage id={row.original.parent.parentId} />
					<span>{row.original.parent.name}</span>
				</div>
			),
		},
		{
			accessorKey: 'petNames',
			header: 'Pet Names',
			cell: ({ row }) => (
				<div>{row.original.parent.petNames.join(', ')}</div>
			),
		},
		{
			accessorKey: 'mobile',
			header: 'Mobile Number',
			cell: ({ row }) => <span>{row.original.parent.mobile}</span>,
		},
		{
			id: 'buttons',
			header: 'Actions',
			cell: ({ row }) => (
				<div className="flex items-center gap-12">
					<Link
						href={`${Routes.PARENTS_UPDATE}/${row.original.parent.parentId}`}
						className="flex size-24 items-center justify-center"
					>
						<Button
							size="icon"
							variant="ghost"
							data-umami-event="parents_edit_button"
							data-umami-event-id={row.original.parent.parentId}
						>
							<Edit className="size-18" />
						</Button>
					</Link>
				</div>
			),
		},
	];
}

const UserImage = ({ id }: { id: string }) => {
	const { data } = useGetUserProfileUrl(id as string);
	const profileUrl = data?.data?.profileUrl;
	const { mutateAsync: uploadProfile } = useUploadPetParentProfile(id);

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			acceptedFiles.map(async (acceptedFile) => {
				const formData = createFormDataForImage(
					acceptedFile as File,
					'file'
				);
				const response = await uploadProfile(formData);
				if (response.status === 'SUCCESS') {
					queryClient.invalidateQueries({
						queryKey: ['user/profileUrl', id],
					});
				}
			});

			fileRejections.forEach((rejection) => {
				rejection.errors.forEach((error) => {
					if (error.code === 'file-too-large') {
						toast.error(
							'File is too large. Maximum size allowed is 500KB.'
						);
					} else {
						toast.error(error.message);
					}
				});
			});
		},
		[]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		maxSize: MAX_SIZE_500,
	});

	return (
		<div className="relative cursor-pointer" {...getRootProps()}>
			<input {...getInputProps()} />
			<span className="bg-primary absolute bottom-0 right-0 rounded-full border border-white">
				<Plus className="size-14 p-2 text-white" />
			</span>
			{profileUrl && profileUrl !== '' ? (
				<LazyImage
					src={profileUrl}
					className="size-[54px] rounded-lg object-cover"
				/>
			) : (
				<CircleUserRound color="#cacfd2" width={54} height={54} />
			)}
		</div>
	);
};
