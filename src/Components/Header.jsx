/** @format */

import {
	InputAdornment,
	OutlinedInput,
	TextField,
	Tooltip,
} from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { TbLogout, TbNotification } from 'react-icons/tb';

function Header() {
	return (
		<div className='grid grid-cols-3 justify-between items-center px-6 py-4 bg-white shadow-md w-full'>
			<h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
			<div className=''>
				<OutlinedInput
					id='outlined-adornment-weight'
					startAdornment={
						<InputAdornment position='start'>
							<FiSearch size={20} />
						</InputAdornment>
					}
					placeholder='Search'
					sx={{
						borderRadius: '14px',
						width: '100%',
					}}
					size='small'
					aria-describedby='outlined-weight-helper-text'
					inputProps={{
						'aria-label': 'weight',
					}}
				/>
			</div>
			<div className='flex items-center gap-4 justify-self-end'>
				<Tooltip title='Notifications' className='cursor-pointer'>
					<TbNotification size={30} />
				</Tooltip>
				<Tooltip title='Logout' className='cursor-pointer'>
					<TbLogout size={30} color='oklch(70.4% 0.191 22.216)' />
				</Tooltip>
			</div>
		</div>
	);
}

export default Header;
