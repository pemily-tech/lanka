import { type IClinic, type ILoginAccess, type IPet } from './common';

export interface IDoctor {
	doctorId: string;
	name: string;
	degree: string;
	speciality: string;
	experience: number;
	profileUrl?: string;
	mobile?: string;
	active: boolean;
}

export interface IClinicDoctor {
	_id: string;
	clinicId: string;
	active: boolean;
	loginAccess: string;
	doctor: IDoctor;
	createdAtIST?: string | null;
}

export interface IClinicDoctorResponse {
	doctors: IClinicDoctor[];
}
export interface IStaff {
	staffId: string;
	name: string;
	mobile?: string;
	profileUrl?: string;
	active: boolean;
}
export interface IClinicStaff {
	_id: string;
	clinicId: string;
	active: boolean;
	loginAccess: ILoginAccess;
	staff: IStaff;
	createdAtIST: string;
}
export interface IClinicStaffResponse {
	staffs: IClinicStaff[];
}
export interface ISchedule {
	_id: string;
	clinicId: string;
	petHomeId: string | null;
	groomingCenterId: string | null;
	trainerId?: string | null;
	type: string;
	slotType: string;
	consultationFee: number;
	closedOn: string[];
	weeklyClosed: string[];
	maxLimit: number;
	active: boolean;
	updatedBy: string;
	doctor: IDoctor;
	clinic: IClinic;
	petHome: Record<string, never>;
	groomingCenter: Record<string, never>;
	trainer: Record<string, never>;
	clinicAddress: IAddress;
	petHomeAddress: Record<string, never>;
	groomingCenterAddress: Record<string, never>;
	trainerAddress: Record<string, never>;
}
export interface IScheduleApiResponse {
	schedules: ISchedule[];
}
export interface IClinicSlotsApiResponse {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	clinicSlots: any[];
}
export interface IPetParent {
	_id: string;
	clinicId: string;
	active: boolean;
	parent: IParent;
	createdAtIST: string;
	comment?: string;
	memberId: string;
	petNames: string[];
}
export interface IPetParentsApiResponse {
	parents: IPetParent[];
}
export interface IMedicalRecord {
	_id: string;
	type: string;
	uploadedBy: string;
	url: string;
	comment: string | null;
	vaccinationDate: string | null;
	nextVaccinationDate: string | null;
	vaccinatedOnDate: string | null;
	followUpDate: string | null;
	followUpType: string | null;
	vaccineName: string | null;
	notificationCount: number;
	active: boolean;
	parent: IParent;
	clinic: IClinic;
	pet: IPet;
	createdAtIST: string;
	updatedAtIST: string;
	recordId: string;
	createdAtUTC: string;
	updatedAtUTC: string;
}
export interface IClinicMedicalRecordsApiResponse {
	medicalRecords: IMedicalRecord[];
}
export interface IVaccinationRecord {
	_id: string;
	type: 'VACCINATION';
	uploadedBy: 'CLINIC';
	url: string | null;
	comment: string | null;
	vaccinationDate: string;
	nextVaccinationDate: string | null;
	vaccinatedOnDate: string;
	followUpDate: string | null;
	followUpType: string | null;
	vaccineName: string;
	notificationCount: number;
	active: boolean;
	parent: IParent;
	clinic: IClinic;
	pet: IPet;
	createdAtIST: string;
	updatedAtIST: string;
	recordId: string;
	createdAtUTC: string;
	updatedAtUTC: string;
}
export interface IClinicVaccinationRecordsApiResponse {
	vaccinationRecords: IVaccinationRecord[];
}
export interface IFollowUpRecord {
	_id: string;
	type: 'FOLLOWUP';
	uploadedBy: 'CLINIC';
	url: string | null;
	comment: string | null;
	vaccinationDate: string | null;
	nextVaccinationDate: string | null;
	vaccinatedOnDate: string | null;
	followUpDate: string;
	followUpType: string;
	vaccineName: string | null;
	notificationCount: number;
	active: boolean;
	parent: IParent;
	clinic: IClinic;
	pet: IPet;
	createdAtIST: string;
	updatedAtIST: string;
	recordId: string;
	createdAtUTC: string;
	updatedAtUTC: string;
	followUpCompleteDate: string;
}
export interface IClinicFolowupRecordsApiResponse {
	followUpRecords: IFollowUpRecord[];
}
export interface IAddress {
	_id: string;
	userId: string;
	pincode: string;
	line1: string;
	line2: string;
	state: string;
	district: string;
	type: string;
}

export interface IClinicData {
	_id: string;
	userId: string;
	mobile: string;
	name: string;
	businessContact: string;
	address: IAddress;
	logoUrl: string;
	email: string;
}

export interface IParent {
	name: string;
	mobile: string;
	parentId: string;
}

export interface IPetAndParentDetail {
	_id: string;
	petId: string;
	name: string;
	dob: string;
	gender: string;
	type: string;
	breed: string;
	parent: IParent;
	parentAddress: Record<string, unknown>;
	microChipNo?: string;
}
export interface IVaccinationType {
	lastCompleteDate: string;
	nextDueDate: string;
	petId: string;
	vaccineName: string;
}
export interface ICertificateData {
	clinicData: IClinicData;
	petAndParentDetail: IPetAndParentDetail;
	vaccinations: IVaccinationType[];
}
export interface ICertificateApiResponse {
	certificateData: ICertificateData;
}
