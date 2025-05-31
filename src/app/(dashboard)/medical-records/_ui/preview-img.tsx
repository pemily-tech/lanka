import useDocumentDownload from '@/hooks/use-download-document';
import { PdfIcon } from '@/ui/icons/pdf-icon';
import { LazyImage } from '@/ui/shared/lazy-image';

export default function PreviewImage({ url }: { url: string }) {
	const { imgType, url: imgUrl, isPending } = useDocumentDownload(url);

	if (isPending) {
		return (
			<div className="bg-black-1/10 h-[72px] w-[85px] rounded-lg"></div>
		);
	}

	if (!imgUrl) {
		return;
	}

	if (imgType === 'pdf') {
		return <PdfIcon className="h-[72px] w-[85px] rounded-lg" />;
	}

	return <LazyImage src={imgUrl} className="h-[72px] w-[85px] rounded-lg" />;
}
