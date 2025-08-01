import { create } from 'zustand';

import { type IItemProduct } from '@/types/bills-items';

interface IItemsStore {
	items: IItemProduct[];
	setItems: (items: IItemProduct[]) => void;
	updateItem: (newItem: IItemProduct) => void;
	removeItem: (itemId: string) => void;
}

export const useItemStore = create<IItemsStore>((set) => ({
	items: [],

	setItems: (items) => set({ items }),

	updateItem: (newItem) =>
		set((state) => ({
			items: state.items.map((item) => {
				if (item.itemId === newItem.itemId) {
					return newItem;
				}
				return item;
			}),
		})),

	removeItem: (itemId) =>
		set((state) => ({
			items: state.items.filter((item) => item.itemId !== itemId),
		})),
}));
