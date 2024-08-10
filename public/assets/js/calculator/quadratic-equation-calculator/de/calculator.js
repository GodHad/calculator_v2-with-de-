function calculate() {
	const a = input.get('a').number().val();
	const b = input.get('b').number().val();
	const c = input.get('c').number().val();

	let result = [];

	const discriminant = math.evaluate(`${b}^2 - 4 * ${a} * ${c}`);
	if (discriminant < 0) {
		_('result').innerHTML = 'Es gibt keine reellen Wurzeln';
		return false;
	} else if (discriminant === 0) {
		result.push(math.evaluate(`-${b} / (2 * ${a}))`));
	} else {
		result.push(math.evaluate(`(-${b} + sqrt(${discriminant})) / (2 * ${a})`));
		result.push(math.evaluate(`(-${b} - sqrt(${discriminant})) / (2 * ${a})`));
	}

	equationPreview(a, b, c);
	_('result').innerHTML = `x = ${result.map(a => roundTo(a)).join(' oder ')}`;
}

function roundTo(num) {
	if (typeof num !== 'number' || !isFinite(num)) return num;
	return +(Math.round(num + "e+5") + "e-5");
}

function equationPreview(a, b, c) {
	_('a_input').innerHTML = a;

	if(b < 0) {
		_('b_input').innerHTML = `- ${0 - b}`;
	} else {
		_('b_input').innerHTML = `+ ${b}`;
	}

	if(c < 0) {
		_('c_input').innerHTML = `- ${0 - c}`;
	} else {
		_('c_input').innerHTML = `+ ${c}`;
	}
}