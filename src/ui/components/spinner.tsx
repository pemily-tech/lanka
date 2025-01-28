'use client';

import { useSelector } from 'react-redux';

import { type RootState } from '../../store';
import Spinner from '../shared/spinner';

export const LoadingModal = () => {
	const { isOpen, view, loadingText } = useSelector(
		(state: RootState) => state.layout
	);

	if (!isOpen || view !== 'LOADING') return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="bg-black-1/80 absolute inset-0"></div>
			<div className="rounded-12 relative z-10 flex flex-col gap-12 bg-white p-16">
				<Spinner />
				<span className="text-14 font-medium">{loadingText}</span>
			</div>
		</div>
	);
};
