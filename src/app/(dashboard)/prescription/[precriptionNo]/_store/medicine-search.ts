import debounce from 'lodash.debounce';
import { create } from 'zustand';

import { type IMedicine } from '../../../../../types/prescription';

type State = {
	input: string;
	searchTerm: string;
	selected: IMedicine | null;
	selectedMedicines: IMedicine[];
	setInput: (val: string) => void;
	setSearchTerm: (val: string) => void;
	selectMedicine: (medicine: IMedicine) => void;
	resetSearch: () => void;
	updateMedicineField: (
		id: string,
		field: keyof IMedicine,
		value: string
	) => void;
	removeMedicine: (id: string) => void;
	updateFullMedicine: (id: string, medicine: IMedicine) => void;
};

export const useMedicineSearchStore = create<State>((set, get) => ({
	input: '',
	searchTerm: '',
	selected: null,
	selectedMedicines: [],

	setInput: (val: string) => {
		set({ input: val });
		debouncedSetSearchTerm(val);
	},

	setSearchTerm: (val: string) => set({ searchTerm: val }),

	selectMedicine: (medicine: IMedicine) => {
		const { selectedMedicines } = get();
		const exists = selectedMedicines.some(
			(med) => med.medicineId === medicine.medicineId
		);
		set({
			input: medicine.name,
			selected: medicine,
			selectedMedicines: exists
				? selectedMedicines
				: [...selectedMedicines, medicine],
		});
	},

	updateMedicineField: (id, field, value) =>
		set((state) => ({
			selectedMedicines: state.selectedMedicines.map((medicine) =>
				medicine.medicineId === id
					? { ...medicine, [field]: value }
					: medicine
			),
		})),

	updateFullMedicine: (id, updatedData) =>
		set((state) => ({
			selectedMedicines: state.selectedMedicines.map((medicine) =>
				medicine.medicineId === id
					? { ...medicine, ...updatedData }
					: medicine
			),
		})),

	removeMedicine: (id) =>
		set((state) => ({
			selectedMedicines: state.selectedMedicines.filter(
				(medicine) => medicine.medicineId !== id
			),
		})),

	resetSearch: () => {
		const selected = get().selected;
		set({ input: selected?.name || '' });
	},
}));

const debouncedSetSearchTerm = debounce((val: string) => {
	useMedicineSearchStore.getState().setSearchTerm(val);
}, 500);
