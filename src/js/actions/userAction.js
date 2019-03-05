export const SUBMIT_GUESS = 'user:submitGuess';
export const RESET_GAME = 'user:resetGame';

export function submitGuess(newUserInput) {
	return {
		type: SUBMIT_GUESS,
		payload: {
			userInput: newUserInput,
		},
	};
}

export function resetGame() {
	return {
		type: RESET_GAME,
	};
}
