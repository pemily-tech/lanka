import { Check } from 'lucide-react';

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
} from '@/ui/alert';
import { Button } from '@/ui/button';

export default function Footer() {
	return (
		<div className="mt-4 mx-6 flex items-center justify-end gap-4 border-t border-border py-4">
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						// loading={isUpdating}
						// disabled={isPrescriptionSaved || isUpdating}
						className="min-w-[120px] !rounded-2xl"
					>
						<Check className="size-4" />
						<span className="font-normal">Save</span>
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="gap-6">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl">
							Are you sure you want to save this certificate?
						</AlertDialogTitle>
						<AlertDialogDescription>
							Once saved you will not be able to edit this
							certificate.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="!pt-2">
						<AlertDialogAction
							// onClick={handleSave}
							className="px-6"
							variant="secondary"
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
	);
}
