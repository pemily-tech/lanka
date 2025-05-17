import { Globe, Mail, PhoneIcon } from 'lucide-react';

const contactInfo = [
	{
		label: 'Phone',
		value: '7047037587',
		href: 'tel:7047037587',
		icon: PhoneIcon,
	},
	{
		label: 'Email',
		value: 'care@pemilly.com',
		href: 'mailto:care@pemilly.com',
		icon: Mail,
	},
	{
		label: 'Website',
		value: 'pemilyy.com',
		href: 'https://www.pemilyy.com/',
		icon: Globe,
	},
];

export default function Contact() {
	return (
		<div className="mt-16 grid max-w-3xl grid-cols-2 gap-24">
			{contactInfo.map(({ label, value, href, icon: Icon }) => (
				<div
					key={label}
					className="bg-grey-1/30 flex gap-16 rounded-lg border p-12"
				>
					<div className="bg-primary/10 flex size-[54px] items-center justify-center rounded-full">
						<Icon />
					</div>
					<div className="flex flex-col">
						<span className="text-base font-medium">{label}</span>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={href}
						>
							{value}
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
