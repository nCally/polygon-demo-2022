import React from 'react';
import styled from 'styled-components';
import Savings from './savings';
import 'antd/dist/antd.min.css';
import './App.css';
import GlobalStyles from './globalStyle';
import Connection from './connection';
import AppWallet from './wallet';

const LayoutStyle = styled.div`
	width: 100%;
	max-width: 768px;
	margin: auto;
	background: white;
	padding: 20px;
	min-height: 100%;
`;

function App() {
	return (
		<LayoutStyle>
			<GlobalStyles />
			{/* <h1>Welcome</h1> */}
			<Connection />
			<AppWallet />
			<Savings />
		</LayoutStyle>
	);
}

export default App;
