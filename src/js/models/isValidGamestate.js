export default function isValidGamestate(state) {
	if (typeof state !== 'object') {
		return false;
	} else if (typeof state.wins !== 'number') {
		return false;
	} else if (typeof state.code !== 'object' || state.code.length !== 4) {
		return false;
	} else if (typeof state.userInput !== 'object') {
		return false;
	} else if (typeof state.history !== 'object') {
		return false;
	} else if (typeof state.extras !== 'object') {
		return false;
	} else {
		return true;
	}
}
