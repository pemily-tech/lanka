import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';

import { Routes } from '../../../helpers/routes';
import { logout } from '../../../helpers/utils';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../shared/alert';
import { ImagePlaceholder } from '../../shared/image';
import NavMenu from './components/menu';

export function DashboardLayoutSidebar() {
	return (
		<nav className="transition-width ease-ease1 fixed top-0 z-[11] h-screen w-[282px] duration-200">
			<div className="flex h-full flex-col justify-between gap-24 p-24">
				<Link
					className="flex gap-12 px-12"
					href={Routes.MEDICAL_RECORDS}
				>
					<ImagePlaceholder
						src="https://pemilyy-assets.s3.ap-south-1.amazonaws.com/logos-new/logo-primary.png"
						containerClasses="h-[48px] flex-1"
						imageClasses="object-contain"
					/>
				</Link>
				<NavMenu />
				<AlertDialog>
					<AlertDialogTrigger className="flex items-center gap-12">
						<LogOutIcon className="size-18" />
						<span>Logout</span>
					</AlertDialogTrigger>
					<AlertDialogContent className="gap-24">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-24">
								Logout
							</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to logout?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="!pt-32">
							<AlertDialogCancel>
								<span className="text-14 font-normal">
									Cancel
								</span>
							</AlertDialogCancel>
							<AlertDialogAction onClick={() => logout()}>
								Logout
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</nav>
	);
}

export default DashboardLayoutSidebar;
