import { cn } from '../../../helpers/utils';
import { ImagePlaceholder } from '../image';

export function Spinner({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'shadow-base relative mx-auto flex size-[42px] items-center justify-center rounded-full bg-white',
				className
			)}
		>
			<ImagePlaceholder
				src="/images/logo.jpg"
				containerClasses="h-[18px] w-[18px] rounded-full"
				imageClasses="object-contain"
			/>
			<div className="border-t-brand absolute inset-0 animate-spin rounded-full border-[3px] border-transparent"></div>
		</div>
	);
}

export default Spinner;
