import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import appState from './methods/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import './index.css';

appState().then((store) => {
	const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<>
		<Provider store={store}>
			<App />
			<ToastContainer
		position="top-right"
		autoClose={2000}
		hideProgressBar={true}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		draggable
	/>
		</Provider>
		
		</>
		
	);
});
