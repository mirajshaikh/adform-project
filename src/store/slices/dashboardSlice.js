/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	campaignData: [
		{
			id: 1,
			name: 'Divavu',
			startDate: '9/19/2021',
			endDate: '3/9/2023',
			budget: 8837789,
			userId: 3,
		},
		{
			id: 2,
			name: 'Jaxspan',
			startDate: '11/21/2023',
			endDate: '2/21/2024',
			budget: 608715,
			userId: 6,
		},
		{
			id: 3,
			name: 'Miboo',
			startDate: '11/1/2022',
			endDate: '6/20/2022',
			budget: 239507,
			userId: 7,
		},
		{
			id: 4,
			name: 'Trilith',
			startDate: '8/25/2022',
			endDate: '11/30/2022',
			budget: 179838,
			userId: 1,
		},
		{
			id: 5,
			name: 'Layo',
			startDate: '11/28/2017',
			endDate: '3/10/2023',
			budget: 837850,
			userId: 9,
		},
		{
			id: 6,
			name: 'Photojam',
			startDate: '7/25/2019',
			endDate: '6/23/2021',
			budget: 858131,
			userId: 3,
		},
		{
			id: 7,
			name: 'Blogtag',
			startDate: '6/27/2019',
			endDate: '1/15/2021',
			budget: 109078,
			userId: 2,
		},
		{
			id: 8,
			name: 'Rhyzio',
			startDate: '10/13/2020',
			endDate: '9/25/2025',
			budget: 272552,
			userId: 4,
		},
		{
			id: 9,
			name: 'Zoomcast',
			startDate: '9/6/2021',
			endDate: '11/10/2023',
			budget: 301919,
			userId: 8,
		},
		{
			id: 10,
			name: 'Realbridge',
			startDate: '3/5/2021',
			endDate: '10/2/2026',
			budget: 505602,
			userId: 5,
		},
	],
};

export const dashboardSlice = createSlice({
	name: 'campaignData',
	initialState,
	reducers: {
		addCampaingn: (state, action) => {
			state.campaignData = [...state.campaignData, ...action.payload];
		},
	},
});

export const { addCampaingn } = dashboardSlice.actions;

export default dashboardSlice.reducer;
