import { memo } from 'react';

import { cn } from '@/helpers/utils';
import useDocumentDownload from '@/hooks/use-download-document';
import { LazyImage } from '@/ui/lazy-image';

function PreviewImage({ url }: { url: string }) {
	const { imgType, url: imgUrl, isPending } = useDocumentDownload(url);

	if (isPending) {
		return (
			<div className="bg-black-1/10 h-[72px] w-[85px] rounded-lg"></div>
		);
	}

	if (!imgUrl) {
		return;
	}

	return (
		<LazyImage
			src={imgType === 'pdf' ? '/images/pdf.png' : imgUrl}
			className={cn(
				'h-[72px] w-[85px] rounded-lg',
				imgType === 'pdf' && 'object-contain'
			)}
		/>
	);
}

export default memo(PreviewImage);
