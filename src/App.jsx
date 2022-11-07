import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import Savings from './savings';
import 'antd/dist/antd.min.css';
import './App.css';
import GlobalStyles from './globalStyle';
import Connection from './connection';
import AppWallet from './wallet';

const LayoutStyle = styled.div`
	width: 100%;
	max-width: 500px;
	margin: auto;
	background: white;
	padding: 20px;
	min-height: 100%;
`;

function App() {
	return (
		<LayoutStyle>
			<GlobalStyles />
			<Connection />
			<AppWallet />
			<Divider />
			<Savings />
		</LayoutStyle>
	);
}

export default App;
