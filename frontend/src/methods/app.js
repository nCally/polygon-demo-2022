import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const generateSwitchWalletAddress = createAsyncThunk(
	'app/generateSwitchWalletAddress',
	async () => {
		await axios.post('/generate');
	}
);

export const getInfo = createAsyncThunk('app/getInfo', async () => {
	const res = await axios.get('/generate');
	return res.data;
});

const appRx = createSlice({
	name: 'app',
	initialState: {
		profile: {
			address: '',
			email: '',
		},
	},
	reducers: {},
	extraReducers: (builder) =>
		builder.addCase(getInfo.fulfilled, (store, action) => {
			const state = store;
			state.profile = action.payload;
		}),
});

export default appRx.reducer;
