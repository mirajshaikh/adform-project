/** @format */

function StatusBadge({ isActive }) {
	return (
		<div className='flex items-center justify-center'>
			<div className='flex items-center h-full'>
				{isActive ? (
					<div className=' text-gray-800 px-2 py-1 rounded-full flex items-center gap-2'>
						<p className='rounded-full h-3 w-3 bg-green-500'></p>
						<p className='text-sm'>Active</p>
					</div>
				) : (
					<div className=' text-gray-800 px-2 py-1 rounded-full flex items-center gap-2'>
						<p className='rounded-full h-3 w-3 bg-red-500'></p>
						<p className='text-sm'>Inactive</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default StatusBadge;
