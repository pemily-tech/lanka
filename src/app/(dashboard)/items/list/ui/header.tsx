import { Search, X } from 'lucide-react';

import { cn } from '../../../../../helpers/utils';
import Input from '../../../../../ui/shared/input/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../../ui/shared/select';
import { useProductListingContext } from '../context/context';

import { Button } from '@/ui/shared/button';

export default function Header() {
	const {
		value,
		handleSearchChange,
		pagination,
		setPagination,
		type,
		setType,
	} = useProductListingContext();

	const handleRowChange = (newRow: string) => {
		setPagination({
			pageIndex: 0,
			pageSize: Number(newRow),
		});
	};

	return (
		<div className="shadow-card1 rounded-8 mb-12 bg-white">
			<div className={cn('flex items-center justify-between p-12')}>
				<div className="flex-1">
					<div className="relative flex w-[320px] items-center border-b px-12">
						<Search className="mr-12 size-16 shrink-0 opacity-50" />
						<Input
							className={cn(
								'text-14 placeholder:text-muted-foreground flex h-32 w-full rounded-md border-none bg-transparent py-12 pl-0 font-medium outline-none disabled:cursor-not-allowed disabled:opacity-50'
							)}
							type="search"
							placeholder="Search for products..."
							value={value}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => handleSearchChange(e.target.value)}
						/>
						{value.length > 0 && (
							<Button
								size="icon"
								variant="ghost"
								className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
								onClick={() => handleSearchChange('')}
							>
								<X className="text-red-1 !size-16" />
							</Button>
						)}
					</div>
				</div>
				<div className="flex flex-1 justify-end gap-24">
					<div className="flex items-center gap-4">
						<span className="whitespace-nowrap text-sm">
							Product Type:
						</span>
						<Button
							onClick={() =>
								setType(
									type === 'PRODUCT' ? 'SERVICE' : 'PRODUCT'
								)
							}
							variant="secondary"
							size="sm"
						>
							<span className="text-14 font-normal">
								{type === 'PRODUCT' ? 'Service' : 'Product'}
							</span>
						</Button>
					</div>
					<div className="flex items-center gap-4">
						<span className="whitespace-nowrap text-sm">
							Rows per page:{' '}
						</span>
						<Select
							value={pagination.pageSize.toString()}
							onValueChange={(value) => handleRowChange(value)}
						>
							<SelectTrigger className="h-40 max-w-[80px] py-0">
								<SelectValue placeholder="Select page size">
									{String(pagination.pageSize)}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{[15, 30, 50].map((option) => (
									<SelectItem
										key={option}
										value={String(option)}
									>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
}
