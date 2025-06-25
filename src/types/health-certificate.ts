export interface IVaccine {
	name: string;
	batch: string | null;
	brand: string | null;
	givenOn: string;
	dueDate: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICertificate {
	_id: string;
	certificateNo: string;
	type: string;
	certificateDate: string;
	template: string | null;
	parentId: string;
	clinicId: string;
	patientId: string;
	parentName: string | null;
	parentMobile: string | null;
	patientName: string | null;
	patientDetails: any | null;
	clinicDetails: any | null;
	parentOrPatientAddress: any | null;
	clinicAddress: any | null;
	vaccines: IVaccine[];
	url: string | null;
	active: boolean;
	updatedBy: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface ICertificateTemplate {
	descriptions: string[];
	signatureFields: string[];
	dateFields: string[];
}

export interface IPatientDetails {
	name: string;
	dob: string;
	age: string;
	gender: 'M' | 'F' | string;
	type: string;
	breed: string;
	microChipNo: string;
	code: string;
}

export interface IClinicDetails {
	name: string;
	primaryContact: string;
	businessContact: string;
	email: string;
	logoUrl: string;
}

export interface IClinicAddress {
	pincode: string;
	line1: string;
	line2: string;
	state: string;
	district: string;
}

export interface ICertificateBasicDetails {
	parentName: string;
	parentMobile: string;
	patientName: string;
	patientDetails: IPatientDetails;
	clinicDetails: IClinicDetails;
	clinicAddress: IClinicAddress;
	template: ICertificateTemplate;
}
