import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { generateSwitchWalletAddress } from '../methods/app';

function GenerateAddress() {
	const dispatch = useDispatch();

	const { profile } = useSelector((store) => store.app);

	const generate = () => {
		dispatch(generateSwitchWalletAddress());
	};

	return (
		<div>
			<p>Wallet Address from SwitchWallet</p>
			<br />
			<p>{profile.length > 0 && profile.address}</p>

			{profile.address.length === 0 && (
				<Button onClick={() => generate()}>Generate Address</Button>
			)}
		</div>
	);
}

export default GenerateAddress;
