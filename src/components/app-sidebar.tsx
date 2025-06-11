'use client';

import {
	ChevronRight,
	House,
	LogOutIcon,
	PackageSearch,
	Pill,
	ReceiptIndianRupee,
	UserCircleIcon,
	UserRoundCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useGetNavigation } from '../api/queries/use-get-navigation';
import { logout } from '../helpers/utils';
import { useAuthStore } from '../store/user-auth';
import { type INavigationItem } from '../types/common';
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
} from '../ui/alert';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
} from '../ui/sidebar';

import { LazyImage } from '@/ui/lazy-image';

const IconMap: Record<string, React.ElementType> = {
	House,
	UserCircleIcon,
	ReceiptIndianRupee,
	PackageSearch,
	Pill,
};

export const AppSidebar = () => {
	const { name, mobile, role } = useAuthStore();
	const { data } = useGetNavigation();
	const navMenu: INavigationItem[] = data?.data || [];
	const filteredNavMenu = navMenu.filter((item) => {
		if (!item.roles) return true;
		return item.roles.includes(role);
	});

	const handleLogout = () => {
		logout();
	};

	return (
		<Sidebar collapsible="icon" className="bg-white">
			<SidebarHeader className="px-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<UserRoundCheck className="text-primary !size-5" />
							<span className="text-sm">{name || mobile}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="py-6">
				<SidebarGroup>
					<Menu navMenu={filteredNavMenu} role={role} />
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="px-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="p-0" asChild>
							<div>
								<AlertDialog>
									<AlertDialogTrigger
										className="flex w-full items-center gap-3 py-3 cursor-pointer"
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
											>
												Logout
											</AlertDialogAction>
											<AlertDialogCancel
												data-umami-event="user_logout_cancel_button"
												data-umami-event-id={mobile}
												className="px-4"
											>
												<span className="text-sm">
													Cancel
												</span>
											</AlertDialogCancel>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			{/* <SidebarRail /> */}
		</Sidebar>
	);
};

const Menu = ({
	navMenu,
	role,
}: {
	navMenu: INavigationItem[];
	role: string;
}) => {
	const pathname = usePathname();

	return (
		<SidebarMenu className="gap-6 px-2">
			{navMenu.map((item, index) => {
				const Icon =
					item.icon && IconMap[item.icon] ? IconMap[item.icon] : null;
				const active =
					pathname === item.path ||
					pathname.split('/')[1] === item.path.split('/')[1];

				if (item.type === 'menu') {
					return <MenuItem key={index} item={item} role={role} />;
				} else {
					return (
						<SidebarMenuButton
							className={`${
								active
									? 'text-accent-foreground hover:text-accent-foreground bg-gray-200 py-6 hover:bg-gray-300 hover:opacity-80'
									: 'px-0'
							}`}
							key={index}
							asChild
						>
							<Link href={item.path}>
								{item.isIcon && Icon ? (
									<div className="flex size-8 items-center justify-center">
										<Icon className="!size-6" />
									</div>
								) : (
									<LazyImage
										className="size-8"
										src={item.icon as string}
									/>
								)}
								<span className="text-sm">{item.title}</span>
							</Link>
						</SidebarMenuButton>
					);
				}
			})}
		</SidebarMenu>
	);
};

const MenuItem = ({ item, role }: { item: INavigationItem; role: string }) => {
	const Icon = item.icon && IconMap[item.icon] ? IconMap[item.icon] : null;
	const pathname = usePathname();
	const activeItem = pathname.split('/').filter(Boolean)[0];
	const activeCollapse = `/${activeItem}` === item.path;
	const visibleItems = (item.items || []).filter(
		(subItem) => !subItem.roles || subItem.roles.includes(role)
	);

	return (
		<Collapsible
			defaultOpen={activeCollapse}
			key={item.id}
			className="group/collapsible"
		>
			<SidebarMenuItem className="py-1">
				<CollapsibleTrigger asChild>
					<SidebarMenuButton className="px-0">
						{Icon && <Icon className="!size-5" />}
						<span className="text-sm">{item.title}</span>
						<ChevronRight className="ml-auto !size-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="mx-0 ml-6 mt-2 gap-3 px-0">
						{visibleItems?.map((ite, index) => {
							const active = pathname === ite.path;
							return (
								<SidebarMenuSubItem key={index}>
									<SidebarMenuSubButton
										className={`${
											active
												? 'text-accent-foreground hover:text-accent-foreground bg-gray-200 px-3 py-6 hover:bg-gray-300 hover:opacity-80'
												: ''
										}`}
										asChild
									>
										<Link href={ite.path}>
											<span className="text-sm">
												{ite.title}
											</span>
										</Link>
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							);
						})}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
};
