import { ethers } from 'ethers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { InjectedConnector } from '@web3-react/injected-connector';

const addNetworkToMetamask = async (params) => {
	try {
		await window.ethereum.request({
			method: 'wallet_addEthereumChain',
			params: [params],
		});
	} catch (e) {
		console.error(e);
	}
};

const switchOrAddNetworkToMetamask = async (chainId) => {
	const chainIdHex = `0x${chainId.toString(16)}`;

	try {
		await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: chainIdHex }],
		});
	} catch (e) {
		if (e.code === 4902) {
			let params = {};

			if (chainId === 8001) {
				params = {
					chainId: chainIdHex,
					chainName: 'Polygon Testnet',
					nativeCurrency: {
						name: 'Matic',
						symbol: 'MATIC',
						decimals: 18,
					},
					rpcUrls: [],
					blockExplorerUrls: ['https://polygonscan.com/'],
				};
			}

			await addNetworkToMetamask(params);
		}
	}
};

export const login = createAsyncThunk('connection/login', async (chainId) => {
	const connector = new InjectedConnector({
		supportedChainIds: [137, 8001],
	});

	await switchOrAddNetworkToMetamask(chainId);

	const connection = await connector.activate();

	connection.provider.on('accountChanged', (addresses) => {
		const [firstAddress] = addresses;
		if (firstAddress) {
			return firstAddress;
		}
		return null;
	});

	return connection.account;
});

const recreateMetamask = async () => {
	if (window.ethereum === undefined) {
		return null;
	}

	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		return { signer, address: signer.address };
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const createContract = async (abi, contractAddress) => {
	const ethersInstance = await recreateMetamask();
	if (!ethersInstance) {
		throw Error('No web3 provider available.');
	}

	const { signer, address } = ethersInstance;
	return {
		contract: new ethers.Contract(contractAddress, abi, signer),
		address,
	};
};

const connectionRx = createSlice({
	name: 'connection',
	initialState: {
		connectedAddress: '',
	},
	reducers: {
		updateAddress: (store, action) => {
			const state = store;
			state.connectedAddress = action.payload;
			return state;
		},
	},
	extraReducers: (builder) =>
		builder.addCase(login.fulfilled, (store, action) => {
			const state = store;
			state.connectedAddress = action.payload;
		}),
});

export const { updateAddress } = connectionRx.actions;

export default connectionRx.reducer;
