import { Fragment, type ReactNode } from 'react';
import { Portal, Transition } from '@headlessui/react';

export function Sidebar({
	children,
	isOpen,
	handleClose,
}: {
	children: ReactNode;
	isOpen: boolean;
	handleClose: () => void;
}) {
	return (
		<Portal>
			<div
				className={`shadow-base2 fixed right-0 top-0
         z-[9999] h-screen w-[400px] bg-white
          transition-all duration-150
          ${isOpen ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-full opacity-0'}
        `}
			>
				{children}
			</div>
			<Transition as={Fragment} show={isOpen}>
				<div
					className="overlay fixed inset-0 z-[999]  bg-gray-700 bg-opacity-0 backdrop-blur"
					onClick={handleClose}
				></div>
			</Transition>
		</Portal>
	);
}

export default Sidebar;
