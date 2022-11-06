import { Divider } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import defaultImage from '../defaultone.png';
import usdtLogo from '../tether-usdt-logo.png';
import FundWithBridge from './FundWithBridge';
import GenerateAddress from './GenerateAddress';
import SellCryptoWithBridge from './SellCryptoWithBridge';

const Style = styled.div`
	padding: 20px;

	& .currency {
		display: flex;

		& img {
			width: 20px;
			height: 20px;
			margin-right: 7px;
			border-radius: 50%;
		}
	}

	& .actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 10px;
		row-gap: 10px;
		margin-top: 10px;
		& > * {
			border: 1px solid #eee;
			padding: 20px;
		}
	}
`;

function AppWallet() {
	const { data } = useSelector((store) => store.app);
	return (
		<Style>
			<h1>{data.amountInAppWallet} USDT</h1>
			<div className="currency">
				<img src={usdtLogo} alt="" />
				<p>USDT</p>
			</div>

			<Divider />

			<div className="actions">
				<GenerateAddress />
				<FundWithBridge />
				<SellCryptoWithBridge />
			</div>
		</Style>
	);
}

export default AppWallet;
