'use client';

import { Check, Eye, Plus, SendHorizonal } from 'lucide-react';

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
} from '../../../../../ui/alert';
import { useFooterActions } from '../_hooks/use-footer';

import { Button } from '@/ui/button';

export default function Footer() {
	const {
		isPrescriptionSaved,
		handleSave,
		isUpdating,
		isUploading,
		handleCreate,
		prescriptionUrl,
		handleShare,
	} = useFooterActions();

	return (
		<div className="mt-4 flex items-center justify-end gap-4 border-t border-border py-4">
			<Button
				loading={isUpdating}
				disabled={isPrescriptionSaved || isUpdating}
				onClick={handleSave}
				className="min-w-[120px] !rounded-2xl"
			>
				<Check className="size-4" />
				<span className="font-normal">Save</span>
			</Button>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						loading={isUploading}
						disabled={isPrescriptionSaved || isUploading}
						variant="secondary"
						className="min-w-[120px] !rounded-2xl"
					>
						<Plus className="size-4" />
						<span className="font-normal">Create PDF</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-6">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl">
							Are you sure you want to create this prescription?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Once the PDF is created, it cannot be edited or
							changed. Please review the prescription carefully
							before generating the PDF.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-2">
						<AlertDialogAction
							onClick={handleCreate}
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
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						disabled={!isPrescriptionSaved}
						className="min-w-[120px] !rounded-2xl"
						variant="outline"
					>
						<SendHorizonal className="size-4" />
						<span className="font-normal">Share PDF</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-6">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl">
							Share Prescription PDF via WhatsApp?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This document will be shared with the pet parent via
							WhatsApp on their registered mobile number (as
							mentioned in the prescription) and also through the
							Pemilyy app.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-2">
						<AlertDialogAction
							onClick={handleShare}
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
			<Button
				disabled={!isPrescriptionSaved}
				className="min-w-[120px] !rounded-2xl"
				variant="outline"
				onClick={() => window.open(prescriptionUrl ?? '')}
			>
				<Eye className="size-4" />
				<span className="font-normal">View PDF</span>
			</Button>
		</div>
	);
}
