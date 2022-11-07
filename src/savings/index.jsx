import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateConnectedAddressBalance } from '../methods/app';
import { walletBalance } from '../methods/autoyield';
import AddToAutoYield from './AddToAutoYield';

const Style = styled.div`
	padding: 20px;

	& .saved-amount {
		color: green;
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
		}
	};

	useEffect(() => {
		getBalance();
	}, [connectedAddress]);

	return (
		<Style>
			<p>Autoyield from Xend Finance</p>

			<br />

			<h1 className="saved-amount">{data.amountInConnectedAddress} USDT</h1>
			<p>Saved Amount</p>
			<br />
			<h1>{data.amountInConnectedAddress} USDT</h1>
			<p>Available For Savings</p>
			<br />
			<AddToAutoYield />
		</Style>
	);
}

export default Savings;
