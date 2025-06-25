import React from 'react';
import ToggleButton from './ToggleButton';

const Card = ({ showcaseName }) => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="max-w-[720px] mx-auto">
				{/* Link block */}
				<div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.material-tailwind.com/docs/html/card"
						className="block w-full px-4 py-2 text-center text-slate-700 transition-all"
					></a>
				</div>

				{/* Card */}
				<div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
					<div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
						<img
							src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
							alt="ui/ux review check"
						/>
					</div>
					<div className="p-6">
						<h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">
							{showcaseName}
						</h4>
					</div>
					<div className="flex items-center justify-between p-6">
						<div className="flex items-center -space-x-3">
							<div>ToggleButton</div>
						</div>
						<p className="block font-sans text-base font-normal leading-relaxed text-inherit">
							January 10
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
