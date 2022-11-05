import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useSelector } from 'react-redux';
import { deposit } from '../methods/autoyield';

function AddToAutoYield() {
	const [visible, setVisible] = useState(false);
	const { connectedAddress } = useSelector((store) => store.connection);

	const [state, setState] = useState({
		amount: 120,
	});

	const submit = () => {
		if (!connectedAddress) {
			console.log('no address');
		} else {
			deposit(state.amount);
		}
	};

	return (
		<>
			<Button onClick={() => setVisible(true)}>Save to AutoYield</Button>

			<Modal
				open={visible}
				width={320}
				onCancel={() => setVisible(false)}
				title="Save to AutoYield"
				footer={null}
			>
				<div>
					<Input
						value={state.amount}
						onChange={(e) => setState({ ...state, amount: e.target.value })}
					/>
				</div>

				<br />

				<Button block type="primary" onClick={() => submit()}>
					Save
				</Button>
			</Modal>
		</>
	);
}

export default AddToAutoYield;
