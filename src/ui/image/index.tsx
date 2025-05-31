import Image from 'next/image';

import { cn } from '@/helpers/utils';

export interface ImagePlaceholderProps
	extends React.HTMLAttributes<HTMLElement> {
	alt?: string;
	src: string;
	containerClasses?: string;
	imageClasses?: string;
	sizes?: string;
	priority?: boolean;
}

export const shimmer = () => `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" style="fill:rgb(211,211,211);" />
</svg>`;

export const toBase64 = (str: string) =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str);

function ImagePlaceholder(props: ImagePlaceholderProps) {
	const {
		alt = 'pemilyy',
		src,
		containerClasses = '',
		imageClasses,
		sizes = '100vw',
		priority = false,
		...rest
	} = props;

	if (!src) {
		return;
	}

	return (
		<figure className={cn('relative', containerClasses)} {...rest}>
			<Image
				src={src}
				alt={alt}
				fill
				sizes={sizes}
				className={imageClasses}
				placeholder="blur"
				blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
				priority={priority}
			/>
		</figure>
	);
}

export { ImagePlaceholder };
