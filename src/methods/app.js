import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const email = 'sopidib527%40hostovz.com';
const currency = 4; // USDT
const network = 3;

export const generateSwitchWalletAddress = createAsyncThunk(
	'app/generateSwitchWalletAddress',
	async () => {
		const body = {
			clientEmailAddress: email,
			currency,
			networkChain: network,
			publicKey:
				'NKpmdy9syHz5ZFs61SYWv1xiQbmAxPab6sPzo8hgPtFxjvYkaeeHz3TdPUvnVAkD5CAr2wKfsXmU9nqTpKKBGQXL',
		};
		console.log(process.env.REACT_APP_SWITCH_WALLET_API_KEY);
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `apikey ${process.env.REACT_APP_SWITCH_WALLET_API_KEY}`,
			},
		};
		const response = await axios.post(
			'https://testnet.switchwallet.io/api/v1/walletAddress/generate',
			body,
			config
		);
		return response.data.data.address;
	}
);

export const getAddressBalance = createAsyncThunk(
	'app/getAddressBalance',
	async () => {
		const res = await axios.get(
			`https://testnet.switchwallet.io/api/v1/merchantClientBalance?publicKey=${process.env.REACT_APP_SWITCH_WALLET_PUBLIC_KEY}&merchantClientEmail=${email}`
		);
		const balance = res.data.data.filter((p) => p.currency === currency);
		return balance[0].walletAddress;
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
			switchwallet_address: '',
			email: '',
		},
		data: {
			amountInConnectedAddress: 0,
			amountInAppWallet: 0,
			amountSaved: 0,
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
		updateAmountSaved: (store, action) => {
			const state = store;
			state.data.amountSaved = action.payload;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getInfo.fulfilled, (store, action) => {
				const state = store;
				state.profile = action.payload;
			})
			.addCase(generateSwitchWalletAddress.fulfilled, (store, action) => {
				const state = store;
				state.profile.switchwallet_address = action.payload;
			})
			.addCase(getAddressBalance.fulfilled, (store, action) => {
				const state = store;
				state.data.amountInAppWallet = action.payload;
			}),
});

export const { updateConnectedAddressBalance, updateAmountSaved } =
	appRx.actions;

export default appRx.reducer;
