import { ImagePlaceholder } from '../image';

export function Spinner() {
	return (
		<div className="shadow-base relative mx-auto flex size-[42px] items-center justify-center rounded-full bg-white">
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
