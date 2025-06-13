import { type JSX, type ReactNode } from 'react';

export interface IApiResponse<T> {
	status: 'SUCCESS' | 'ERROR';
	msg: string;
	data: T;
	statusCode: 200 | 201 | 401;
}
export interface IPermissionType {
	id: number;
	img: ReactNode;
	title: string;
	subtitle: string;
	btn1Txt: string;
}
export interface ILoginSliderInterface {
	id: number;
	text: string;
	img: ReactNode;
}
export interface ILayoutType {
	menu: boolean;
	back: boolean;
	logo?: string;
	title?: string;
	onBack?: () => void;
	headerColor?: string;
}
export interface IMedicalRecords {
	id: 0;
	name: string;
	label: string;
	value: string;
	icon?: ReactNode;
}
export interface IServicePackageDetail {
	_id: string;
	clinicId: string;
	petHomeId: string | null;
	groomingCenterId: string | null;
	servicePackageItemId: string;
	price: number;
	selectedFacilities: unknown[];
	active: boolean;
}
export interface IServicePackage {
	_id: string;
	name: string;
	category: string;
	petSize: string;
	type: string;
	active: boolean;
	updatedBy: string;
	createdAt: string;
	updatedAt: string;
	servicePackageDetail: IServicePackageDetail;
	facilities: string[];
}
export interface IServicePackagesResponse {
	servicePackages: IServicePackage[];
}
export interface IPetHomeAddress {
	_id: string;
	district: string;
	line1: string;
	line2: string;
	pincode: string;
	state: string;
	type: string;
	userId: string;
}

export interface IPetHome {
	_id: string;
	mobile: string;
	name: string;
	petHomeAddress: IPetHomeAddress;
	petHomeId: string;
}
export interface IClinic {
	clinicId: string;
	name: string;
	mobile: string;
	businessContact: string;
}

export interface IDoctor {
	profileUrl?: string;
	doctorId: string;
	name: string;
	degree: string;
	speciality: string;
	experience: number;
	mobile?: string;
	regNo?: string;
}
export interface IParent {
	parentId: string;
	name: string;
	mobile: string;
	profileUrl?: string;
	petNames: string[];
}
export interface IClinicSlot {
	clinicSlotId: string;
	maxLimit: number;
	slotId: string;
	startHour: number;
	startMinute: number;
	startTimePeriod: string;
	endHour: number;
	endMinute: number;
	endTimePeriod: string;
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
export interface IPet {
	petId: string;
	name: string;
	gender: string;
	dob: string;
	breed: string;
	type: string;
	microChipNo?: string;
	oldCode?: string;
}
export interface ISlotDetail {
	scheduleId: string;
	maxLimit: number;
	active: boolean;
	clinicSlotId: string;
}
export type ILoginAccess = 'ALLOW' | 'REMOVE';

export interface IDateCalender {
	dateString: string;
	day: number;
	month: number;
	timestamp: number;
	year: number;
}
export type TabItem = {
	id: number;
	name: string;
	component: React.ComponentType;
	allowedRoles?: string[];
	params?: unknown;
	options: {
		headerShown: boolean;
		title: string;
		tabBarIcon: (props: { focused: boolean }) => JSX.Element;
	};
};
export interface IMarkedDates {
	[dateString: string]: {
		selected: boolean;
		marked: boolean;
		selectedColor?: string;
		todayBackgroundColor?: string;
	};
}
export interface ILoginFormDetails {
	mobileNumber: string;
	form: 'login' | 'otp' | 'signup';
	name?: string;
	role?: string;
	type?: 'login' | 'signup';
}
export interface IVersionInfo {
	aosBuildNumber: number;
	aosVersion: string;
	iosBuildNumber: number;
	iosVersion: string;
	isMandatory: boolean;
}
export interface IUpdateSchedulePayload {
	consultationFee?: number;
	active: boolean;
	weeklyClosed: string[];
}
export interface ICreateSchedulePayload {
	active: boolean;
	consultationFee?: number;
	doctorId?: string;
	slotType: string;
	type: string;
	weeklyClosed: string[];
}
export interface IDayItem {
	displayDate: string;
	fullDate: string;
}
export interface IRecordFilterContextType {
	activeRecord: string;
	handleRecord: (id: string) => void;
}
export interface IRecordDateContextType {
	recordSelectedDate: string;
	handleRecordSelectedDate: (id: string) => void;
}
export interface IRecordSidebarContextType {
	recordType: string;
	showSidebar: boolean;
	handleSidebar: (s: boolean) => void;
	activeType: string;
	handleActiveType: (s: string) => void;
	activeParentId: string;
	handleActiveParent: (p: string) => void;
	resetSidebar: () => void;
	activePetId: string;
	handleActivePet: (p: string) => void;
	activeClinicId: string;
	handleActiveClinicId: (c: string) => void;
	activeRecord: string;
	selectedDate: string;
	handleFilter: (id: string) => void;
	handleDate: (date: string) => void;
	handleRecordType: (record: string) => void;
}
export interface IPetItem {
	petId: string;
	name: string;
	ageYear: number;
	ageMonth: number;
	active: boolean;
	gender: string;
	type: string;
	parentId: string;
	breed: string;
	updatedBy?: string;
	createdAt: string;
	updatedAt: string;
	dob: string;
	profileUrl: string;
	code: string;
	microChipNo?: string;
	oldCode?: string;
}
export interface IGetPetsResponse {
	pets: IPetItem[];
}
export interface IGetPetByIdResponse {
	pet: IPetItem;
}
export interface IPrescriptionRecord {
	_id: string;
	parentId: string;
	petId: string;
	type: string;
	url: string | null;
	comment: string;
	active: boolean;
	createdAtIST: string;
	updatedAtIST: string;
	recordId: string;
	createdAtUTC: string;
	updatedAtUTC: string;
	vaccineName: string;
	vaccinationDate: string;
	nextVaccinationDate: string;
	pet: IPetMedicalRecord;
}
export interface IPetMedicalRecord {
	petId: string;
	name: string;
}
export interface IPrescriptionResponse {
	medicalRecords: IPrescriptionRecord[];
}
export interface IUploadType {
	file: File;
	preview: string;
	index: string;
}
export interface INavigationItem {
	id: number;
	type: 'link' | 'menu';
	path: string;
	title: string;
	items?: INavigationItem[];
	icon?: string;
	isIcon: boolean;
	roles: string[];
}
export type IFileWithPreview = File & { preview: string };

export type IMedicalRecordFilter = 'PRESCRIPTION' | 'REPORT' | 'DIET' | 'OTHER';
export type IOtherCommonFilter = 'PENDING' | 'COMPLETE' | 'ALL' | 'UPCOMING';

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

export type IHomeInfoCard = {
	l1: string;
	l2: string;
};
