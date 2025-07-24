export interface IItem {
	_id: string;
	itemId: string;
	name: string;
	clinicId: string;
	type: 'PRODUCT' | 'SERVICE';
	description: string;
	quantity: number;
	mrp: number;
	price: number;
	discount: number;
	gstInPercent: number;
	active: boolean;
	updatedBy: string;
}
