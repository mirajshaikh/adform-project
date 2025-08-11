/** @format */

import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import userReducer from './slices/userSlice';
import sliderReducer from './slices/sidebarSlice';

export const store = configureStore({
	reducer: {
		dashboardSlice: dashboardReducer,
		users: userReducer,
		sidebar: sliderReducer,
	},
});
