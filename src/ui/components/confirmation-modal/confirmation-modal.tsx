import { X } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../../store';
import { closeModal } from '../../../store/modal';
import { Button } from '../../shared/button';

export function ConfirmationModal() {
	const dispatch = useAppDispatch();
	const modalState = useAppSelector((state) => state.modal);

	const handleClose = () => {
		dispatch(closeModal());
	};

	const handleConfirm = () => {
		if (modalState.onHandleConfirm) {
			modalState.onHandleConfirm();
		}
		handleClose();
	};

	return (
		<section className="rounded-8 mx-auto max-w-md bg-white">
			<header className="py-18 border-grey-divider flex justify-between border-b px-16">
				<h2 className="text-18 font-semibold">
					{modalState.confirmationTitle}
				</h2>
				<Button variant="ghost" size="icon" onClick={handleClose}>
					<X width={16} height={16} />
				</Button>
			</header>
			<p className="px-16 pt-24">{modalState.confirmationHeading}</p>
			<footer className="border-grey-divider flex items-center justify-end gap-24 px-16 py-24">
				<Button variant="ghost" size="icon" onClick={handleClose}>
					Cancel
				</Button>
				{modalState.onHandleConfirm && (
					<Button onClick={handleConfirm}>Confirm</Button>
				)}
			</footer>
		</section>
	);
}

export default ConfirmationModal;
