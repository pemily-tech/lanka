import { LazyImage } from './lazy-image';

import { cn } from '@/helpers/utils';

export function Spinner({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'shadow-base relative mx-auto flex size-11 items-center justify-center rounded-full bg-white',
				className
			)}
		>
			<LazyImage
				src="/images/logo.jpg"
				className="size-5 rounded-full object-contain"
			/>
			<div className="border-t-primary absolute inset-0 animate-spin rounded-full border-[3px] border-transparent"></div>
		</div>
	);
}

export default Spinner;
