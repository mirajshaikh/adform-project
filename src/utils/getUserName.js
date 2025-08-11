/** @format */

import { store } from '../store/store.js';

const getUserName = (id) => {
	if (!id) {
		return 'Unknown User';
	}
	const user = store.getState().users?.users?.find((user) => user.id === id);
	return user ? user.name : 'Unknown User';
};

export default getUserName;
