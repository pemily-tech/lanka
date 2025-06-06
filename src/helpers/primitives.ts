export const enum Roles {
	Parent = 'PARENT',
	Clinic = 'CLINIC',
	Doctor = 'DOCTOR',
	PetHome = 'PET_HOME',
	GroomingCenter = 'GROOMING_CENTER',
	Staff = 'STAFF',
	Grooming = 'GROOMING',
	PetParents = 'PET_PARENTS',
}

export const enum ApiEndpoints {
	IsUserRegistered = 'auth/isUser',
	Signup = 'auth/signUp',
	SignIn = 'auth/signIn',
	Otp = 'auth/sendOtp',
	GetPet = 'pet/me',
	PetId = 'pet/id',
	RefreshToken = 'auth/token',
	PetProfileUrl = 'pet/profileUrl',
	UploadPetImage = 'pet/uploadProfile',
	MedicalRecords = 'pet/medicalRecords',
	DownloadDocument = 'doc/download',
	UpdateMedicalRecord = 'pet/updateMedicalRecord',
	UploadMedicalRecord = 'pet/uploadMedicalRecord',
	UserProfile = 'user/profileUrl',
	UserId = 'user/userId',
	UpdateUserBasic = 'user/basicDetail',
	Pincode = 'address/pincode',
	Address = 'address',
	UploadProfile = 'user/uploadProfile',
	DoctorForParents = 'clinic/doctorsForParent',
	SearchDoctorsForParent = 'clinic/searchDoctorsForParent',
	AppointmentCalender = 'appointment/calendar',
	GroomingClinicsForParents = 'clinic/groomingClinicsForParent',
	DoctorsClinic = 'clinic/doctors',
	AddClinicDoctor = 'clinic/addDoctor',
	UploadClinicMemberProfile = 'clinic/uploadClinicMemberProfile',
	UpdateDoctor = 'clinic/updateDoctor',
	AddStaff = 'clinic/addStaff',
	UpdateStaff = 'clinic/updateStaff',
	StaffList = 'clinic/staffs',
	DoctorLoginAccess = 'clinic/doctorLoginAccess',
	UpdateParent = 'clinic/updateMember',
	AddParent = 'clinic/addParent',
	ClinicMedicalRecords = 'clinic/medicalRecords',
	UpdateClinicMedicalRecords = 'clinic/updateMedicalRecord',
	UploadClinicMedicalRecords = 'clinic/uploadMedicalRecord',
	ClinicVaccinationRecords = 'clinic/vaccinationRecords',
	ClinicVaccination = 'clinic/addVaccination',
	ClinicVaccinationRemainder = 'clinic/vaccinationReminderToParent',
	UpdateClinicVaccination = 'clinic/updateVaccination',
	ClinicFollowupRecords = 'clinic/followUpRecords',
	ClinicFollowup = 'clinic/addFollowUp',
	ClinicFollowupRemainder = 'clinic/followUpReminderToParent',
	UpdateClinicFollowup = 'clinic/updateFollowUp',
	AppVersion = 'app/utils/version',
	DeleteAccount = 'user/deactivate',
	FirebaseToken = 'user/firebaseToken',
	PetBreed = 'app/utils/breeds',
	VaccinationList = 'app/utils/vaccination-list',
	FollowupList = 'app/utils/follow-list',
	DropdownList = 'app/utils/dropdown',
	VaccinationCertificate = 'clinic/certificateData',
	ClinicLogo = 'clinic/logoUrl',
	UploadLogo = 'clinic/uploadLogo',
}

export const enum ModalTypes {
	CONFIRMATION_MODAL = 'confirm',
	SIDEBAR_MENU = 'sidebar-menu',
	ADD_EDIT_PARENT = 'add_edit_parent',
	ADD_EDIT_PET = 'add_edit_pet',
	LOADING_MODAL = 'loading',
	SEARCH_PARENTS = 'search_parents',
	PET_SELECT = 'pet_select',
}
