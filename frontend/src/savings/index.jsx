import React from 'react';
import styled from 'styled-components';
import AddToAutoYield from './AddToAutoYield';

const Style = styled.div`
	padding: 20px;
`;

function Savings() {
	return (
		<Style>
			<p>Autoyield from Xend Finance</p>

			<br />

			<h1>50 USDT</h1>
			<p>Available For Savings</p>
			<br />
			<AddToAutoYield />
		</Style>
	);
}

export default Savings;
