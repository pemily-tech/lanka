'use client';

import { type ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Routes } from '../../helpers/routes';
import { useAuthStore } from '../../store/user-auth';

import { LazyImage } from '@/ui/lazy-image';

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { loggedIn } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (loggedIn) {
			router.push(Routes.HOME);
		}
	}, [loggedIn, router]);

	return (
		<section className="min-h-screen w-full overflow-hidden">
			<div className="grid min-h-screen grid-cols-3 overflow-hidden">
				<div className="bg-grey-4 col-span-2 flex items-center justify-center">
					<LazyImage
						src="/images/bg.png"
						className="size-full object-cover"
					/>
				</div>
				<div className="col-span-1 flex flex-col bg-white">
					<div className="flex flex-1 flex-col justify-center px-4">
						<div className="flex items-center">
							<p className="mb-4 mt-1 text-lg">
								Welcome to{' '}
								<span className="text-primary font-bold">
									Pemilyy
								</span>
							</p>
						</div>
						{children}
					</div>
					<p className="px-4 py-6 text-center text-xs">
						By clicking you agree to our{' '}
						<Link
							href="/"
							className="text-primary font-semibold"
							target="_blank"
						>
							privacy policy
						</Link>{' '}
						and{' '}
						<Link
							href="/"
							className="text-primary font-semibold"
							target="_blank"
						>
							terms of use
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
