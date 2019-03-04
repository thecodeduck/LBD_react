export const UPDATE_WINS = 'game:updateWins';
export const RESET_WINS = 'game:resetWins';

export function updateWins() {
	return {
		type: UPDATE_WINS,
		payload: {
			wins: 'ERROR',
		},
	};
}

export function resetWins() {
	return {
		type: RESET_WINS,
		payload: {
			wins: 0,
		},
	};
}
