declare namespace IClinicTypes {
	interface IDoctor {
		doctorId: string;
		name: string;
		degree: string;
		speciality: string;
		experience: number;
		profileUrl?: string;
		mobile?: string;
		active: boolean;
	}

	interface IClinicDoctor {
		_id: string;
		clinicId: string;
		active: boolean;
		loginAccess: string;
		doctor: IDoctor;
		createdAtIST?: string | null;
	}

	interface IClinicDoctorResponse {
		doctors: IClinicDoctor[];
	}
	interface IStaff {
		staffId: string;
		name: string;
		mobile?: string;
		profileUrl?: string;
		active: boolean;
	}
	interface IClinicStaff {
		_id: string;
		clinicId: string;
		active: boolean;
		loginAccess: ICommonTypes.ILoginAccess;
		staff: IStaff;
		createdAtIST: string;
	}
	interface IClinicStaffResponse {
		staffs: IClinicStaff[];
	}
	interface ISchedule {
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
		doctor: ICommonTypes.IDoctor;
		clinic: ICommonTypes.IClinic;
		petHome: Record<string, never>;
		groomingCenter: Record<string, never>;
		trainer: Record<string, never>;
		clinicAddress: ICommonTypes.IAddress;
		petHomeAddress: Record<string, never>;
		groomingCenterAddress: Record<string, never>;
		trainerAddress: Record<string, never>;
	}
	interface IScheduleApiResponse {
		schedules: ISchedule[];
	}
	interface IClinicSlotsApiResponse {
		clinicSlots: IAppointmentTypes.ISlot[];
	}
	interface IPetParent {
		_id: string;
		clinicId: string;
		active: boolean;
		parent: ICommonTypes.IParent;
		createdAtIST: string;
		comment?: string;
		memberId: string;
		petNames: string[];
	}
	interface IPetParentsApiResponse {
		parents: IPetParent[];
	}
	interface IMedicalRecord {
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
		parent: ICommonTypes.IParent;
		clinic: ICommonTypes.IClinic;
		pet: ICommonTypes.IPet;
		createdAtIST: string;
		updatedAtIST: string;
		recordId: string;
		createdAtUTC: string;
		updatedAtUTC: string;
	}
	interface IClinicMedicalRecordsApiResponse {
		medicalRecords: IMedicalRecord[];
	}
	interface IVaccinationRecord {
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
		parent: ICommonTypes.IParent;
		clinic: ICommonTypes.IClinic;
		pet: ICommonTypes.IPet;
		createdAtIST: string;
		updatedAtIST: string;
		recordId: string;
		createdAtUTC: string;
		updatedAtUTC: string;
	}
	interface IClinicVaccinationRecordsApiResponse {
		vaccinationRecords: IVaccinationRecord[];
	}
	interface IFollowUpRecord {
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
		parent: ICommonTypes.IParent;
		clinic: ICommonTypes.IClinic;
		pet: ICommonTypes.IPet;
		createdAtIST: string;
		updatedAtIST: string;
		recordId: string;
		createdAtUTC: string;
		updatedAtUTC: string;
		followUpCompleteDate: string;
	}
	interface IClinicFolowupRecordsApiResponse {
		followUpRecords: IFollowUpRecord[];
	}
	interface IAddress {
		_id: string;
		userId: string;
		pincode: string;
		line1: string;
		line2: string;
		state: string;
		district: string;
		type: string;
	}

	interface IClinicData {
		_id: string;
		userId: string;
		mobile: string;
		name: string;
		businessContact: string;
		address: IAddress;
		logoUrl: string;
		email: string;
	}

	interface IParent {
		name: string;
		mobile: string;
		parentId: string;
	}

	interface IPetAndParentDetail {
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
	interface IVaccinationType {
		lastCompleteDate: string;
		nextDueDate: string;
		petId: string;
		vaccineName: string;
	}
	interface ICertificateData {
		clinicData: IClinicData;
		petAndParentDetail: IPetAndParentDetail;
		vaccinations: IVaccinationType[];
	}
	interface ICertificateApiResponse {
		certificateData: ICertificateData;
	}
}
