import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth';
import layoutReducer from './layout';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	// modal: modalReducer,
	// snackbar: snackbarReducer,
	layout: layoutReducer,
	auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		process.env.NODE_ENV === 'development'
			? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
			: getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
