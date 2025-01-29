import { PdfIcon } from '../../../icons/pdf-icon';
import { ImagePlaceholder } from '../../../shared/image';

const PreviewImage = ({ url, imgType }: { url: string; imgType: string }) => {
	if (url) {
		return (
			<>
				{imgType !== 'pdf' && (
					<ImagePlaceholder
						src={url}
						imageClasses="rounded-8 object-contain"
						containerClasses="w-[85px] h-[72px]"
					/>
				)}
				{imgType === 'pdf' && <PdfIcon width={85} height={72} />}
			</>
		);
	}
	return <div className="bg-grey-bg h-[72px] w-[85px]"></div>;
};

export default PreviewImage;
