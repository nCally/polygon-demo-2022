import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { buyCryptoApi } from '../methods/app';

function FundWithBridge() {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [amount, setAmount] = useState('');
	const dispatch = useDispatch();
	const { profile } = useSelector((store) => store.app);

	const buyCrypto = () => {
		setOpen(false);
		console.log(profile.switchwallet_originaddress, email, amount);
		dispatch(
			buyCryptoApi({
				walletAddress: profile.switchwallet_originaddress,
				email,
				amount,
			})
		);
	};

	return (
		<>
			<div>
				<p>Buy Crypto with XendBridge</p>
				<br />
				<Button onClick={() => setOpen(true)}>Buy USDT</Button>
			</div>

			<Modal
				footer={null}
				width={320}
				open={open}
				onCancel={() => setOpen(false)}
				title="Buy USDT"
			>
				<div>
					<p>How much USDT to buy?</p>
					<Input
						addonAfter="USDT"
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>

				<br />
				<div>
					<p>Email?</p>
					<Input
						addonAfter="Email"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<br />

				<Button block type="primary" onClick={() => buyCrypto()}>
					Submit
				</Button>
			</Modal>
		</>
	);
}

export default FundWithBridge;
