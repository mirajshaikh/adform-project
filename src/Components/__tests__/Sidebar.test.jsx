/** @format */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Sidebar from '../Sidebar';
import sidebarSlice from '../../store/slices/sidebarSlice';

import { describe, it, expect } from '@jest/globals';

const mockStore = configureStore({
	reducer: {
		sidebar: sidebarSlice,
	},
});

describe('Sidebar Component', () => {
	it('renders all menu items', () => {
		render(
			<Provider store={mockStore}>
				<Sidebar />
			</Provider>
		);

		// Check if all menu items are present
		expect(screen.getByText('Dashboard')).toBeInTheDocument();
		expect(screen.getByText('Leads')).toBeInTheDocument();
		expect(screen.getByText('Chats')).toBeInTheDocument();
		expect(screen.getByText('Settings')).toBeInTheDocument();
		expect(screen.getByText('Profile')).toBeInTheDocument();
	});

	it('has Dashboard as active menu item by default', () => {
		render(
			<Provider store={mockStore}>
				<Sidebar />
			</Provider>
		);
	});
});
