import { UPDATE_WINS, RESET_WINS } from '../actions/gameAction';

export default function gameReducer(state = 0, { type, payload }) {
	switch (type) {
		case UPDATE_WINS:
			return state + 1;
		case RESET_WINS:
			return payload.wins;
		default:
			return state;
	}
}
