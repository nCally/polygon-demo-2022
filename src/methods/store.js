import { configureStore } from '@reduxjs/toolkit';
import connection from './web-connection';
import app from './app';

const store = configureStore({
	reducer: {
		connection,
		app,
	},
});

async function reduxStore() {
	return store;
}

export default reduxStore;
