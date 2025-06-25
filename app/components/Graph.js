import React, { useEffect, useRef } from 'react';

const SellingOverview = () => {
	const chartRef = useRef(null);

	useEffect(() => {
		// Dynamically import Chart.js v2.8 from CDN
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/chart.js@2.8.0';
		script.async = true;
		script.onload = () => {
			// Initialize the chart once Chart.js is loaded
			new window.Chart(chartRef.current, {
				type: 'line',
				data: {
					labels: [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'Aug',
						'Sep',
						'Oct',
						'Nov',
						'Dec',
					],
					datasets: [
						{
							label: '16 Mar 2018',
							borderColor: '#4A5568',
							data: [
								600, 400, 620, 300, 200, 600, 230, 300, 200,
								400, 200, 1200,
							],
							fill: false,
							pointBackgroundColor: '#4A5568',
							borderWidth: 3,
							pointBorderWidth: 4,
							pointHoverRadius: 6,
							pointHoverBorderWidth: 8,
							pointHoverBorderColor: 'rgba(74,85,104,0.2)',
						},
					],
				},
				options: {
					legend: {
						display: false,
					},
					scales: {
						yAxes: [
							{
								gridLines: {
									display: false,
								},
								display: false,
							},
						],
					},
				},
			});
		};
		document.body.appendChild(script);
	}, []);

	return (
		<div className="flex items-center justify-center py-8 px-4">
			<div className="w-11/12 lg:w-2/3">
				<div className="flex flex-col justify-between h-full">
					<div>
						<div className="lg:flex w-full justify-between">
							<h3 className="text-gray-600 dark:text-gray-400 leading-5 text-base md:text-xl font-bold">
								Selling Overview
							</h3>
							<div className="flex items-center justify-between lg:justify-start mt-2 md:mt-4 lg:mt-0">
								<div className="flex items-center">
									<button className="py-2 px-4 bg-gray-100 dark:bg-gray-700 rounded ease-in duration-150 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200">
										Dollars
									</button>
									<button className="py-2 px-4 bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded text-white ease-in duration-150 text-xs hover:bg-indigo-600">
										Tickets
									</button>
								</div>
								<div className="lg:ml-14">
									<div className="bg-gray-100 dark:bg-gray-700 ease-in duration-150 hover:bg-gray-200 pb-2 pt-1 px-3 rounded-sm">
										<select
											aria-label="select year"
											className="text-xs text-gray-600 dark:text-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 rounded"
										>
											<option className="leading-1">
												Year
											</option>
											<option className="leading-1">
												2020
											</option>
											<option className="leading-1">
												2019
											</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-end mt-6">
							<h3 className="text-indigo-500 leading-5 text-lg md:text-2xl">
								65,875
							</h3>
							<div className="flex items-center md:ml-4 ml-1 text-green-700">
								<p className="text-green-700 text-xs md:text-base">
									17%
								</p>
								<svg
									role="img"
									className="text-green-700"
									aria-label="increase. upward arrow icon"
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
								>
									<path
										d="M6 2.5V9.5"
										stroke="currentColor"
										strokeWidth="0.75"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M8 4.5L6 2.5"
										stroke="currentColor"
										strokeWidth="0.75"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M4 4.5L6 2.5"
										stroke="currentColor"
										strokeWidth="0.75"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div className="mt-6">
						<canvas
							ref={chartRef}
							width="1025"
							height="400"
							role="img"
							aria-label="line graph to show selling overview"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellingOverview;
