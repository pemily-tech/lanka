import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		// DATABASE_URL: z.string().min(1),
		APP_URL: z.string().url().min(1),
		// DIRECT_URL: z.string().min(1),
	},
	client: {
		// NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
		// NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
		NEXT_PUBLIC_BASE_PATH: z.string().min(1),
	},
	runtimeEnv: {
		APP_URL: process.env.APP_URL,
		// DATABASE_URL: process.env.DATABASE_URL,
		// DIRECT_URL: process.env.DIRECT_URL,
		// NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		// NEXT_PUBLIC_SUPABASE_ANON_KEY:
		// 	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
	},
});
