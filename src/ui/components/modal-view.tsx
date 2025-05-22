'use client';

import { useCallback, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import dynamic from 'next/dynamic';

import Loading from '../../app/loading';
import { ModalTypes } from '../../helpers/primitives';
import useRouterQuery from '../../hooks/use-router-query';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeModal, type MODAL_VIEW } from '../../store/modal';

const ConfirmationModal = dynamic(
	() => import('../components/confirmation-modal/confirmation-modal'),
	{
		loading: () => <Loading />,
	}
);

const SearchParent = dynamic(
	() => import('../components/search-parents-modal/search-parents-modal'),
	{
		loading: () => <Loading />,
	}
);

const AddEditPetModal = dynamic(
	() => import('../components/add-edit-pet/add-edit-pet'),
	{
		loading: () => <Loading />,
	}
);

function renderModalContent(view: MODAL_VIEW | string) {
	switch (view) {
		case ModalTypes.CONFIRMATION_MODAL:
			return <ConfirmationModal />;
		case ModalTypes.ADD_EDIT_PET:
			return <AddEditPetModal />;
		case ModalTypes.SEARCH_PARENTS:
			return <SearchParent />;
		default:
			return null;
	}
}

export function ModalView() {
	const { pathname, params } = useRouterQuery();
	const dispatch = useAppDispatch();
	const modalData = useAppSelector((state) => state.modal);
	const { isOpen, view, center, maxWidth } = modalData;

	const handleClose = useCallback(() => {
		dispatch(closeModal());
	}, []);

	useEffect(() => {
		handleClose();
	}, [pathname, params, handleClose]);

	return (
		<Dialog
			className="relative z-[999] focus:outline-none"
			onClose={handleClose}
			open={isOpen}
		>
			<DialogBackdrop className="fixed inset-0 bg-gray-700 bg-opacity-60 backdrop-blur" />
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div
					className={`flex min-h-full justify-center  ${center && 'items-center'} p-4`}
				>
					<DialogPanel
						transition
						className={`w-full ${
							maxWidth ? maxWidth : 'max-w-2xl'
						} rounded-8 data-[closed]:transform-[scale(95%)] duration-300 ease-out data-[closed]:opacity-0`}
					>
						<div className="relative z-[999] inline-block w-full text-left align-middle">
							{view && renderModalContent(view)}
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}

export default ModalView;
