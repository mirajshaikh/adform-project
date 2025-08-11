/** @format */

import icon from '../assets/icon.png';
import logo from '../assets/logo.svg';
import { FaAngleLeft } from 'react-icons/fa6';
import {
	MdOutlinePeopleAlt,
	MdOutlineSettings,
	MdOutlineSpaceDashboard,
	MdPersonOutline,
} from 'react-icons/md';
import { PiChatsCircleBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../store/slices/sidebarSlice';

const menuItems = [
	{
		icon: <MdOutlineSpaceDashboard />,
		text: 'Dashboard',
		active: true,
	},
	{
		icon: <MdOutlinePeopleAlt />,
		text: 'Leads',
	},
	{
		icon: <PiChatsCircleBold />,
		text: 'Chats',
	},
	{
		icon: <MdOutlineSettings />,
		text: 'Settings',
	},
	{
		icon: <MdPersonOutline />,
		text: 'Profile',
	},
];

function MenuItem({ expanded, icon, text, active }) {
	return (
		<div
			className='flex items-center hover:bg-gray-200 p-2 rounded-md cursor-pointer duration-300 ease-in-out text-gray-700'
			style={{
				backgroundColor: active ? 'oklch(0.897 0.196 126.665)' : '',
				color: active ? 'black' : '',
				fontWeight: active ? '600' : '500',
			}}>
			<div className='flex items-center gap-2'>
				<div className='text-3xl self-center'>{icon}</div>
				{expanded && (
					<span className='text-base shrink-0 w-full'>{text}</span>
				)}
			</div>
		</div>
	);
}

function Sidebar() {
	const { isOpen } = useSelector((state) => state.sidebar);
	const dispatch = useDispatch();
	const toggle = () => {
		dispatch(toggleSidebar());
	};

	return (
		<div
			className='sm:block hidden max-w-80 shrink-0 duration-300 ease-in-out bg-gray-50 p-4 h-screen'
			style={{
				width: isOpen
					? 'calc(var(--spacing) * 80)'
					: 'calc(var(--spacing) * 20)',
			}}>
			<div className='w-full'>
				{isOpen ? (
					<div className='flex justify-between items-center h-14 w-full pl-3'>
						<img src={logo} width={100} height={45} />
						<button
							onClick={() => toggle()}
							className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-xl text-gray-600 cursor-pointer'>
							<FaAngleLeft size={25} />
						</button>
					</div>
				) : (
					<button
						onClick={() => toggle()}
						className='h-14 cursor-pointer rotate-0 duration-500 hover:rotate-[360deg]'>
						<img src={icon} width={45} height={45} />
					</button>
				)}
			</div>
			<div className='mt-4 flex flex-col gap-2'>
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						expanded={isOpen}
						icon={item.icon}
						text={item.text}
						active={item.active}
					/>
				))}
			</div>
		</div>
	);
}

export default Sidebar;
