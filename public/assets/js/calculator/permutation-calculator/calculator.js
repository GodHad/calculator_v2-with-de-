function calculate() {
	let n = input.get('n').gte(0).integer().val();
	let r = input.get('r').lte('n').integer().val();
	if(!input.valid()) return;
	const result = math.permutations(math.bignumber(n),math.bignumber(r));
	_('result').innerHTML = result.toFixed().length > 500 ? result : result.toFixed();
}

window.addEventListener('load', () => math.config({number: 'BigNumber', precision: 500}));
