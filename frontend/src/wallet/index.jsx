import React from 'react';
import styled from 'styled-components';

const Style = styled.div`
	padding: 20px;
`;

function AppWallet() {
	return (
		<Style>
			<h1>Wallet</h1>
			<p>2,000 USDT</p>
		</Style>
	);
}

export default AppWallet;
