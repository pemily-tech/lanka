import { memo } from 'react';

import { cn } from '@/helpers/utils';
import useDocumentDownload from '@/hooks/use-download-document';
import { BlurImage } from '@/ui/blur-image';

function PreviewImage({ url }: { url: string }) {
	const { imgType, url: imgUrl, isPending } = useDocumentDownload(url);

	if (isPending) {
		return <div className="h-[72px] w-[85px] rounded-lg bg-black/10"></div>;
	}

	if (!imgUrl) {
		return;
	}

	return (
		<BlurImage
			src={imgType === 'pdf' ? '/images/pdf.png' : imgUrl}
			className={cn('h-[72px] w-[85px]')}
			width={imgType === 'pdf' ? 160 : 85}
			height={imgType === 'pdf' ? 160 : 72}
			imageClasses={cn(
				imgType === 'pdf' ? 'object-contain' : 'object-cover',
				'rounded-lg'
			)}
			source={imgType === 'pdf' ? 'local' : 'remote'}
		/>
	);
}

export default memo(PreviewImage);
