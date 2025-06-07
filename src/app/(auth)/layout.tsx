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
					<div className="flex flex-1 flex-col  justify-center px-24">
						<div className="mb-24 flex items-center">
							<p className=" text-grey-text3 text-14 mb-16 mt-24">
								Welcome to{' '}
								<span className="font-semibold text-black">
									Pemilyy
								</span>
							</p>
						</div>
						{children}
					</div>
					<p className="text-12 px-16 py-24 text-center">
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
