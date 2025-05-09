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
	diagnosis: string;
}

export interface IPrescription {
	_id: string;
	prescriptionNo: string;
	prescriptionDate: string;
	parentId: string;
	clinicId: string;
	doctorId: string;
	patientId: string;
	parentName: string;
	parentMobile: string;
	patientName: string;
	patientDetails: IPatientDetails;
	clinicDetails: IClinicDetails;
	doctorDetails: IDoctorDetails;
	parentOrPatientAddress: IAddress;
	clinicAddress: IAddress;
	url: string;
	advice: string;
	vitals: string;
	diagnosis: string;
	soap: ISoap;
	nextVisit: string;
	active: boolean;
	attachedDocuments: any[];
	medicines: IMedicine[];
	createdAt: string;
}
export interface IPatientDetails {
	name: string;
	dob: string;
	age: string;
	gender: 'M' | 'F' | 'O';
	type: string;
	breed: string;
	weight: string;
	microChipNo: string;
	code: string;
	active: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IClinicDetails {
	name: string;
	primaryContact: string;
	businessContact: string;
	email: string;
	active: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
	logoUrl: string;
}

export interface IDoctorDetails {
	name: string;
	experience: number;
	degree: string;
	speciality: string;
	regNo: string;
	signatureUrl: string;
	active: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface ISoap {
	subjective: string;
	objective: string;
	assessment: string;
	plan: string;
	active: boolean;
	_id: string;
	createdAt: string;
	updatedAt: string;
}
export interface IAddress {
	pincode: string;
	line1: string;
	line2: string;
	state: string;
	district: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IPrescriptionBasicDetails {
	parentName: string;
	parentMobile: string;
	patientName: string;
	patientDetails: IPatientDetails;
	clinicDetails: IClinicDetails;
	doctorDetails: IDoctorDetails;
	parentOrPatientAddress: IAddress;
	clinicAddress: IAddress;
}

export interface IAttachedDocument {
	url: string;
	type: string;
	comment: string | null;
	active: boolean;
	updatedBy: string;
	_id: string;
}

export interface IAttachedDocuments {
	_id: string;
	prescriptionNo: string;
	attachedDocuments: IAttachedDocument[];
}
