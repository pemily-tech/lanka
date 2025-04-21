import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Routes } from '../../../../../helpers/routes';
import {
	Button,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared';
import { useUpdateUrl } from '../_hooks/use-update-url';

export default function Filters() {
	const { limit, setLimit } = useUpdateUrl();
	return (
		<div className="flex w-full flex-wrap items-center justify-between gap-12">
			<div className="flex-1">
				<Link href={`${Routes.MEDICINES_CREATE}`}>
					<Button size="lg">
						<Plus className="size-18" />
						<span className="font-medium">Create Medicine</span>
					</Button>
				</Link>
			</div>
			<div className="flex flex-1 items-center justify-end">
				<div className="flex min-w-[180px] max-w-[180px] flex-col">
					<Select
						value={limit.toString()}
						onValueChange={(val) => setLimit(Number(val))}
					>
						<Label className="mb-8">Rows per Page</Label>
						<SelectTrigger className="bg-white">
							<SelectValue placeholder="Select a limit" />
						</SelectTrigger>
						<SelectContent>
							{[15, 30, 50].map((option) => (
								<SelectItem key={option} value={String(option)}>
									{option}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
}
