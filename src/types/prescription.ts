export interface IMedicine {
	_id: string;
	medicineId: string;
	name: string;
	clinicId: string;
	strength: string;
	interval: string;
	dose: string;
	frequency: string;
	duration: string;
	brand: string | null;
	active: boolean;
	updatedBy: string;
	take: string;
}
