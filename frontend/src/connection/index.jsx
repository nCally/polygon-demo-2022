import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../methods/web-connection';

function Connection() {
	const dispatch = useDispatch();

	const { connectedAddress } = useSelector((store) => store.connection);

	if (connectedAddress.length === 0) {
		return <Button onClick={() => dispatch(login(97))}>Connect</Button>;
	}

	return (
		<div>
			<p>{connectedAddress}</p>
		</div>
	);
}

export default Connection;
