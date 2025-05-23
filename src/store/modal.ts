/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type ModalTypes } from '../helpers/primitives';

export type MODAL_VIEW =
	| ModalTypes.CONFIRMATION_MODAL
	| ModalTypes.ADD_EDIT_PET
	| ModalTypes.LOADING_MODAL
	| ModalTypes.SEARCH_PARENTS
	| '';

type ModalState = {
	isOpen: boolean;
	view: MODAL_VIEW;
	onHandleConfirm?: () => void;
	confirmationTitle?: string;
	confirmationHeading?: string;
	data?: any;
	type?: 'add' | 'edit';
	refetch?: () => void;
	center?: boolean;
	maxWidth?: string;
};

const initialState: ModalState = {
	isOpen: false,
	view: '',
	center: true,
	maxWidth: 'max-w-2xl',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<Partial<ModalState>>) => {
			state.isOpen = true;
			Object.assign(state, action.payload);
		},
		closeModal: (state) => {
			state.isOpen = false;
		},
		confimationModal: (
			state,
			action: PayloadAction<Partial<ModalState>>
		) => {
			state.confirmationTitle = action.payload.confirmationTitle;
			state.onHandleConfirm = action.payload.onHandleConfirm;
			state.confirmationHeading = action.payload.confirmationHeading;
			Object.assign(state, action.payload);
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
