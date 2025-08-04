import { LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Routes } from '@/helpers/routes';
import { logout } from '@/helpers/utils';
import { useAuthStore } from '@/store/user-auth';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/ui/alert';
import { AlertDialogFooter, AlertDialogHeader } from '@/ui/alert';

export function LogoutAlert() {
	const router = useRouter();
	const { mobile } = useAuthStore();

	const handleLogout = () => {
		logout();
		router.replace(Routes.LOGIN);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger
				className="flex w-full items-center gap-3 cursor-pointer"
				data-umami-event="user_logout_button"
				data-umami-event-id={mobile}
			>
				<LogOutIcon width={16} height={16} />
				<span className="text-sm">Logout</span>
			</AlertDialogTrigger>
			<AlertDialogContent className="gap-6">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-xl font-semibold">
						Logout
					</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to logout?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="!pt-2">
					<AlertDialogAction
						onClick={handleLogout}
						className="px-6"
						data-umami-event="user_logout_confirm_button"
						data-umami-event-id={mobile}
						variant="destructive"
					>
						Logout
					</AlertDialogAction>
					<AlertDialogCancel
						data-umami-event="user_logout_cancel_button"
						data-umami-event-id={mobile}
						className="px-4"
					>
						<span className="text-sm">Cancel</span>
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
