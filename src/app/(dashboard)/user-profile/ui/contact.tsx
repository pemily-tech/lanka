import { Globe, MailIcon, PhoneIcon } from 'lucide-react';

import { ImagePlaceholder } from '../../../../ui/shared/image';

const Contact = () => {
	return (
		<div className="mt-54 relative flex flex-col gap-[82px]">
			<div className="rounded-8 relative col-span-1 flex items-center gap-24 bg-[#E4FFF0] px-24 py-[32px]">
				<PhoneIcon />
				<a
					target="_blank"
					className="text-18 font-bold"
					href="tel:7047037587"
				>
					7047037587
				</a>
				<div className="absolute bottom-10 right-12">
					<ImagePlaceholder
						src="/images/contact-3.png"
						containerClasses="w-[106px] h-[149px]"
						imageClasses="bg-contain"
					/>
				</div>
			</div>
			<div className="rounded-8 relative col-span-1 flex items-center justify-end gap-24 bg-[#FFECFA] px-24 py-32">
				<div className="absolute bottom-12 left-[42px]">
					<ImagePlaceholder
						src="/images/contact-2.png"
						containerClasses="w-[91px] h-[128px]"
						imageClasses="bg-contain"
					/>
				</div>
				<MailIcon />
				<a
					target="_blank"
					className="text-18 font-bold"
					href="mailto:care@pemilly.com"
				>
					care@pemilly.com
				</a>
			</div>
			<div className="rounded-8 relative col-span-1 flex items-center gap-24 bg-[#E4EFFF] px-24 py-32">
				<Globe />
				<a
					target="_blank"
					className="text-18 font-bold"
					href="https://www.pemilyy.com/"
				>
					pemilyy.com
				</a>
				<div className="absolute bottom-10 right-12">
					<ImagePlaceholder
						src="/images/contact-1.png"
						containerClasses="w-[128px] h-[128px]"
						imageClasses="bg-contain"
					/>
				</div>
			</div>
		</div>
	);
};

export default Contact;
