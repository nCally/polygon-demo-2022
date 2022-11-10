import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateAmountSaved,
	updateConnectedAddressBalance,
} from '../methods/app';
import { savingsBalance, walletBalance, withdraw } from '../methods/autoyield';

function WithdrawFromAutoYield() {
	const dispatch = useDispatch();

	const { connectedAddress } = useSelector((store) => store.connection);

	const [state, setState] = useState({
		loading: false,
		amount: 1,
		visible: false,
	});

	const submit = async () => {
		setState({ ...state, loading: true });
		if (!connectedAddress) {
			console.log('no address');
		}
		const withdrawn = await withdraw(state.amount, connectedAddress);
		if (withdrawn) {
			setState({ ...state, visible: false, loading: false });

			const w = await walletBalance(connectedAddress);
			dispatch(updateConnectedAddressBalance(w));

			const b = await savingsBalance(connectedAddress);
			dispatch(updateAmountSaved(b));
		}
		setState({ ...state, loading: false });
	};

	return (
		<>
			<Button onClick={() => setState({ ...state, visible: true })}>
				Withdraw
			</Button>

			<Modal
				title="Withdraw Savings"
				width={320}
				open={state.visible}
				footer={null}
				onCancel={() => setState({ ...state, visible: false })}
			>
				<div>
					<Input
						value={state.amount}
						onChange={(e) => setState({ ...state, amount: e.target.value })}
						addonAfter="USDT"
					/>
				</div>
				<br />
				<div>
					<Button block type="primary" onClick={() => submit()}>
						Submit
					</Button>
				</div>
			</Modal>
		</>
	);
}

export default WithdrawFromAutoYield;
