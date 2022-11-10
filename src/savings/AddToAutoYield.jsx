import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, savingsBalance, walletBalance } from '../methods/autoyield';
import {
	updateAmountSaved,
	updateConnectedAddressBalance,
} from '../methods/app';

function AddToAutoYield() {
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);
	const { connectedAddress } = useSelector((store) => store.connection);

	const [state, setState] = useState({
		amount: 1,
		loading: false,
	});

	const submit = async () => {
		if (!connectedAddress) {
			console.log('no address');
		} else {
			setState({ ...state, loading: true });
			const successful = await deposit(state.amount);
			if (successful) {
				const savings = savingsBalance(connectedAddress);
				dispatch(updateAmountSaved(savings));

				const wallet = walletBalance(connectedAddress);
				dispatch(updateConnectedAddressBalance(wallet));
			}
			setState({ ...state, loading: false });
			setVisible(false);
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

				<Button
					loading={state.loading}
					block
					type="primary"
					onClick={() => submit()}
				>
					Save
				</Button>
			</Modal>
		</>
	);
}

export default AddToAutoYield;
