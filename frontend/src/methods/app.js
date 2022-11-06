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

export const withdrawSwitchwallet = createAsyncThunk(
	'app/withdrawSwitchwallet',
	async () => {
		await axios.post('/withdraw-to-address');
	}
);

export const buyCrypto = createAsyncThunk('app/buyCrypto', async () => {
	await axios.post('/buy-crypto');
});

export const sellCrypto = createAsyncThunk('app/sellCrypto', async () => {
	await axios.post('/sell-crypto');
});

const appRx = createSlice({
	name: 'app',
	initialState: {
		profile: {
			address: '',
			email: '',
		},
		data: {
			amountInConnectedAddress: 0,
			amountInAppWallet: 0,
		},
	},
	reducers: {
		updateConnectedAddressBalance: (store, action) => {
			const state = store;
			state.data.amountInConnectedAddress = action.payload;
			return state;
		},
		updateWalletAddressBalance: (store, action) => {
			const state = store;
			state.data.amountInAppWallet = action.payload;
			return state;
		},
	},
	extraReducers: (builder) =>
		builder.addCase(getInfo.fulfilled, (store, action) => {
			const state = store;
			state.profile = action.payload;
		}),
});

export const { updateConnectedAddressBalance } = appRx.actions;

export default appRx.reducer;
