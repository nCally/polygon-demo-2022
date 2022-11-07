import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../methods/web-connection';

function Connection() {
	const dispatch = useDispatch();

	const { connectedAddress } = useSelector((store) => store.connection);

	const [open, setOpen] = useState(false);

	if (connectedAddress.length === 0) {
		return (
			<Button onClick={() => dispatch(login(97))} block>
				Connect Metamask
			</Button>
		);
	}

	return (
		<div>
			<Button type="primary" onClick={() => setOpen(true)}>
				{connectedAddress}
			</Button>

			<Modal
				open={open}
				footer={null}
				onCancel={() => setOpen(false)}
				title="Connected Wallet"
			>
				<p>{connectedAddress}</p>
			</Modal>
		</div>
	);
}

export default Connection;
