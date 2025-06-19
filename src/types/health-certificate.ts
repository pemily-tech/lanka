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
	type: 'TRAVEL_CUM_VACCINATION_CERTIFICATE' | string;
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
