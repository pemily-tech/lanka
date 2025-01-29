import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	mobileMenu: false,
	isOpen: false,
	view: 'LOADING',
	loadingText: '',
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		handleMobileMenu: (state, action) => {
			state.mobileMenu = action.payload;
		},
		openDialog: (state, action) => {
			state.isOpen = true;
			Object.assign(state, action.payload);
		},
		closeDialog: (state) => {
			state.isOpen = false;
		},
		// handleSidebarCollapsed: (state, action) => {
		// 	state.isCollapsed = action.payload;
		// 	if (typeof window !== 'undefined') {
		// 		window?.localStorage.setItem('sidebarCollapsed', action.payload);
		// 	}
		// },
		// handleRtl: (state, action) => {
		// 	state.isRTL = action.payload;
		// 	if (typeof window !== 'undefined') {
		// 		window?.localStorage.setItem('direction', JSON.stringify(action.payload));
		// 	}
		// },
	},
});

export const { handleMobileMenu, openDialog, closeDialog } =
	layoutSlice.actions;

export default layoutSlice.reducer;
