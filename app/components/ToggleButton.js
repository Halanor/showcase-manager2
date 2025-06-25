import React, { useState } from 'react';

const ToggleControls = () => {
	const [humanHelp, setHumanHelp] = useState(false);
	const [finishConversation, setFinishConversation] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen space-y-6">
			{/* Toggle Section */}
			<div className="space-y-4 text-center">
				<div className="text-gray-800 font-semibold">
					Enable/Disable the action buttons for human help and finish
					conversation
				</div>

				{/* Human Help Toggle */}
				<div className="flex items-center justify-between w-64">
					<span className="text-lg font-semibold text-gray-800">
						Human Help
					</span>
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							className="sr-only peer"
							checked={humanHelp}
							onChange={() => setHumanHelp(!humanHelp)}
						/>
						<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-black"></div>
						<div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full"></div>
					</label>
				</div>

				{/* Finish Conversation Toggle */}
				<div className="flex items-center justify-between w-64">
					<span className="text-lg font-semibold text-gray-800">
						Finish Conversation
					</span>
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							className="sr-only peer"
							checked={finishConversation}
							onChange={() =>
								setFinishConversation(!finishConversation)
							}
						/>
						<div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-black"></div>
						<div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform peer-checked:translate-x-full"></div>
					</label>
				</div>
			</div>

			{/* Footnote Section */}
			<div className="p-4 text-center text-gray-500">
				<p>
					Inspired by{' '}
					<a
						href="https://galichat.com"
						className="text-blue-500 underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						galichat.com
					</a>
				</p>
			</div>
		</div>
	);
};

export default ToggleControls;
