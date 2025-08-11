/** @format */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import formatNumber from '../utils/amountFormat';
import StatusBadge from './StatusBadge';
import { isWithinInterval } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserData } from '../store/thunk/getUserDataThunk';
import getUserName from '../utils/getUserName';
import DashboardLoader from './skeletons/DashboardLoader';
import { addCampaingn } from '../store/slices/dashboardSlice';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
	Alert,
	Button,
	InputAdornment,
	OutlinedInput,
	Snackbar,
} from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import AddCampaign from './Modals/AddCampaign';
import { FiSearch } from 'react-icons/fi';

const columns = [
	{ field: 'name', headerName: 'Name', flex: 1 },
	{
		field: 'Username',
		headerName: 'User Name',
		flex: 1,
		renderCell: (params) => {
			const userName = getUserName(params.row.userId);
			return userName;
		},
	},
	{
		field: 'startDate',
		headerName: 'Start Date',
		flex: 1,
	},
	{
		field: 'endDate',
		headerName: 'End Date',
		flex: 1,
	},
	{
		field: 'status',
		headerName: 'Active',
		flex: 1,
		renderCell: (params) => (
			<div className='flex items-center h-full'>
				<StatusBadge
					isActive={isWithinInterval(new Date(), {
						start: new Date(params.row.startDate),
						end: new Date(params.row.endDate),
					})}
				/>
			</div>
		),
	},
	{
		field: 'budget',
		headerName: 'Budget',
		flex: 1,
		valueGetter: (value) => `${formatNumber(value ?? 0)} USD`,
	},
];

const paginationModel = { page: 0, pageSize: 10 };

export default function Dashboard() {
	const [filteredRow, setFilteredRow] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const campaignData = useSelector(
		(state) => state.dashboardSlice.campaignData
	);
	const { loading } = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const [openModal, setOpenModal] = useState(false);
	const [showToast, setShowToast] = useState(false);
	useEffect(() => {
		let filtered = [...campaignData];

		if (startDate && endDate) {
			filtered = filtered.filter((row) => {
				const rowStartDate = new Date(row.startDate);
				const rowEndDate = new Date(row.endDate);
				return rowStartDate >= startDate && rowEndDate <= endDate;
			});
		}
		if (searchQuery.trim()) {
			filtered = filtered.filter((row) =>
				row.name.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		setFilteredRow(filtered);
	}, [startDate, endDate, campaignData, searchQuery]);

	useEffect(() => {
		setFilteredRow(campaignData);
	}, [campaignData]);

	useEffect(() => {
		dispatch(getUserData());
		const addCampaignsGlobally = (newCampaigns) => {
			if (!Array.isArray(newCampaigns) || newCampaigns.length === 0) {
				console.error('Invalid campaign data provided');
				return 'No campaigns added';
			}
			if (
				newCampaigns.some(
					(campaign) =>
						!campaign.id ||
						!campaign.name ||
						!campaign.startDate ||
						!campaign.endDate ||
						!campaign.budget ||
						!campaign.userId
				)
			) {
				console.error(
					'Each campaign must have an id and name and other required fields'
				);
				return 'Invalid campaign data';
			}

			dispatch(addCampaingn(newCampaigns));
			return 'Campaigns added successfully';
		};
		window.AddCampaigns = addCampaignsGlobally;
		return () => {
			window.addCampaignsGlobally = null;
		};
	}, [dispatch]);

	return (
		<div className='relative w-full h-[calc(100svh-200px)]'>
			{loading ? (
				<DashboardLoader />
			) : (
				<>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 items-center justify-between'>
							<div className='flex items-center gap-4'>
								<DesktopDatePicker
									label='Start Date'
									value={startDate}
									onChange={(date) => setStartDate(date)}
								/>
								<DesktopDatePicker
									label='End Date'
									disabled={!startDate}
									minDate={startDate}
									value={endDate}
									onChange={(date) => setEndDate(date)}
								/>
								{startDate && endDate && (
									<button
										onClick={() => {
											setStartDate(null);
											setEndDate(null);
										}}
										className='text-sm text-gray-500 hover:text-gray-700 cursor-pointer'>
										Clear Filters
									</button>
								)}
							</div>
							<div className='flex items-center gap-4 justify-self-end'>
								<OutlinedInput
									id='outlined-adornment-weight'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									startAdornment={
										<InputAdornment position='start'>
											<FiSearch size={20} />
										</InputAdornment>
									}
									placeholder='Search Campaign Name'
									sx={{
										borderRadius: '8px',
										width: '300px',
									}}
									size='small'
									aria-describedby='outlined-weight-helper-text'
									inputProps={{
										'aria-label': 'weight',
									}}
								/>
								<Button
									onClick={() => setOpenModal(true)}
									variant='contained'
									size='large'
									startIcon={<FaPlus />}
									sx={{
										backgroundColor: 'oklch(0.897 0.196 126.665)',
										textTransform: 'none',
										color: 'black',
										height: '40px',
										borderRadius: '8px',
										fontWeight: '600',
										flexShrink: 0,
										fontFamily: 'Open Sans, sans-serif',
										'&:hover': {
											backgroundColor: 'oklch(0.897 0.196 126.665)',
										},
									}}>
									Add New Campaign
								</Button>
							</div>
						</div>
					</LocalizationProvider>
					<DataGrid
						sx={{}}
						rowHeight={60}
						rows={filteredRow}
						columns={columns}
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[5, 10, 15, 20]}
						rowSelection={false}
						disableRowSelectionOnClick
						loading={loading}
						getRowId={(row) => row.id}
					/>
				</>
			)}
			<AddCampaign
				open={openModal}
				handleClose={() => setOpenModal(false)}
				setShowToast={setShowToast}
			/>
			<Snackbar
				open={showToast}
				autoHideDuration={4000}
				onClose={() => setShowToast(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
				<Alert
					onClose={() => setShowToast(false)}
					severity='success'
					variant='filled'
					sx={{ width: '100%' }}>
					Campaign added successfully!
				</Alert>
			</Snackbar>
		</div>
	);
}
