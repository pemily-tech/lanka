'use client';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useGetUserProfileUrl } from '../../../../api/profile-image';
import useGetParentById from '../../../../api/use-get-parent-by-id/get-parent-by-id';
import useGetPets from '../../../../api/use-get-pets/get-pets';
import { ApiEndpoints, ModalTypes } from '../../../../helpers/primitives';
import { createFormDataForImage } from '../../../../helpers/utils';
import useRouterQuery from '../../../../hooks/use-router-query';
import { HttpService } from '../../../../services/http-service';
import { openModal } from '../../../../store/modal';
import { type IPet } from '../../../../types/common';

import { env } from '@/env.mjs';

export default function usePetParentHook(
	parentId: string,
	memberId: string,
	refetchParents: () => void
) {
	const dispatch = useDispatch();
	const { router } = useRouterQuery();
	const { data, refetch: refetchUrl } = useGetUserProfileUrl(
		parentId as string
	);
	const { data: parentData, refetch: refecthUser } = useGetParentById(
		parentId as string
	);
	const { profileUrl } = data?.data || {};
	const { parent } = parentData?.data?.parents?.[0] || {};
	const { data: petsData } = useGetPets(parentId as string);
	const { pets } = petsData?.data || {};

	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const formData = createFormDataForImage(file, 'file');
			try {
				const { data } = await HttpService.patch(
					`${env.NEXT_PUBLIC_BASE_PATH}/${ApiEndpoints.UploadClinicMemberProfile}/${parentId}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
							'cache-control': 'no-cache',
						},
					}
				);
				if (data.status === 'SUCCESS') {
					refetchUrl();
					refecthUser();
				}
			} catch (err) {
				console.error(err);
				throw new Error('Network Error');
			}
		}
	};

	const handleEditParent = useCallback(() => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PARENT,
				type: 'edit',
				data: {
					parentId: parentId,
					memberId: memberId,
				},
				refetch: refetchParents,
			})
		);
	}, [memberId, parentId]);

	const handleAddParent = useCallback(() => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PARENT,
				type: 'add',
				data: null,
				refetch: refetchParents,
			})
		);
	}, []);

	const handlePet = useCallback((pet: IPet) => {
		router.push(`/pet/${pet.petId}?parentId=${parentId}`);
	}, []);

	const handleAddPet = useCallback(() => {
		dispatch(
			openModal({
				isOpen: true,
				view: ModalTypes.ADD_EDIT_PET,
				type: 'add',
				data: {
					parentId,
				},
				refetch: refetchParents,
			})
		);
	}, [parentId]);

	return {
		handleAddPet,
		handlePet,
		handleEditParent,
		onChange,
		profileUrl,
		parent,
		pets,
		handleAddParent,
	};
}
