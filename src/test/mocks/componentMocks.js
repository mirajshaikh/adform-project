/**
 * @format
 * @jest-environment jsdom
 */

import React from 'react';

/* global jest */

jest.mock('@mui/x-date-pickers/DesktopDatePicker', () => ({
	DesktopDatePicker: () => <div data-testid='date-picker'>Date Picker</div>,
}));

jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
	LocalizationProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('@mui/x-data-grid', () => ({
	DataGrid: () => <div data-testid='data-grid'>DataGrid</div>,
}));

jest.mock('../Components/Modals/AddCampaign', () => ({
	__esModule: true,
	default: () => (
		<div data-testid='add-campaign-modal'>Add Campaign Modal</div>
	),
}));
