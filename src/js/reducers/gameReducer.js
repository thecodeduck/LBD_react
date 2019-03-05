import _ from 'lodash';
import { UPDATE_WINS, RESET_WINS } from '../actions/gameAction';

export function winsReducer(state = 0, { type, payload }) {
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

// function genCode(arr) {
// 	const result = [];
// 	const c = winsReducer() < 60 ? (Math.floor(winsReducer() / 10)) : 6;
// 	let i = 0;
// 	const a = arr[c].length;
// 	while (i < 4) {
// 		result.push(String(_.random(1, a, false)));
// 		i++;
// 	}
// 	console.log('genCode check', winsReducer(), result);
// 	return result;
// }

function genCode(arr) {
	return arr[winsReducer()];
}

export function codeReducer(state = 0, { type, payload }) {
	switch (type) {
		case UPDATE_WINS:
			return genCode(setList);
		case RESET_WINS:
			return genCode(setList);
		default:
			return state;
	}
}
