/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getUserData } from '../thunk/getUserDataThunk';

const initialState = {
	users: [],
	loading: true,
	error: null,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserData.pending, (state) => {
				state.loading = true;
			})
			.addCase(getUserData.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(getUserData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
