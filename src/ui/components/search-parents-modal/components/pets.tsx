'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useGetPets from '../../../../api/use-get-pets/get-pets';
import Loading from '../../../../app/loading';
import { useAppSelector } from '../../../../store';
import { closeModal } from '../../../../store/modal';
import Spinner from '../../../shared/spinner';
import Pet from './pet';

const RecordUpload = dynamic(() => import('./record-upload'), {
	loading: () => <Loading />,
});

// const VaccinationForm = dynamic(
// 	() => import('../../vaccination-form/vaccination-form'),
// 	{
// 		loading: () => <Loading />,
// 	}
// );

const FollowupForm = dynamic(
	() => import('../../followup-form/followup-form'),
	{
		loading: () => <Loading />,
	}
);

function PetsList({
	activeParent,
	activeClinic,
}: {
	activeParent: string;
	activeClinic: string;
}) {
	const { data, isPending } = useGetPets(activeParent as string);
	const [activePet, setActivePet] = useState('');
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const modalData = useAppSelector((state) => state.modal);
	const recordType = modalData?.data?.type;
	const activeFilter = modalData?.data?.activeFilter;
	const refetch = modalData?.data?.refetch;
	const dispatch = useDispatch();

	const petsData = useMemo(() => {
		return data?.data?.pets || [];
	}, [data?.data?.pets]);

	const handleKeyDown = useCallback(
		(ev: KeyboardEvent) => {
			if (petsData?.length <= 0) {
				return;
			}
			let newIndex = focusedIndex;

			if (ev.code === 'ArrowLeft') {
				newIndex = focusedIndex > 0 ? focusedIndex - 1 : 0;
			} else if (ev.code === 'ArrowRight') {
				newIndex =
					focusedIndex < petsData.length - 1
						? focusedIndex + 1
						: petsData.length - 1;
			}
			if (newIndex !== focusedIndex) {
				setFocusedIndex(newIndex);
				setActivePet(petsData[newIndex]?.petId);
			}
		},
		[focusedIndex, petsData]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	const handlePet = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();
			const id = (e.target as HTMLElement)
				.closest('[data-id]')
				?.getAttribute('data-id') as string;
			const index = petsData?.findIndex((pet) => pet.petId === id);
			setActivePet(id);
			setFocusedIndex(index);
		},
		[petsData]
	);

	const handleClose = useCallback(() => {
		dispatch(closeModal());
	}, []);

	if (isPending) {
		return (
			<div className="text-14 ml-[48px] pt-16 font-medium">
				<Spinner />
			</div>
		);
	}

	if (petsData.length <= 0) {
		return (
			<div className="text-14 ml-[48px] pt-16 font-medium">
				No Pets found.
			</div>
		);
	}

	return (
		<div className="ml-[48px] pt-16">
			<div onClick={handlePet}>
				<Swiper
					navigation
					pagination
					modules={[Navigation]}
					className="pet"
					slidesPerView={5}
				>
					{petsData?.map((pet, index) => {
						const active = activePet === pet.petId;
						return (
							<SwiperSlide key={pet.petId}>
								<Pet
									pet={pet}
									height="h-[92px]"
									containerStyles={
										active
											? 'bg-white p-8 shadow-base'
											: 'p-8'
									}
									index={index}
								/>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			{Boolean(activePet) && recordType === 'medical-records' && (
				<RecordUpload
					filter={activeFilter}
					parentId={activeParent}
					petId={activePet}
					refetch={refetch}
					activeClinic={activeClinic}
				/>
			)}
			{/* {Boolean(activePet) && recordType === 'vaccination' && (
				<VaccinationForm
					parentId={activeParent}
					petId={activePet}
					refetch={refetch}
					handleClose={handleClose}
					type="modal"
				/>
			)} */}
			{Boolean(activePet) && recordType === 'follow-up' && (
				<FollowupForm
					parentId={activeParent}
					petId={activePet}
					refetch={refetch}
					handleClose={handleClose}
					type="modal"
				/>
			)}
		</div>
	);
}

export default memo(PetsList);
