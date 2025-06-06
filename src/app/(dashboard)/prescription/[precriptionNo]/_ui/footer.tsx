'use client';

import { Check, Eye, Plus, SendHorizonal, X } from 'lucide-react';

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
	Button,
} from '../../../../../ui/shared';
import { useFooterActions } from '../_hooks/use-footer';

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
		<div className="mt-16 flex items-center justify-end gap-16 border-t py-16">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						loading={isUpdating}
						disabled={isPrescriptionSaved || isUpdating}
						className="min-w-[120px] !rounded-2xl"
					>
						<Check className="size-16" />
						<span className="font-normal">Save</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-24">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-24">
							Are you sure you want to save this prescription?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Once saved you will not be able to edit this
							prescription.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-32">
						<AlertDialogAction
							onClick={handleSave}
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
			<Button
				loading={isUploading}
				disabled={isPrescriptionSaved || isUploading}
				onClick={handleCreate}
				variant="secondary"
				className="min-w-[120px] !rounded-2xl"
			>
				<Plus className="size-16" />
				<span className="font-normal">Create PDF</span>
			</Button>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						disabled={!isPrescriptionSaved}
						className="min-w-[120px] !rounded-2xl"
						variant="outline"
					>
						<SendHorizonal className="size-16" />
						<span className="font-normal">Share PDF</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-24">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-24">
							Share Prescription
						</AlertDialogTitle>
						<AlertDialogDescription>
							This document will be shared with pet parent through
							WhatsApp and Pemilyy app.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-32">
						<AlertDialogAction
							onClick={handleShare}
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
			<Button
				disabled={!isPrescriptionSaved}
				className="min-w-[120px] !rounded-2xl"
				variant="outline"
				onClick={() => window.open(prescriptionUrl ?? '')}
			>
				<Eye className="size-16" />
				<span className="font-normal">View PDF</span>
			</Button>
		</div>
	);
}
