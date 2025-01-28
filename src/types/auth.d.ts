declare namespace IAuthTypes {
	interface IsUserRegisteredInterface {
		isUser: boolean;
		role: string;
	}
	interface ILoginOtpApiResponse {
		type: string;
	}
	interface ILoginInterface {
		accessToken: string;
		refreshToken: string;
	}
	interface ISignupFormData {
		mobile: number;
		otp: number;
		name: string;
		role: string;
	}
	interface ISigninFormData {
		mobile: number;
		otp: number;
	}
	type ISubscription = 'BASIC' | 'ADVANCE' | 'PREMIUM';
}
