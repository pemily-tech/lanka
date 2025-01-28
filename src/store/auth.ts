import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

type AuthState = {
	loading: boolean;
	loggedIn: boolean;
	token: null | string;
	refreshToken: null | string;
	userId?: null | string;
	mobile?: null | string;
	name?: string;
	active?: boolean;
	gender?: string;
	role?: null | string;
	clinicIds?: string[];
	createdAt?: string;
	updatedAt?: string;
	iat?: number;
	exp?: number;
	subscription?: null | IAuthTypes.ISubscription;
};

const initialState: AuthState = {
	loading: false,
	loggedIn: false,
	token: null,
	refreshToken: null,
};

type AuthenticatePayload = {
	token: string;
	refreshToken: string;
	navigateFunction: () => void;
};

export const authenticateUser = createAsyncThunk(
	'auth/authenticateUser',
	async (
		{ token, refreshToken, navigateFunction }: AuthenticatePayload,
		{ dispatch, rejectWithValue }
	) => {
		try {
			const userDetails = jwtDecode(token);
			dispatch(
				updateUser({
					loggedIn: true,
					token,
					refreshToken,
					...(userDetails as Partial<AuthState>),
				})
			);
			navigateFunction();
		} catch (error) {
			console.error(error);
			return rejectWithValue('Failed to decode token');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<Partial<AuthState>>) => {
			Object.assign(state, action.payload);
		},
		resetUser: (state) => {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(authenticateUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(authenticateUser.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { updateUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
