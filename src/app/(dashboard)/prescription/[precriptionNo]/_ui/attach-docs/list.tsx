import { Eye, Share, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';

import useDocumentDownload from '../../../../../../hooks/use-download-document';
import { queryClient } from '../../../../../../services/providers';
import {
	type IAttachedDocument,
	type IAttachedDocuments,
} from '../../../../../../types/prescription';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../../../../../ui/alert';
import { useGetAttatchDocs } from '../../_api/use-get-attatch-docs';
import { useRemoveAttachDoc } from '../../_api/use-remove-docs';
import { useShareDoc } from '../../_api/use-share-doc';

import { Button } from '@/ui/button';

export default function DocsList({ type }: { type: string }) {
	const params = useParams();
	const prescriptionNo = params?.precriptionNo as string;
	const { data } = useGetAttatchDocs(prescriptionNo, type);
	const attachDocs =
		data?.data?.attachedDocuments || ({} as IAttachedDocuments);

	return (
		<div className="mt-4 flex flex-col gap-12">
			{attachDocs.attachedDocuments?.map((doc) => {
				return (
					<Doc
						key={doc._id}
						doc={doc}
						prescriptionNo={prescriptionNo}
						type={type}
					/>
				);
			})}
		</div>
	);
}

function Doc({
	doc,
	prescriptionNo,
	type,
}: {
	doc: IAttachedDocument;
	prescriptionNo: string;
	type: string;
}) {
	const { url } = useDocumentDownload(doc.url);
	const { mutateAsync: removeDoc } = useRemoveAttachDoc(prescriptionNo);
	const { mutate: shareDoc, isPending } = useShareDoc(prescriptionNo);

	if (!url) {
		return null;
	}

	const handelRemove = async (id: string) => {
		const response = await removeDoc({ attachedDocumentId: id });
		if (response.status === 'SUCCESS') {
			queryClient.invalidateQueries({
				queryKey: [
					'prescription/attachedDocuments',
					prescriptionNo,
					type,
				],
			});
		}
	};

	const handelShare = async (id: string) => {
		shareDoc({ attachedDocumentId: id, type });
	};

	return (
		<div
			className="flex flex-row items-center gap-12 rounded-lg border p-12"
			key={doc?._id}
		>
			<a href={url} target="_blank" className="size-[54px]">
				<img src="/images/pdf.png" />
			</a>
			<div className="flex flex-1 flex-row items-center justify-end gap-8">
				<Button
					onClick={() => window.open(url)}
					size="icon"
					variant="ghost"
					disabled={isPending}
				>
					<Eye className="size-18" />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							size="icon"
							variant="ghost"
							disabled={isPending}
						>
							<Share className="size-18" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="gap-24">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-24">
								Share Prescription
							</AlertDialogTitle>
							<AlertDialogDescription>
								This document will be shared with pet parent
								through WhatsApp and Pemilyy app.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="!pt-32">
							<AlertDialogAction
								onClick={() => handelShare(doc._id)}
								className="bg-secondary hover:bg-secondary/90 px-24 text-white hover:text-white"
							>
								Confirm
							</AlertDialogAction>
							<AlertDialogCancel className="bg-transparent hover:bg-transparent">
								<span className="text-14 text-black-1 font-normal">
									Cancel
								</span>
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button size="icon" variant="ghost">
							<Trash2 className="size-18 text-destructive" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="gap-24">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-24">
								Delete
							</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to delete?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="!pt-32">
							<AlertDialogAction
								onClick={() => handelRemove(doc._id)}
								className="px-24"
							>
								Confirm
							</AlertDialogAction>
							<AlertDialogCancel>
								<span className="text-14">Cancel</span>
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
