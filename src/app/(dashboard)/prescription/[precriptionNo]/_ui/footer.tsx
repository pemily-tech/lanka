'use client';

import { Check, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function Footer() {
	const router = useRouter();

	return (
		<div className="mt-16 flex items-center justify-center gap-16 border-t py-16">
			<Button className="min-w-[160px] !rounded-2xl">
				<Check className="size-16" />
				<span className="font-normal">Save and Send</span>
			</Button>
			<Button variant="outline" className="min-w-[120px] !rounded-2xl">
				<Eye className="size-16" />
				<span className="font-normal">Preview</span>
			</Button>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="outline"
						className="bg-black-1/20 min-w-[120px] !rounded-2xl"
					>
						<X className="size-16" />
						<span className="font-normal">Cancel</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-24">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-24">
							Cancel
						</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to cancel this prescription?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-32">
						<AlertDialogAction
							onClick={() => router.back()}
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
	);
}
