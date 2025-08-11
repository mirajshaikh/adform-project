/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUserData = createAsyncThunk('users/getUserData', async () => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users'
	);
	await delay(3000);
	return response.data;
});
