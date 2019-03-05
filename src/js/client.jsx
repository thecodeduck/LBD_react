/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { combineReducers, createStore } from 'redux';

import App from './components/App';
import { winsReducer, codeReducer } from './reducers/gameReducer';
import userReducer from './reducers/userReducer';

import '../css/style.css';

const allReducers = combineReducers({
	wins: winsReducer,
	code: codeReducer,
	user: userReducer,
});

const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



const app = document.getElementById('app');
ReactDOM.render(<Provider store={store}><App /></Provider>, app);
