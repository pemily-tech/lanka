import { create } from 'zustand';

import { type IItem } from '@/types/bills-items';

interface IItemsStore {
	items: IItem[];
	totalAmount: number;
	totalItemDiscount: number;
	subTotalAmount: number;
	setItems: (items: IItem[]) => void;
	removeItem: (itemId: string) => void;
	updateItem: (item: IItem) => void;
}

const calculateItemTotal = (items: IItem[]) => {
	let totalAmount = 0;
	let totalItemDiscount = 0;
	let subTotalAmount = 0;

	const updatedItems = items.map((item) => {
		const itemDiscount = parseFloat(
			Math.max(0, (item.discount || 0) * item.quantity).toFixed(2)
		);
		const itemSubTotal = parseFloat(
			Math.max(0, item.mrp * item.quantity).toFixed(2)
		);
		const itemTotal = parseFloat(
			Math.max(0, itemSubTotal - itemDiscount).toFixed(2)
		);

		subTotalAmount += itemSubTotal;
		totalAmount += itemTotal;
		totalItemDiscount += itemDiscount;

		return {
			...item,
			itemTotal,
			itemSubTotal,
			itemDiscount,
		};
	});

	return { updatedItems, totalAmount, totalItemDiscount, subTotalAmount };
};

export const useItemStore = create<IItemsStore>((set) => ({
	items: [],
	totalAmount: 0,
	totalItemDiscount: 0,
	subTotalAmount: 0,

	setItems: (items) =>
		set((state) => {
			const merged = [...items, ...state.items];
			const uniqMap = new Map(merged.map((item) => [item.itemId, item]));
			const mergedUnique = Array.from(uniqMap.values());

			const {
				updatedItems,
				totalAmount,
				totalItemDiscount,
				subTotalAmount,
			} = calculateItemTotal(mergedUnique);
			return {
				items: updatedItems,
				totalAmount,
				totalItemDiscount,
				subTotalAmount,
			};
		}),

	removeItem: (id) =>
		set((state) => {
			const filtered = state.items.filter((item) => item.itemId !== id);
			const {
				updatedItems,
				totalAmount,
				totalItemDiscount,
				subTotalAmount,
			} = calculateItemTotal(filtered);
			return {
				items: updatedItems,
				totalAmount,
				totalItemDiscount,
				subTotalAmount,
			};
		}),

	updateItem: (newItem) =>
		set((state) => {
			const updated = state.items.map((item) =>
				item.itemId === newItem.itemId ? newItem : item
			);
			const {
				updatedItems,
				totalAmount,
				totalItemDiscount,
				subTotalAmount,
			} = calculateItemTotal(updated);
			return {
				items: updatedItems,
				totalAmount,
				totalItemDiscount,
				subTotalAmount,
			};
		}),
}));
