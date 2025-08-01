import { useCallback, useMemo, useState } from 'react';
import {
	type ColumnDef,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import debounce from 'lodash.debounce';

import { useGetItems } from '@/api/queries/use-get-items';
import { type IItem } from '@/types/bills-items';
import { Checkbox } from '@/ui/checkbox';

export function useSearchItems() {
	const [value, setValue] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [type, setType] = useState<'PRODUCT' | 'SERVICE'>('PRODUCT');
	const [quantity, setQuantity] = useState<null | '5' | '10' | '15'>(null);

	const debouncedSearch = useCallback(
		debounce((val: string) => setSearchTerm(val), 500),
		[]
	);

	const handleChange = (val: string) => {
		setValue(val);
		debouncedSearch(val);
	};

	const { data, isPending } = useGetItems({
		searchTerm,
		type,
		count: 0,
		page: 0,
		limit: 15,
		...(quantity ? { qty: Number(quantity) } : {}),
	});

	const itemsData = useMemo(
		() => data?.data?.items || ([] as IItem[]),
		[data]
	);

	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const toggleRow = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const toggleAll = (checked: boolean) => {
		setSelectedIds(() =>
			checked ? new Set(itemsData.map((item) => item._id)) : new Set()
		);
	};

	const columns: ColumnDef<IItem>[] = useMemo(
		() => [
			{
				id: 'select',
				header: () => {
					const allSelected = selectedIds.size === itemsData.length;
					return (
						<Checkbox
							checked={allSelected}
							onCheckedChange={(checked) => toggleAll(!!checked)}
						/>
					);
				},
				cell: ({ row }) => {
					const id = row.original._id;
					const isChecked = selectedIds.has(id);

					return (
						<Checkbox
							checked={isChecked}
							onCheckedChange={() => toggleRow(id)}
						/>
					);
				},
			},
			{
				accessorKey: 'name',
				header: 'Name',
				cell: ({ row }) => <span>{row.original.name}</span>,
			},
			{
				accessorKey: 'price',
				header: 'Price',
				cell: ({ row }) => (
					<span>&#8377;{Math.floor(row.original.price)}</span>
				),
			},
			{
				accessorKey: 'mrp',
				header: 'Mrp',
				cell: ({ row }) => (
					<span>&#8377;{Math.floor(row.original.mrp)}</span>
				),
			},
			{
				accessorKey: 'discount',
				header: 'Discount',
				cell: ({ row }) => (
					<span>&#8377;{Math.floor(row.original.discount)}</span>
				),
			},
			{
				accessorKey: 'quantity',
				header: 'In Stock',
				cell: ({ row }) => <span>{row.original.quantity}</span>,
			},
			{
				accessorKey: 'type',
				header: 'Type',
				cell: ({ row }) => {
					const type = row.original.type;
					const tempString =
						type.slice(0, 1) + type.slice(1).toLowerCase();
					return (
						<span className="bg-gradient-to-r from-secondary to-neutral-300 px-2 py-1 rounded-full text-white text-xs font-semibold">
							{tempString}
						</span>
					);
				},
			},
			{
				id: 'actions',
				header: 'Actions',
				cell: ({ row }) => {
					return <div></div>;
				},
			},
		],
		[itemsData, selectedIds]
	);

	const table = useReactTable({
		data: itemsData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return {
		value,
		handleChange,
		type,
		setType,
		quantity,
		setQuantity,
		columns,
		table,
		selectedIds,
		itemsData,
		isPending,
	};
}
