import _ from 'lodash';

export default function genCode(wins) {
	const result = [];
	// ifElse hack; watch out for truthy/falsey
	// i.e. can't return 0 in ternary
	const c =
		(wins < 10 ? 3 : null) ||
		(wins < 20 ? 4 : null) ||
		(wins < 30 ? 5 : null) ||
		6;
	let i = 0;
	while (i < 4) {
		result.push(String(_.random(1, c, false)));
		i++;
	}
	console.log('genCode check', wins, result);
	return result;
}
