import Link from 'next/link';

import { Routes } from '@/helpers/routes';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';

export default function SelectItems({
	type,
	setType,
	quantity,
	setQuantity,
}: {
	type: 'PRODUCT' | 'SERVICE';
	setType: (type: 'PRODUCT' | 'SERVICE') => void;
	quantity: '5' | '10' | '15' | null;
	setQuantity: (quantity: '5' | '10' | '15' | null) => void;
}) {
	return (
		<div className="flex-1 flex gap-4 justify-end items-end">
			<div>
				<Select
					value={type}
					onValueChange={(val: 'PRODUCT' | 'SERVICE') => setType(val)}
				>
					<Label>Select Type</Label>
					<SelectTrigger className="mt-2 w-[160px]">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="PRODUCT">Product</SelectItem>
						<SelectItem value="SERVICE">Service</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<Select
					value={quantity ?? 'all'}
					onValueChange={(val) => {
						setQuantity(
							val === 'all' ? null : (val as '5' | '10' | '15')
						);
					}}
				>
					<Label>Select Quantity</Label>
					<SelectTrigger className="mt-2 w-[160px]">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						<SelectItem value="5">{'<=5'}</SelectItem>
						<SelectItem value="10">{'<=10'}</SelectItem>
						<SelectItem value="15">{'<=15'}</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Button className="rounded-2xl font-semibold">
				<Link href={Routes.ADD_ITEM}>Create new Item</Link>
			</Button>
		</div>
	);
}
