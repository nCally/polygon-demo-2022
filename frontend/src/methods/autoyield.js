import { createContract } from './web-connection';
import xabi from './usdt-xauto.json';
import abi from './erc20.json';

const xusdt = '0x143afc138978Ad681f7C7571858FAAA9D426CecE';
const usdt = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';

export const deposit = async (amount) => {
	try {
		const token = await createContract(abi, usdt);

		await token.contract.approve(usdt, amount, { from: token.address });
		const { contract, address } = await createContract(xabi, xusdt);
		const d = await contract.deposit(amount, { from: address });
		console.log(d);
	} catch (e) {
		console.error(e);
	}
};

export const withdraw = async (amount) => {
	try {
		const { contract, address } = await createContract(abi, usdt);
		const d = await contract.deposit(amount, { from: address });
		console.log(d);
	} catch (e) {
		console.error(e);
	}
};
