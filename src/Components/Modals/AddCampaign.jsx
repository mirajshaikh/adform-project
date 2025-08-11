/** @format */

import { Button, Modal, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { addCampaingn } from '../../store/slices/dashboardSlice';

function AddCampaign({ open, handleClose, setShowToast }) {
	const [startDate, setStartDate] = useState(null);
	const [, setEndDate] = useState(null);
	const dispatch = useDispatch();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			id: '',
			name: '',
			budget: '',
			userId: '',
			startDate: null,
			endDate: null,
		},
		mode: 'onChange',
	});

	const onSubmit = (data) => {
		const formattedData = {
			...data,
			startDate: data.startDate
				? new Date(data.startDate).toLocaleDateString()
				: null,
			endDate: data.endDate
				? new Date(data.endDate).toLocaleDateString()
				: null,
		};

		dispatch(addCampaingn([formattedData]));

		setStartDate(null);
		setEndDate(null);
		reset({
			id: '',
			name: '',
			budget: '',
			userId: '',
			startDate: null,
			endDate: null,
		});
		setShowToast(true);
		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-xl max-w-xl backdrop-blur-3xl'>
				<h2 className='text-2xl font-bold mb-4'>Add New Campaign</h2>
				<div className='grid grid-cols-2 gap-4'>
					<Controller
						name='id'
						control={control}
						rules={{
							required: 'Campaign ID is required',
							min: { value: 1, message: 'ID must be positive' },
							validate: (value) =>
								Number.isInteger(Number(value)) ||
								'ID must be an integer',
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Campaign ID'
								variant='outlined'
								type='number'
								error={!!errors.id}
								helperText={errors.id?.message}
							/>
						)}
					/>
					<Controller
						name='name'
						control={control}
						rules={{
							required: 'Campaign Name is required',
							minLength: {
								value: 3,
								message: 'Name must be at least 3 characters',
							},
							maxLength: {
								value: 50,
								message: 'Name must not exceed 50 characters',
							},
							pattern: {
								value: /^[a-zA-Z0-9\s-]+$/,
								message:
									'Name can only contain letters, numbers, spaces and hyphens',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Campaign Name'
								variant='outlined'
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						)}
					/>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Controller
							name='startDate'
							control={control}
							rules={{ required: 'Start Date is required' }}
							render={({ field, fieldState: { error } }) => (
								<DesktopDatePicker
									{...field}
									label='Start Date'
									onChange={(date) => {
										field.onChange(date);
										setStartDate(date);
									}}
									slotProps={{
										textField: {
											error: !!error,
											helperText: error?.message,
										},
									}}
								/>
							)}
						/>
						<Controller
							name='endDate'
							control={control}
							rules={{ required: 'End Date is required' }}
							render={({ field, fieldState: { error } }) => (
								<DesktopDatePicker
									{...field}
									label='End Date'
									disabled={!startDate}
									minDate={startDate}
									onChange={(date) => {
										field.onChange(date);
										setEndDate(date);
									}}
									slotProps={{
										textField: {
											error: !!error,
											helperText: error?.message,
										},
									}}
								/>
							)}
						/>
					</LocalizationProvider>
					<Controller
						name='budget'
						control={control}
						rules={{
							required: 'Budget is required',
							min: { value: 1000, message: 'Minimum budget is 1000' },
							max: {
								value: 10000000,
								message: 'Maximum budget is 10,000,000',
							},
							validate: {
								isNumber: (value) =>
									!isNaN(value) || 'Budget must be a number',
								isPositive: (value) =>
									value > 0 || 'Budget must be positive',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Budget'
								variant='outlined'
								type='number'
								error={!!errors.budget}
								helperText={errors.budget?.message}
							/>
						)}
					/>
					<Controller
						name='userId'
						control={control}
						rules={{
							required: 'User ID is required',
							min: { value: 1, message: 'User ID must be positive' },
							validate: (value) =>
								Number.isInteger(Number(value)) ||
								'User ID must be an integer',
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='User ID'
								variant='outlined'
								type='number'
								error={!!errors.userId}
								helperText={errors.userId?.message}
							/>
						)}
					/>
				</div>
				<div className='flex justify-end gap-4 mt-6'>
					<Button
						onClick={handleClose}
						variant='contained'
						size='large'
						sx={{
							textTransform: 'none',
							color: 'black',
							backgroundColor: 'transparent',
							height: '48px',
							borderRadius: '8px',
							fontWeight: '600',
							fontFamily: 'Open Sans, sans-serif',
						}}>
						Cancel
					</Button>
					<Button
						type='submit'
						variant='contained'
						size='large'
						startIcon={<FaPlus />}
						sx={{
							backgroundColor: 'oklch(0.897 0.196 126.665)',
							textTransform: 'none',
							color: 'black',
							borderRadius: '8px',
							fontWeight: '600',
							fontFamily: 'Open Sans, sans-serif',
							'&:hover': {
								backgroundColor: 'oklch(0.897 0.196 126.665)',
							},
						}}>
						Save
					</Button>
				</div>
			</form>
		</Modal>
	);
}

export default AddCampaign;
