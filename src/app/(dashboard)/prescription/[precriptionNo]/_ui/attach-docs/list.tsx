import { Share, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';

import useDocumentDownload from '../../../../../../hooks/use-download-document';
import {
	type IAttachedDocument,
	type IAttachedDocuments,
} from '../../../../../../types/prescription';
import { Button } from '../../../../../../ui/shared';
import { useGetAttatchDocs } from '../../_api/use-get-attatch-docs';

export default function DocsList({ type }: { type: string }) {
	const params = useParams();
	const prescriptionNo = params?.precriptionNo as string;
	const { data } = useGetAttatchDocs(prescriptionNo, type);
	const attachDocs =
		data?.data?.attachedDocuments || ({} as IAttachedDocuments);

	return (
		<div className="mt-16">
			{attachDocs.attachedDocuments?.map((doc) => {
				return <Doc key={doc._id} doc={doc} />;
			})}
		</div>
	);
}

function Doc({ doc }: { doc: IAttachedDocument }) {
	const { url } = useDocumentDownload(doc.url);

	if (!url) {
		return null;
	}

	return (
		<div className="flex flex-row items-center gap-12 py-6" key={doc?._id}>
			<a
				href={url}
				target="_blank"
				className="flex-1 truncate hover:underline"
			>
				{doc?.url}
			</a>
			<div className="flex flex-row gap-8">
				<Button size="icon" variant="ghost">
					<Share className="size-18" />
				</Button>
				<Button size="icon" variant="ghost">
					<Trash2 className="size-18 text-destructive" />
				</Button>
			</div>
		</div>
	);
}
