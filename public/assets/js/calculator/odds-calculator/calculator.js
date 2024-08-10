function calculate() {
	const a = input.get('number_a').gt(0).val();
	const b = input.get('number_b').gt(0).val();
	const type = input.get('odds').raw();

	if(!input.valid()) return;
	let results = {};
	const nod = this.nod(a, b);
	if (type === 'against') {
		results = {
			winning: +((b / (a + b)) * 100).toFixed(4) + '%',
			losing: +((a / (a + b)) * 100).toFixed(4) + '%',
			oddsWinn: `${b / nod}:${a / nod}`,
			oddsLose: `${a / nod}:${b / nod}`,
		};
	}
	else {
		results = {
			winning: +((a / (a + b)) * 100).toFixed(4) + '%',
			losing: +((b / (a + b)) * 100).toFixed(4) + '%',
			oddsWinn: `${a / nod}:${b / nod}`,
			oddsLose: `${b / nod}:${a / nod}`,
		};
	}

	output.val("*3* to *9*").replace('*3*', a).replace('*9*', b).set('result');
	output.val(results.winning).set('result-winning');
	output.val(results.losing).set('result-losing');
	output.val(results.oddsWinn).set('odd-win');
	output.val(results.oddsLose).set('odd-against');

}

function nod() {
	for (var x = arguments[0], i = 1; i < arguments.length; i++) {
		var y = arguments[i];
		while (x && y) {
			x > y ? x %= y : y %= x;
		}
		x += y;
	}
	return x;
}
