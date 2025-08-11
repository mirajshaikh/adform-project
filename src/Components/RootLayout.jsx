/** @format */

import Header from './Header';
import Sidebar from './Sidebar';

function RootLayout({ children }) {
	return (
		<div className='max-w-[1920px] mx-auto flex'>
			<Sidebar />
			<div className='w-full min-w-0'>
				<Header />
				<div className='p-6'>{children}</div>
			</div>
		</div>
	);
}

export default RootLayout;
