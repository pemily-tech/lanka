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

import { useGetNavigation } from '../../api/layout/use-get-navigation';
import { logout } from '../../helpers/utils';
import { useAppSelector } from '../../store';
import { useAuthStore } from '../../store/user-auth';
import { type INavigationItem } from '../../types/common';
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
} from '../shared/alert';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../shared/collapsible';
import { ImagePlaceholder } from '../shared/image';
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
} from '../shared/sidebar';

const IconMap: Record<string, React.ElementType> = {
	House,
	UserCircleIcon,
	ReceiptIndianRupee,
	PackageSearch,
	Pill,
};

export const AppSidebar = () => {
	const { name, mobile } = useAuthStore();
	const { data } = useGetNavigation();
	const navMenu: INavigationItem[] = data?.data || [];

	const handleLogout = () => {
		logout();
	};

	return (
		<Sidebar collapsible="icon" className="bg-white">
			<SidebarHeader className="px-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<UserRoundCheck className="text-primary" />
							<span className="text-14">{name || mobile}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="py-24">
				<SidebarGroup>
					<Menu navMenu={navMenu} />
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="px-8">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="p-0" asChild>
							<div>
								<AlertDialog>
									<AlertDialogTrigger className="flex w-full items-center gap-12 py-12">
										<LogOutIcon width={16} height={16} />
										<span className="text-14">Logout</span>
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
											<AlertDialogAction
												onClick={handleLogout}
												className="px-24"
											>
												Logout
											</AlertDialogAction>
											<AlertDialogCancel>
												<span className="text-14">
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
			<SidebarRail />
		</Sidebar>
	);
};

const Menu = ({ navMenu }: { navMenu: INavigationItem[] }) => {
	const pathname = usePathname();

	return (
		<SidebarMenu className="gap-24 px-8">
			{navMenu.map((item, index) => {
				const Icon =
					item.icon && IconMap[item.icon] ? IconMap[item.icon] : null;
				const active =
					pathname === item.path ||
					pathname.split('/')[1] === item.path.split('/')[1];

				if (item.type === 'menu') {
					return <MenuItem key={index} item={item} />;
				} else {
					return (
						<SidebarMenuButton
							className={`${
								active
									? 'bg-grey-bg3 text-accent-foreground hover:bg-greyBg hover:text-accent-foreground py-12 hover:opacity-80'
									: 'px-0'
							}`}
							key={index}
							asChild
						>
							<Link href={item.path}>
								{item.isIcon && Icon ? (
									<div className="flex size-32 items-center justify-center">
										<Icon className="!size-24" />
									</div>
								) : (
									<ImagePlaceholder
										containerClasses="w-32 h-32"
										src={item.icon as string}
									/>
								)}
								<span className="text-14">{item.title}</span>
							</Link>
						</SidebarMenuButton>
					);
				}
			})}
		</SidebarMenu>
	);
};

const MenuItem = ({ item }: { item: INavigationItem }) => {
	const Icon = item.icon && IconMap[item.icon] ? IconMap[item.icon] : null;
	const pathname = usePathname();
	const activeItem = pathname.split('/').filter(Boolean)[0];
	const activeCollapse = `/${activeItem}` === item.path;

	return (
		<Collapsible
			defaultOpen={activeCollapse}
			key={item.id}
			className="group/collapsible"
		>
			<SidebarMenuItem className="py-6">
				<CollapsibleTrigger asChild>
					<SidebarMenuButton className="px-0">
						{Icon && <Icon className="!size-18" />}
						<span className="text-14">{item.title}</span>
						<ChevronRight className="!size-18 ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub className="mx-0 ml-24 mt-8 gap-12 px-0">
						{item.items?.map((ite, index) => {
							const active = pathname === ite.path;
							return (
								<SidebarMenuSubItem key={index}>
									<SidebarMenuSubButton
										className={`${
											active
												? 'text-accent-foreground hover:bg-greyBg hover:text-accent-foreground bg-grey-bg3 p-12 hover:opacity-80'
												: ''
										}`}
										asChild
									>
										<Link href={ite.path}>
											<span className="text-14">
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
