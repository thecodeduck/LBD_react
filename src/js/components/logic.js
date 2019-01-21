import _ from 'lodash';

const set0 = new Set([ '1', '2', '3' ]);

function genCode(a) {
	const result = [];
	let i = 0;
	while (i < 4) {
		result.push(String(_.random(1, a.size, false)));
		i++;
	}
	return result;
}

function checkCode(userinput, code) {
	console.log('checkCode runs');
	const checkResult = [];
	const c = [ ...code ];
	const ui = Object.values(userinput);
	// eslint-disable-next-line
	if (c.join('') == ui.join('')) {
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

const code = genCode(set0);

export { set0, code, checkCode };
