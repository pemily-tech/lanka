import { CircleUserRoundIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '../../../../helpers/utils';
import useRouterQuery from '../../../../hooks/use-router-query';
import { PetParentIcon } from '../../../icons/pet-parent';
import { ImagePlaceholder } from '../../../shared/image';

const menu = [
	{
		link: '/home',
		icon: '/images/house.png',
		text: 'Home',
		type: 'image',
	},
	{
		link: '/medical-records',
		icon: '/images/medical-records.png',
		text: 'Medical Records',
		type: 'image',
	},
	{
		link: '/vaccination-records',
		icon: '/images/vaccination-records.png',
		text: 'Vaccination Records',
		type: 'image',
	},
	{
		link: '/follow-up',
		icon: '/images/follow-ups.png',
		text: 'Follow Ups',
		type: 'image',
	},
	{
		link: '/pet-parents',
		icon: <PetParentIcon className="text-primary" width={24} height={24} />,
		text: 'Pet Parents',
		type: 'icon',
	},
	{
		link: '/user-profile',
		icon: <CircleUserRoundIcon width={24} height={24} />,
		text: 'Profile',
		type: 'icon',
	},
];

export default function NavMenu() {
	const { pathname } = useRouterQuery();

	return (
		<nav className="mt-32 flex-1">
			<ul className="flex flex-col gap-24">
				{menu.map((item) => {
					const active = item.link === pathname;

					return (
						<li key={item.text}>
							<Link
								className={cn(
									'flex gap-12',
									active
										? 'shadow-base rounded-8 bg-white p-12'
										: ''
								)}
								href={item.link}
							>
								{item?.type === 'icon' ? (
									item?.icon
								) : (
									<ImagePlaceholder
										containerClasses="w-24 h-24"
										src={item.icon as string}
									/>
								)}
								<span className="text-14">{item.text}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
