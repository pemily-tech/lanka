import { create } from 'zustand';

import { type IItem } from '@/types/bills-items';

interface IItemsStore {
	items: IItem[];
	totalAmount: number;
	totalItemDiscount: number;
	subTotalAmount: number;
	invoiceDiscount: number;
	paidAmount: number;
	setItems: (items: IItem[]) => void;
	removeItem: (itemId: string) => void;
	updateItem: (item: IItem) => void;
	setAmount: (payload: {
		totalAmount: number;
		totalItemDiscount: number;
		subTotalAmount: number;
		invoiceDiscount: number;
		paidAmount: number;
	}) => void;
	setInvoiceDiscount: (invoiceDiscount: number) => void;
	setPaidAmount: (paidAmount: number) => void;
	getTotalPayable: () => number;
	getBalanceDue: () => number;
	reset: () => void;
}

const calculateTotals = (items: IItem[]) => {
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

		subTotalAmount = parseFloat((subTotalAmount + itemSubTotal).toFixed(2));
		totalAmount = parseFloat((totalAmount + itemTotal).toFixed(2));
		totalItemDiscount = parseFloat(
			(totalItemDiscount + itemDiscount).toFixed(2)
		);

		return {
			...item,
			itemTotal,
			itemSubTotal,
			itemDiscount,
		};
	});
	return { updatedItems, totalAmount, totalItemDiscount, subTotalAmount };
};

export const useItemStore = create<IItemsStore>((set, get) => ({
	items: [],
	totalAmount: 0,
	totalItemDiscount: 0,
	subTotalAmount: 0,
	invoiceDiscount: 0,
	paidAmount: 0,

	setAmount: (payload: {
		totalAmount: number;
		totalItemDiscount: number;
		subTotalAmount: number;
		invoiceDiscount: number;
		paidAmount: number;
	}) =>
		set(() => {
			return {
				totalAmount: payload.totalAmount,
				totalItemDiscount: payload.totalItemDiscount,
				subTotalAmount: payload.subTotalAmount,
				invoiceDiscount: payload.invoiceDiscount,
				paidAmount: payload.paidAmount,
			};
		}),

	setInvoiceDiscount: (invoiceDiscount: number) =>
		set(() => ({
			invoiceDiscount,
		})),

	setPaidAmount: (paidAmount: number) =>
		set(() => ({
			paidAmount,
		})),

	setItems: (items) =>
		set((state) => {
			const merged = [...items, ...state.items];
			const uniqMap = new Map(merged.map((item) => [item.itemId, item]));
			const mergedUnique = Array.from(uniqMap.values());
			const { updatedItems, ...rest } = calculateTotals(mergedUnique);
			return {
				items: updatedItems,
				...rest,
			};
		}),

	removeItem: (id) =>
		set((state) => {
			const filtered = state.items.filter((item) => item.itemId !== id);
			const { updatedItems, ...rest } = calculateTotals(filtered);
			return {
				items: updatedItems,
				...rest,
			};
		}),

	updateItem: (newItem) =>
		set((state) => {
			const updated = state.items.map((item) =>
				item.itemId === newItem.itemId ? newItem : item
			);
			const { updatedItems, ...rest } = calculateTotals(updated);
			return { items: updatedItems, ...rest };
		}),

	getTotalPayable: () => {
		const state = get();
		return Math.max(state.totalAmount - state.invoiceDiscount, 0);
	},

	getBalanceDue: () => {
		const state = get();
		const totalPayable = Math.max(
			state.totalAmount - state.invoiceDiscount,
			0
		);
		const balance = Math.max(totalPayable - state.paidAmount, 0);
		return parseFloat(balance.toFixed(2));
	},

	reset: () => set({ items: [] }),
}));
