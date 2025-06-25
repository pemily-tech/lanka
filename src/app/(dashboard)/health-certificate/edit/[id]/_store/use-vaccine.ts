import { create } from 'zustand';

import { type IVaccine } from '@/types/health-certificate';

interface IState {
	vaccines: IVaccine[];
	updateField: (index: number, field: keyof IVaccine, value: string) => void;
	setVaccines: (vaccines: IVaccine[]) => void;
}

const defaultValue = {
	name: '',
	batch: null,
	brand: null,
	givenOn: '',
	dueDate: '',
	_id: '',
	createdAt: '',
	updatedAt: '',
};

export const useVaccineStore = create<IState>((set) => ({
	vaccines: [defaultValue],
	updateField: (index, field, value) =>
		set((state) => {
			const updatedState = [...state.vaccines];
			updatedState[index] = {
				...updatedState[index],
				[field]: value,
			};
			return {
				vaccines: updatedState,
			};
		}),
	setVaccines: (vaccines) => set({ vaccines }),
}));
