import { type DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user?: DefaultUser & {
			id: string;
			stripeCustomerId: string;
			isActive: boolean;
		};
	}
	interface User extends DefaultUser {
		stripeCustomerId: string;
		isActive: boolean;
	}
}

declare global {
	interface Window {
		umami?: {
			track: (event: string, data?: Record<string, any>) => void;
			identify: (id: string) => void;
		};
	}
}
