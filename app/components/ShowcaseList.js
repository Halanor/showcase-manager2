'use client';
import Card from './Card';

export default function ShowcaseList({ showcases }) {
	return (
		<>
			<h3 className="text-3xl font-bold text-center mt-6">
				Current Showcases
			</h3>
			<div className="flex flex-wrap justify-center mt-4">
				{showcases.map((showcase, index) => {
					return (
						<div>
							<Card showcaseName={showcase.name} />
						</div>
					);
				})}
			</div>
		</>
	);
}
