import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sellCryptoApi } from '../methods/app';

function SellCryptoWithBridge() {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [amount, setAmount] = useState('');

	const dispatch = useDispatch();
	const { profile } = useSelector((store) => store.app);

	const sellCrypto = () => {
		setOpen(false);
		console.log(profile.switchwallet_originaddress, email, amount);
		dispatch(
			sellCryptoApi({
				walletAddress: profile.switchwallet_originaddress,
				email,
				amount,
			})
		);
	};
	return (
		<>
			<div>
				<p>Sell your crypto with XendBridge</p>
				<br />
				<Button onClick={() => setOpen(true)}>Sell USDT</Button>
			</div>

			<Modal
				footer={null}
				width={320}
				open={open}
				onCancel={() => setOpen(false)}
				title="Sell USDT"
			>
				<div>
					<p>How much USDT to sell?</p>
					<Input
						addonAfter="USDT"
						onChange={(e) => setAmount(e.target.value)}
					/>
				</div>

				<br />

				<div>
					<p>Contact Email</p>
					<Input type="email" onChange={(e) => setEmail(e.target.value)} />
				</div>

				<br />

				<Button block type="primary" onClick={() => sellCrypto()}>
					Submit
				</Button>
			</Modal>
		</>
	);
}

export default SellCryptoWithBridge;
