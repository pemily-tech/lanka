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
	itemTotal: number;
	itemSubTotal: number;
	itemDiscount: number;
	createdAt: string;
	updatedAt: string;
}

export enum IItemType {
	PRODUCT = 'PRODUCT',
	SERVICE = 'SERVICE',
}

export interface IInvoice {
	_id: string;
	invoiceNo: string;
	type: 'WITHOUT_GST' | 'WITH_GST';
	parentId: string;
	clinicId: string;
	invoiceDate: string;
	billByName: string;
	billByAddress: IBillAddress;
	billByMobile: string;
	billToName: string;
	billToAddress: IBillAddress | null;
	billToMobile: string;
	url: string;
	totalAmount: number;
	paidAmount: number;
	dueAmount: number;
	totalDiscount: number;
	totalItemDiscount: number;
	invoiceDiscount: number;
	termsAndConditions: string[];
	active: boolean;
	updatedBy: string;
	items: IItem[];
	createdAt: string;
	updatedAt: string;
	subTotalAmount: number;
}

export interface IBillAddress {
	pincode: string;
	line1: string;
	line2: string;
	state: string;
	district: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IInvoiceBasicDetails {
	billByName: string;
	billByMobile: string;
	billByAddress: IBillAddress;
	billToName: string;
	billToMobile: string;
}

export interface IItemProduct {
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
	itemTotal: number;
	itemSubTotal: number;
	itemDiscount: number;
	_id: string;
}
