import { memo } from 'react';

import { cn } from '@/helpers/utils';
import useDocumentDownload from '@/hooks/use-download-document';
import { LazyImage } from '@/ui/lazy-image';

function PreviewImage({ url }: { url: string }) {
	const { imgType, url: imgUrl, isPending } = useDocumentDownload(url);

	if (isPending) {
		return <div className="h-[72px] w-[85px] rounded-lg bg-black/10"></div>;
	}

	if (!imgUrl) {
		return;
	}

	return (
		<LazyImage
			src={imgType === 'pdf' ? '/images/pdf.png' : imgUrl}
			className={cn(
				'h-[72px] w-[85px] rounded-lg object-cover',
				imgType === 'pdf' && 'object-contain'
			)}
		/>
	);
}

export default memo(PreviewImage);
