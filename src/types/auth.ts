export interface IsUserRegisteredInterface {
	isUser: boolean;
	role: string;
}
export interface ILoginOtpApiResponse {
	type: string;
}
export interface ILoginInterface {
	accessToken: string;
	refreshToken: string;
}
export interface ISignupFormData {
	mobile: number;
	otp: number;
	name: string;
	role: string;
}
export interface ISigninFormData {
	mobile: number;
	otp: number;
}
export type ISubscription = 'BASIC' | 'ADVANCE' | 'PREMIUM';
