'use client';

export default function LandingPage() {
	return (
		<div className="min-h-screen flex flex-col text-gray-100">
			<div className="flex flex-1 flex-col items-center justify-center">
				<h1 className="text-5xl font-bold text-gray-500">
					Welcome to Showcase Manager
				</h1>
				<h2 className="text-2xl mt-3 text-gray-400">
					Your showcases, under control
				</h2>
			</div>

			<div class="flex justify-center items-center min-h-screen">
				<div class="max-w-[720px] mx-auto">
					<div class="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
						<div class="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
							<img
								src="/monochrome.jpg"
								alt="ui/ux review check"
							/>
						</div>
						<div class="p-6">
							<h4 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
								Showcase 1
							</h4>
							<p class="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
								Because it&apos;s about motivating the doers.
								Because I&apos;m here to follow my dreams and
								inspire others.
							</p>
						</div>
						<div class="flex items-center justify-between p-6">
							<div class="flex items-center -space-x-3"></div>
							<p class="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
								January 10
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
