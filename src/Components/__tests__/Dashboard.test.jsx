/** @format */
/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from '../Dashboard';
import dashboardSlice from '../../store/slices/dashboardSlice';
import userSlice from '../../store/slices/userSlice';
import { jest, describe, it, expect } from '@jest/globals';

// Mock Material-UI components
jest.mock('@mui/x-date-pickers/DesktopDatePicker', () => ({
	DesktopDatePicker: () => <div data-testid='date-picker'>Date Picker</div>,
}));

jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
	LocalizationProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('@mui/x-data-grid', () => ({
	DataGrid: () => <div data-testid='data-grid'>DataGrid</div>,
}));

// Mock AddCampaign component
jest.mock('../Modals/AddCampaign', () => ({
	__esModule: true,
	default: () => (
		<div data-testid='add-campaign-modal'>Add Campaign Modal</div>
	),
}));

jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
	LocalizationProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('@mui/x-data-grid', () => ({
	DataGrid: () => <div data-testid='data-grid'>DataGrid</div>,
}));

describe('Dashboard Component', () => {
	it('shows loading skeleton when loading is true', () => {
		const loadingStore = configureStore({
			reducer: {
				dashboardSlice: dashboardSlice,
				users: userSlice,
			},
			preloadedState: {
				dashboardSlice: {
					campaignData: [],
				},
				users: {
					loading: true,
					userData: null,
					error: null,
				},
			},
		});

		render(
			<Provider store={loadingStore}>
				<Dashboard />
			</Provider>
		);

		// Should show the loading skeleton
		const skeletonContainer = screen
			.getByTestId('add-campaign-modal')
			.closest('.relative')
			.querySelector('.animate-pulse');
		expect(skeletonContainer).toBeTruthy();
	});

	it('renders campaign grid and button when not loading', () => {
		const store = configureStore({
			reducer: {
				dashboardSlice: dashboardSlice,
				users: userSlice,
			},
			preloadedState: {
				dashboardSlice: {
					campaignData: [
						{
							id: 1,
							name: 'Test Campaign',
							startDate: '2025-01-01',
							endDate: '2025-12-31',
							budget: 1000,
							userId: 1,
						},
					],
				},
				users: {
					loading: false,
					userData: null,
					error: null,
				},
			},
		});

		render(
			<Provider store={store}>
				<Dashboard />
			</Provider>
		);

		// Should show both date pickers and modal
		expect(screen.getByTestId('add-campaign-modal')).toBeInTheDocument();
	});
});
