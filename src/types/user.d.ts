export interface IAddress {
	_id: string;
	active: boolean;
	createdAt: string;
	district: string;
	line1: string;
	line2: string;
	pincode: string;
	state: string;
	type: string;
	updatedAt: string;
	updatedBy: string;
	userId: string;
}
export interface IUserDetails {
	active: boolean;
	address: IAddress;
	addressId: string;
	clinicId: string;
	category: string;
	createdAt: string;
	dob: string;
	doctorIds: string[];
	email: string;
	firebaseToken: string;
	gender: string;
	mobile: string;
	name: string;
	profileUrl: string;
	role: string;
	updatedAt: string;
	updatedBy: string;
	userId: string;
	degree?: string;
	experience?: number;
	speciality?: string;
	ownerName: string;
	pan: string;
	gstNo: string;
	businessContact: string;
}
export interface IGetUserResponse {
	user: IUserDetails;
}
export interface IAddress {
	district: string;
	pincode: string;
	state: string;
}
export interface IAddressResponse {
	address: IAddress;
}
export interface IClinic {
	clinicId: string;
	name: string;
	mobile: string;
	businessContact: string;
}

export interface IDoctor {
	doctorId: string;
	name: string;
	profileUrl?: string;
}

export interface IDoctorItem {
	_id: string;
	active: boolean;
	clinic: IClinic;
	doctor: IDoctor;
}

export interface IDoctorsResponse {
	doctors: IDoctorItem[];
}
export interface IParentClinic {
	clinicId: string;
	name: string;
	mobile: string;
}
export interface IParentDoctor {
	doctorId: string;
	name: string;
	degree: string;
	speciality: string;
	experience: number;
	profileUrl?: string;
	mobile?: string;
}

export interface IParentDoctor {
	_id: string;
	active: boolean;
	comment: string;
	clinic: IParentClinic;
	doctor: IParentDoctor;
}
export interface IParentDoctorResponse {
	doctors: IParentDoctor[];
}
export interface IClinicData {
	_id: string;
	active: boolean;
	comment: string;
	clinic: IClinic;
}
export interface IGrommingClinicsParentsResponse {
	clinics: IClinicData[];
}
