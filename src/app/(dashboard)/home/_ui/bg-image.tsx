'use client';

import { LazyImage } from '@/ui/lazy-image';

export function BgImage() {
	return (
		<LazyImage
			className="size-full object-cover"
			src="/images/home-bg.webp"
		/>
	);
}
