import { create } from 'zustand';

import { type IItem } from '@/types/bills-items';

interface IItemsStore {
	items: IItem[];
	setItems: (items: IItem[]) => void;
	removeItem: (itemId: string) => void;
	updateItem: (item: IItem) => void;
}

export const useItemStore = create<IItemsStore>((set) => ({
	items: [],

	setItems: (items) =>
		set((state) => {
			const merged = [...items, ...state.items];
			const uniqMap = new Map(merged.map((item) => [item.itemId, item]));
			return {
				items: Array.from(uniqMap.values()),
			};
		}),

	removeItem: (id) =>
		set((state) => {
			return { items: state.items.filter((item) => item.itemId !== id) };
		}),

	updateItem: (newItem) =>
		set((state) => {
			return {
				items: state.items.map((item) => {
					if (item.itemId === newItem.itemId) {
						return newItem;
					}
					return item;
				}),
			};
		}),
}));
