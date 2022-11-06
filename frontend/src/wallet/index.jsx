import { Divider } from 'antd';
import React from 'react';
import styled from 'styled-components';
import defaultImage from '../defaultone.png';
import GenerateAddress from './GenerateAddress';

const Style = styled.div`
	padding: 20px;

	& .currency {
		display: flex;

		& img {
			width: 18px;
			height: 18px;
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
	return (
		<Style>
			<h1>2000</h1>
			<div className="currency">
				<img src={defaultImage} alt="" />
				<p>USDT</p>
			</div>

			<Divider />

			<div className="actions">
				<GenerateAddress />
				<p>Fund with XendBridge</p>
				<p>Convert Fait to USDT</p>
			</div>
		</Style>
	);
}

export default AppWallet;
