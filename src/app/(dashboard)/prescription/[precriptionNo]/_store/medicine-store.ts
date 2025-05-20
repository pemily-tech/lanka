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
	vitals: string;
	diagnosis: string;
	setVitals: (value: string) => void;
	setDiagnosis: (value: string) => void;
	advice: string;
	follwup: Date | null;
	setAdvice: (value: string) => void;
	setFollowup: (value: Date | null) => void;
};

const initialState = {
	input: '',
	searchTerm: '',
	selected: null,
	selectedMedicines: [],
	vitals: '',
	diagnosis: '',
	advice: '',
	follwup: null,
};

export const useMedicineStore = create<State & { reset: () => void }>(
	(set, get) => ({
		...initialState,

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
			set({ input: '' });
		},

		setVitals: (value) => set({ vitals: value }),
		setDiagnosis: (value) => set({ diagnosis: value }),
		setAdvice: (value) => set({ advice: value }),
		setFollowup: (value) => set({ follwup: value }),

		reset: () => set(initialState),
	})
);

const debouncedSetSearchTerm = debounce((val: string) => {
	useMedicineStore.getState().setSearchTerm(val);
}, 500);
