export interface IInvoiceItem {
	itemId: string;
	name: string;
	quantity: number;
	mrp: number;
	price: number;
	discount: number;
	itemTotal: number;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IBillByAddress {
	pincode: string;
	line1: string;
	line2: string;
	state: string;
	district: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IInvoice {
	_id: string;
	invoiceNo: string;
	type: string;
	parentId: string;
	clinicId: string;
	invoiceDate: string;
	billByName: string;
	billByAddress: IBillByAddress;
	billByMobile: string;
	billToName: string | null;
	billToAddress: string | null;
	billToMobile: string;
	url: string;
	totalAmount: number;
	paidAmount: number;
	dueAmount: number;
	totalDiscount: number;
	termsAndConditions: string[];
	active: boolean;
	updatedBy: string;
	items: IInvoiceItem[];
	createdAt: string;
	updatedAt: string;
}
export interface IProduct {
	_id: string;
	active: boolean;
	clinicId: string;
	description: string;
	gstInPercent: number;
	itemId: string;
	mrp: number;
	name: string;
	price: number;
	quantity: number;
	type: 'SERVICE' | 'PRODUCT';
	updatedBy: string;
	discount: number;
}
export interface IItem {
	itemId: string;
	quantity: number;
	price: number;
	discount: number;
	mrp: number;
}
export interface ICaluculateInvoice {
	changingField: string;
	itemId: string;
	items: IItem[];
	paidAmount: number;
}
export interface IInvoiceBasicDetails {
	billByName: string;
	billByMobile: string;
	billByAddress: {
		pincode: string;
		line1: string;
		line2: string;
		state: string;
		district: string;
	};
	billToName: string;
	billToMobile: string;
	billToAddress: string;
}
