import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

function FundWithBridge() {
	const [open, setOpen] = useState(false);
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

export default FundWithBridge;
