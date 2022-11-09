import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	updateAmountSaved,
	updateConnectedAddressBalance,
} from '../methods/app';
import { savingsBalance, walletBalance } from '../methods/autoyield';
import AddToAutoYield from './AddToAutoYield';
import WithdrawFromAutoYield from './WithdrawFromAutoYield';

const Style = styled.div`
	padding: 20px;

	& .saved-amount {
		color: green;
		word-break: break-all;
	}

	& .savings {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}
`;

function Savings() {
	const dispatch = useDispatch();

	const { data } = useSelector((store) => store.app);
	const { connectedAddress } = useSelector((store) => store.connection);

	const getBalance = async () => {
		if (connectedAddress.length > 0) {
			const w = await walletBalance(connectedAddress);
			dispatch(updateConnectedAddressBalance(w));

			const s = await savingsBalance(connectedAddress);
			dispatch(updateAmountSaved(s));
		}
	};

	useEffect(() => {
		getBalance();
	}, [connectedAddress]);

	return (
		<Style>
			<p>Autoyield from Xend Finance</p>

			<br />

			<div className="savings">
				<div>
					<h1 className="saved-amount">{data.amountSaved} USDT</h1>
					<p>Saved Amount</p>
				</div>
				<div>
					<WithdrawFromAutoYield />
				</div>
			</div>
			<br />
			<h1>{data.amountInConnectedAddress} USDT</h1>
			<p>Available For Savings</p>
			<br />
			<AddToAutoYield />
		</Style>
	);
}

export default Savings;
