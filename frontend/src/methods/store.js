import { configureStore } from '@reduxjs/toolkit';
import connection from './web-connection';

const store = configureStore({
	reducer: {
		connection,
	},
});

async function reduxStore() {
	return store;
}

export default reduxStore;
