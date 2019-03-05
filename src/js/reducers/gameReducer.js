import _ from 'lodash';
import reduceReducers from 'reduce-reducers';

import isValidGamestate from '../models/isValidGamestate';
import codeGen from '../models/codeGen';
import { UPDATE_WINS, RESET_WINS } from '../actions/gameAction';
import { RESET_GAME, SUBMIT_GUESS } from '../actions/userAction';
import { checkCode } from '../components/logic';

function codeGenReducer(state, action) {
	if (state.code) {
		return state;
	} else {
		const code = codeGen(state.wins);
		const newState = { ...state, code };
		return newState;
	}
}

function debugReducer(state, action) {
	console.log('debugReducer', state, action);
	if (!isValidGamestate(state)) {
		throw new Error('Gamestate is not valid');
	}
	return state;
}

const initialState = {
	wins: 0,
	code: null,
	userInput: [],
	history: [],
	extras: {},
};

function resetReducer(state, action) {
	if (action.type !== RESET_GAME) {
		return state;
	} else {
		return initialState;
	}
}

function submitGuessReducer(state, action) {
	if (action.type !== SUBMIT_GUESS) {
		return state;
	} else {
		const code = state.code;
		const guess = action.payload.userInput;
		const result = checkCode(guess, code);
		if (result === 'HURRAY') {
			const newState = {
				...state,
				wins: state.wins + 1,
				code: null,
				history: [],
			};
			return newState;
		} else {
			const newState = {
				...state,
				history: [ ...state.history, guess + ' ' + result ],
			};
			return newState;
		}
	}
}

export default reduceReducers(
	resetReducer,
	submitGuessReducer,
	codeGenReducer,
	debugReducer,
	initialState
);

function winsReducer(state = 0, { type, payload }) {
	switch (type) {
		case UPDATE_WINS:
			return state + 1;
		case RESET_WINS:
			return payload.wins;
		default:
			return state;
	}
}

const setList = [
	[ '1', '2', '3' ],
	[ '1', '2', '3', '4' ],
	[ '1', '2', '3', '4', '5' ],
	[ '1', '2', '3', '4', '5', '6' ],
];

function genCode(arr) {
	const result = [];
	const c = winsReducer() < 60 ? (Math.floor(winsReducer() / 10)) : 6;
	let i = 0;
	const a = arr[c].length;
	while (i < 4) {
		result.push(String(_.random(1, a, false)));
		i++;
	}
	console.log('genCode check', winsReducer(), result);
	return result;
}

function codeReducer(state = 0, { type, payload }) {
	switch (type) {
		case UPDATE_WINS:
			return genCode(setList);
		case RESET_WINS:
			return genCode(setList);
		default:
			return state;
	}
}
