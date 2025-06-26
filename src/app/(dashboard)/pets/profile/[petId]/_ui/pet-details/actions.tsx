import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useDeletePet } from '../../_api/use-delete-pet';

import { AppConstants } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { queryClient } from '@/services/providers';
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

export function Actions({
	parentId,
	petId,
}: {
	parentId: string;
	petId: string;
}) {
	const { mutateAsync: deletePet } = useDeletePet(petId);
	const router = useRouter();

	const handlePet = async () => {
		const response = await deletePet();
		if (response.status === AppConstants.Success) {
			queryClient.invalidateQueries({
				queryKey: [
					'clinic/parents',
					{ searchTerm: '', limit: 15, page: 1, count: 1 },
				],
			});
			router.back();
		}
	};

	return (
		<div className="flex gap-2">
			<Link href={`${Routes.PETS_UPDATE}/${petId}?parentId=${parentId}`}>
				<Button size="icon">
					<Pencil />
				</Button>
			</Link>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive" size="icon">
						<Trash />
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
							onClick={handlePet}
							className="px-6 font-normal"
							data-umami-event="pet_delete_confirm"
							data-umami-event-petid={petId}
							data-umami-event-parentid={parentId}
							variant="ghost"
						>
							Confirm
						</AlertDialogAction>
						<AlertDialogCancel variant="secondary" className="px-6">
							<span className="text-sm font-normal">Cancel</span>
						</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
