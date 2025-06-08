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

import { AppConstants } from '@/helpers/primitives';
import { Button } from '@/ui/button';

export default function DocsList({ type }: { type: string }) {
	const params = useParams();
	const prescriptionNo = params?.precriptionNo as string;
	const { data } = useGetAttatchDocs(prescriptionNo, type);
	const attachDocs =
		data?.data?.attachedDocuments || ({} as IAttachedDocuments);

	return (
		<div className="mt-4 flex flex-col gap-3">
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
		if (response.status === AppConstants.Success) {
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
			className="flex flex-row items-center gap-3 rounded-lg border p-3"
			key={doc?._id}
		>
			<a href={url} target="_blank" className="size-[54px]">
				<img src="/images/pdf.png" />
			</a>
			<div className="flex flex-1 flex-row items-center justify-end gap-2">
				<Button
					onClick={() => window.open(url)}
					size="icon"
					variant="ghost"
					disabled={isPending}
				>
					<Eye className="size-4" />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							size="icon"
							variant="ghost"
							disabled={isPending}
						>
							<Share className="size-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="gap-6">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-2xl">
								Share Prescription
							</AlertDialogTitle>
							<AlertDialogDescription>
								This document will be shared with pet parent
								through WhatsApp and Pemilyy app.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="!pt-2">
							<AlertDialogAction
								onClick={() => handelShare(doc._id)}
								className="bg-secondary hover:bg-secondary/90 px-6 text-white hover:text-white"
							>
								Confirm
							</AlertDialogAction>
							<AlertDialogCancel className="bg-transparent px-6 hover:bg-transparent">
								<span className="text-sm font-normal text-black">
									Cancel
								</span>
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button size="icon" variant="ghost">
							<Trash2 className="text-destructive size-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="gap-6">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-2xl">
								Delete
							</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to delete?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="!pt-2">
							<AlertDialogAction
								onClick={() => handelRemove(doc._id)}
								className="px-6"
							>
								Confirm
							</AlertDialogAction>
							<AlertDialogCancel>
								<span className="px-6 text-sm">Cancel</span>
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
