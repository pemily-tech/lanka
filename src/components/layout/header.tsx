'use client';

import { useState } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useGetUser } from '@/api/queries/use-get-user-details';
import { Roles } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { logout } from '@/helpers/utils';
import { useAuthStore } from '@/store/user-auth';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/ui/alert';
import { Button } from '@/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Loader } from '@/ui/loader';

export function LayoutHeader() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { mobile, name } = useAuthStore();
	const [openDialog, setOpenDialog] = useState(false);

	const isHome = pathname === Routes.HOME;

	const handleBack = () => {
		if (pathname.includes(Routes.HEALTH_CERTIFICATE_EDIT_ITEM)) {
			const params = new URLSearchParams(searchParams.toString());
			const queryString = params.toString();
			const url = `${Routes.HEALTH_CERTIFICATE_LIST}?${queryString}`;
			router.replace(url);
		} else {
			router.back();
		}
	};

	const handleLogout = () => {
		logout();
		router.replace(Routes.LOGIN);
	};

	return (
		<>
			<header className="fixed top-0 z-50 h-[72px] w-full border-b border-border bg-white px-4">
				<div className="flex items-center justify-between gap-3 pr-[16rem]">
					<div className="flex items-center justify-between gap-3 py-6">
						<div className="flex flex-row items-center gap-3">
							{!isHome && (
								<Button
									onClick={handleBack}
									variant="ghost"
									size="icon"
								>
									<ChevronLeft className="size-6" />
								</Button>
							)}
							<ClinicDetails />
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="gap-1 focus-visible:ring-0"
							>
								<span>{name || mobile}</span>
								<ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-56 border border-neutral-200"
							align="end"
						>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuGroup>
								<DropdownMenuItem className="cursor-pointer">
									<Link
										href={`${Routes.USER_PROFILE}?type=personal`}
										className="cursor-pointer"
									>
										Profile
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => setOpenDialog(true)}
								className="cursor-pointer"
							>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
				<AlertDialogContent className="gap-6">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-xl font-semibold">
							Logout
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to logout?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex justify-end gap-2">
						<Button
							variant="ghost"
							onClick={() => setOpenDialog(false)}
						>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleLogout}>
							Log out
						</Button>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

function StaffName({ id }: { id: string }) {
	const { data } = useGetUser(id as string);
	const { name } = data?.data?.user || {};
	return <p className="text-lg font-semibold">{name}</p>;
}

function ClinicDetails() {
	const { userId, role } = useAuthStore();
	const { data, isLoading } = useGetUser(userId as string);
	const { name, clinicId } = data?.data?.user || {};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="flex-1">
			{role === Roles.Staff ? (
				<StaffName id={clinicId as string} />
			) : (
				<p className="text-lg font-medium">{name}</p>
			)}
		</div>
	);
}

export default LayoutHeader;
