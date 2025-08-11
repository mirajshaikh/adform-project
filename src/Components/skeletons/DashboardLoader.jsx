/** @format */

import React from 'react';

function DashboardLoader() {
	return (
		<div>
			<div className='animate-pulse flex flex-col space-y-2 p-2 rounded-lg border-2 border-gray-100'>
				{[...Array(11)].map((_, index) => (
					<div
						key={index}
						className='h-14 bg-gray-200 rounded p-2 flex gap-2 justify-between items-center'>
						{Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className='h-10 bg-gray-300 rounded w-full'></div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default DashboardLoader;
