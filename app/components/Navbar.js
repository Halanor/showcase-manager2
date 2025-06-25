'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
	const router = useRouter();

	return (
		<nav className="w-full flex items-center justify-between p-4 bg-[#b2b2b2] text-gray-100 border-b border-gray-700">
			<div
				className="text-2xl font-bold cursor-pointer"
				onClick={() => router.push('/')}
			>
				Showcase Manager
			</div>
			<button
				onClick={() => router.push('/admin')}
				className="bg-[#fff] text-gray-500 font-bold rounded-full px-4 py-2 hover:brightness-125 text-base sm:text-lg"
			>
				Admin
			</button>
		</nav>
	);
}
