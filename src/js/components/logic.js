import _ from 'lodash';

const set0 = new Set([ '1', '2', '3' ]);

function genCode(a) {
	const result = [];
	let i = 0;
	while (i < 4) {
		result.push(_.random(0, a.size, false));
		i++;
	}
	return result;
}

const code = genCode(set0);

export { set0, code };
