import axios from 'axios';
import { ethers } from 'ethers';
import { createContract } from './web-connection';
import xabi from './usdt-xauto.json';
import abi from './erc20.json';

const xusdt = '0x143afc138978Ad681f7C7571858FAAA9D426CecE';
const usdt = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

const estimateGasFee = async () => {
	try {
		const res = await axios.get('https://gasstation-mainnet.matic.network/v2');
		return ethers.utils.parseUnits(
			String(parseInt(res.data?.fast?.maxFee || '0', 10)),
			'gwei'
		);
	} catch (e) {
		console.error(e);
		return 0;
	}
};

export const deposit = async (amount) => {
	try {
		const convertedAmount = ethers.utils.parseUnits(amount, 'mwei');
		const token = await createContract(abi, usdt);

		const approvalGasEstimate = await estimateGasFee();
		const approved = await token.contract.approve(xusdt, convertedAmount, {
			from: token.address,
			gasPrice: approvalGasEstimate,
		});

		if (approved) {
			const { contract, address } = await createContract(xabi, xusdt);

			const depositGasEstimate = await estimateGasFee();
			const deposited = await contract.deposit(convertedAmount, {
				from: address,
				gasPrice: depositGasEstimate,
			});

			if (deposited) {
				return true;
			}
		}

		return false;
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const withdraw = async (amount, address) => {
	try {
		const { contract } = await createContract(xabi, xusdt);

		const sharePrice = await contract.getPricePerFullShare();
		const withdrawAmountInShares = (amount * 10 ** 24) / sharePrice;

		const withdrawGasEstimate = await estimateGasFee();
		const w = await contract.withdraw(
			parseInt(String(withdrawAmountInShares), 10),
			{
				from: address,
				gasPrice: withdrawGasEstimate,
			}
		);

		console.log(w);
		if (w) {
			return true;
		}
		return false;
	} catch (e) {
		console.error(e);
		return false;
	}
};

export const walletBalance = async (address) => {
	try {
		const { contract } = await createContract(abi, usdt);

		const usdtBalance = await contract.balanceOf(address);
		return ethers.utils.formatUnits(usdtBalance, 'mwei');
	} catch (e) {
		console.error(e);
		return 0;
	}
};

export const savingsBalance = async (address) => {
	try {
		const { contract } = await createContract(xabi, xusdt);

		const share = await contract.balanceOf(address);
		const sharePrice = await contract.getPricePerFullShare();

		return (share * sharePrice) / 10 ** 24;
	} catch (e) {
		console.error({ e });
		return 0;
	}
};
