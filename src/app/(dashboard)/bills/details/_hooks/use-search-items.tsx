import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	type ColumnDef,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import debounce from 'lodash.debounce';

import { useItemStore } from '../../_context/use-items';

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
	const { setItems, items, removeItem } = useItemStore();

	const [selectedItems, setSelectedItems] = useState<Map<string, IItem>>(
		new Map()
	);

	useEffect(() => {
		const tempMap = new Map(selectedItems);

		for (const item of items) {
			tempMap.set(item.itemId, item);
		}
		setSelectedItems(tempMap);
	}, []);

	const toggleRow = (item: IItem) => {
		const nextItem = new Map(selectedItems);
		if (nextItem.has(item.itemId)) {
			nextItem.delete(item.itemId);
			removeItem(item.itemId);
		} else {
			nextItem.set(item.itemId, {
				...item,
				quantity: 1,
			});
		}
		console.log(nextItem, 'next');

		setSelectedItems(nextItem);
	};

	const columns: ColumnDef<IItem>[] = useMemo(
		() => [
			{
				id: 'select',
				header: () => <div></div>,
				cell: ({ row }) => {
					const item = row.original;
					const isChecked = selectedItems.has(item.itemId);

					return (
						<Checkbox
							checked={isChecked}
							onCheckedChange={() => toggleRow(item)}
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
		],
		[selectedItems]
	);

	const table = useReactTable({
		data: itemsData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const save = () => {
		console.log(selectedItems, selectedItems.values(), '===sel');

		setItems(Array.from(selectedItems.values()));
	};

	return {
		value,
		handleChange,
		type,
		setType,
		quantity,
		setQuantity,
		columns,
		table,
		selectedItems,
		itemsData,
		isPending,
		save,
	};
}
