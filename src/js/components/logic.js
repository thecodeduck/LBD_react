import _ from 'lodash';

const setList = [ new Set([ '1', '2', '3' ]),
	new Set([ '1', '2', '3', '4' ]),
	new Set([ '1', '2', '3', '4', '5' ]),
	new Set([ '1', '2', '3', '4', '5', '6' ]) ];

function genCode(arr, wins) {
	console.log('genCode check', wins);
	const result = [];
	const c = wins < 60 ? (Math.floor(wins / 10)) : 6;
	let i = 0;
	const a = arr[c];
	while (i < 4) {
		result.push(String(_.random(1, 4, false)));
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
