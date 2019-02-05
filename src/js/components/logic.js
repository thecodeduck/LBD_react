import _ from 'lodash';

let wins = 0;

const setList = [
	[ '1', '2', '3' ],
	[ '1', '2', '3', '4' ],
	[ '1', '2', '3', '4', '5' ],
	[ '1', '2', '3', '4', '5', '6' ]
];

function genCode(arr) {
	console.log('genCode check', wins);
	const result = [];
	const c = wins < 60 ? (Math.floor(wins / 10)) : 6;
	let i = 0;
	const a = arr[c].length;
	while (i < 4) {
		result.push(String(_.random(1, a, false)));
		i++;
	}
	return result;
}

function checkCode(userinput, code) {
	console.log('checkCode runs');
	const checkResult = [];
	const c = [ ...code ];
	const ui = Object.values(userinput);
	if (c.join('') === ui.join('')) {
		wins += 1;
		return 'HURRAY';
	}
	// Bull
	for (let i = 0; i < c.length; i++) {
		// eslint-disable-next-line
		if (ui[i] == c[i]) {
			checkResult.push('■');
			ui[i] = 'x';
			c[i] = 'x';
		}
	}
	// Cow
	for (let i = 0; i < ui.length; i++) {
		for (let ii = 0; ii < c.length; ii++) {
			// eslint-disable-next-line
			if (ui[i] !== 'x' && ui[i] == c[ii]) {
				checkResult.push('□');
				ui[i] = 'x';
				c[ii] = 'x';
			}
		}
	}
	console.log('checkCode', checkResult);
	return checkResult.join(' ');
}

export { setList, genCode, checkCode };
