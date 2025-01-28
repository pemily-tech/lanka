declare namespace IUserTypes {
	interface IAddress {
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
	interface IUserDetails {
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
	interface IGetUserResponse {
		user: IUserDetails;
	}
	interface IAddress {
		district: string;
		pincode: string;
		state: string;
	}
	interface IAddressResponse {
		address: IAddress;
	}
	interface IClinic {
		clinicId: string;
		name: string;
		mobile: string;
		businessContact: string;
	}

	interface IDoctor {
		doctorId: string;
		name: string;
		profileUrl?: string;
	}

	interface IDoctorItem {
		_id: string;
		active: boolean;
		clinic: IClinic;
		doctor: IDoctor;
	}

	interface IDoctorsResponse {
		doctors: IDoctorItem[];
	}
	interface IParentClinic {
		clinicId: string;
		name: string;
		mobile: string;
	}
	interface IParentDoctor {
		doctorId: string;
		name: string;
		degree: string;
		speciality: string;
		experience: number;
		profileUrl?: string;
		mobile?: string;
	}

	interface IParentDoctor {
		_id: string;
		active: boolean;
		comment: string;
		clinic: IParentClinic;
		doctor: IParentDoctor;
	}
	interface IParentDoctorResponse {
		doctors: IParentDoctor[];
	}
	interface IClinicData {
		_id: string;
		active: boolean;
		comment: string;
		clinic: IClinic;
	}
	interface IGrommingClinicsParentsResponse {
		clinics: IClinicData[];
	}
}
