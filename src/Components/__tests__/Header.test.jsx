/** @format */
import React from 'react';

import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { describe, it, expect } from '@jest/globals';

describe('Header Component', () => {
	it('renders without crashing', () => {
		render(<Header />);

		// Check if the main elements are present
		expect(screen.getByText('Dashboard')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

		// Check if icons are present using their tooltips
	});

	it('has correct input field attributes', () => {
		render(<Header />);
		const searchInput = screen.getByPlaceholderText('Search');
		expect(searchInput).toHaveAttribute('aria-label', 'weight');
	});
});
