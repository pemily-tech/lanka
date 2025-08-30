/* eslint-disable indent */
import { type MouseEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';

import { useItemStore } from '../../_context/use-items';
import { useCreateInvoice } from '../_api/use-create-invoice';

import { useGetPetParents } from '@/api/queries/use-get-pet-parent';
import { UserProfile } from '@/components/user-profile';
import { AppConstants } from '@/helpers/primitives';
import { Routes } from '@/helpers/routes';
import { cn } from '@/helpers/utils';
import { Button } from '@/ui/button';
import { Command, CommandEmpty, CommandInput, CommandList } from '@/ui/command';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/ui/dialog';
import Spinner from '@/ui/spinner';

export default function ParentModal({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (o: boolean) => void;
}) {
	const [value, setSearchValue] = useState('');
	const [selectedParentId, setSelectedParentId] = useState<string | null>(
		null
	);
	const [searchTerm, setSearchTerm] = useState('');
	const { data, isPending } = useGetPetParents({
		apiKey: 'clinic/parents',
		searchTerm: searchTerm,
		limit: 15,
	});
	const petParentData = data?.data?.parents || [];
	const { mutateAsync: createInvoice, isPending: isLoading } =
		useCreateInvoice();
	const router = useRouter();
	const { setItems } = useItemStore();

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setSearchValue(val);
		debouncedSearch(val);
	};

	const handleSelect = async (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const target = (e.target as HTMLElement).closest(
			'[data-id]'
		) as HTMLElement;
		if (target && target.dataset.id) {
			setSelectedParentId(target.dataset.id);
		}
	};

	const handleSubmit = async () => {
		if (!selectedParentId) {
			return;
		}
		const response = await createInvoice({
			parentId: selectedParentId,
		});
		if (response.status === AppConstants.Success) {
			setOpen(false);
			setItems([]);
			router.push(
				`${Routes.BILLS_DETAILS}/${response.data.invoice.invoiceNo}`
			);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle>Select Parent</DialogTitle>
					<DialogDescription>
						Select a parent to proceed with the invoice creation.
					</DialogDescription>
				</DialogHeader>
				<Command className="mb-4 mt-2 h-[380px] max-h-[380px] rounded-lg border border-border md:min-w-[450px]">
					<CommandInput
						className="py-6"
						placeholder="Search for pet parents..."
						value={value}
						onValueChange={handleChange}
						containerClasses="border-none"
					/>
					<CommandList
						onClick={handleSelect}
						className="max-h-full border-t border-border"
					>
						{isPending && <Spinner />}
						{petParentData?.map((parent) => {
							return (
								<div
									className={cn(
										'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-pointer select-none items-center gap-6 border-b border-border px-3 py-2 text-sm outline-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
										selectedParentId ===
											parent.parent.parentId &&
											'bg-primary/20 data-[selected=true]:bg-primary/20'
									)}
									key={parent._id}
									data-id={parent.parent.parentId}
								>
									<UserProfile
										id={parent?.parent?.parentId}
										imageClasses="!rounded-lg !size-[54px]"
										iconClasses="!size-[54px]"
									/>
									<div>
										<p className="text-left text-sm font-medium">
											{parent?.parent?.name} (
											{parent?.parent?.mobile})
										</p>
										<p className="text-left text-sm">
											Pets:{' '}
											{parent?.parent?.petNames.join(
												', '
											)}
										</p>
									</div>
								</div>
							);
						})}
						{!isPending &&
							data &&
							data?.data?.parents?.length <= 0 && (
								<CommandEmpty>No results found.</CommandEmpty>
							)}
					</CommandList>
				</Command>
				<DialogFooter className="mt-1 flex gap-6">
					<DialogClose className="cursor-pointer">Cancel</DialogClose>
					<Button
						variant="secondary"
						disabled={isPending || isLoading}
						className="px-6"
						onClick={handleSubmit}
					>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
