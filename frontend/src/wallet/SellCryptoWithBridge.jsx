import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';

function SellCryptoWithBridge() {
	const [open, setOpen] = useState(false);
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
					<Input addonAfter="USDT" />
				</div>

				<br />

				<div>
					<p>Contact Email</p>
					<Input type="email" />
				</div>

				<br />

				<Button block type="primary">
					Submit
				</Button>
			</Modal>
		</>
	);
}

export default SellCryptoWithBridge;
