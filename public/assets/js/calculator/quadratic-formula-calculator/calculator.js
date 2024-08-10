function calculate() {
	const a = input.get('a').number().nonZero().val();
	const b = input.get('b').number().val();
	const c = input.get('c').number().val();
	if (!input.valid()) return;

	let result = [];

	const discriminant = math.evaluate(`${b * b} - 4 * ${a} * ${c}`);
	if (discriminant === 0) {
		result.push(math.evaluate(`-${b} / (2 * ${a}))`));
	} else if (discriminant > 0) {
		const dividend1 = math.evaluate(`(-${roundTo(b)} + sqrt(${discriminant}))`);
		const dividend2 = math.evaluate(`(-${roundTo(b)} - sqrt(${discriminant}))`);
		const divisor  = math.evaluate(`(2 * ${a})`);
		result.push(dividend1 / divisor);
		result.push(dividend2 / divisor);
	} else {
		const [num1, num2] = reduce(-b, 2 * a);
		const nums_prefix = num1 < 0 || num2 < 0 ? '-' : '';

		const [num3int, num3] = simplifySquareRoot(b * b - 4 * a * c);
		const num4int = 2 * a;
		let [num3part, num4] = reduce(num3int, num4int);
		if (num3part <= 1) num3part = "";

		result.push(`
			<p class="result-text">${nums_prefix}</p>
			${showFraction(num1, num2)}
			<p class="result-text">±</p>
			${showFraction(`${num3part}√${num3}`, num4)}`
		);

		const dividend1 = math.evaluate(`(-${roundTo(b)} + sqrt(${discriminant}))`);
		const dividend2 = math.evaluate(`(-${roundTo(b)} - sqrt(${discriminant}))`);
		const divisor  = math.evaluate(`(2 * ${a})`);

		result.push(roundTo(dividend1.re / divisor) + ' ± ' + roundTo(dividend1.im / divisor) + 'i');
	}

	_('result').innerHTML = `<p class="result-text">x = </p>${result.map(a => roundTo(a)).join(' or ')}`;

}

function reduce(numerator, denominator) {
	if (typeof numerator !== "number") return [1, denominator];
	if (typeof denominator !== "number") return [numerator, 1];
	let a = numerator;
	let b = denominator;
	let c;
	while (b) {
		c = a % b;
		a = b;
		b = c;
	}

	return [numerator / a, denominator / a];
}

function simplifySquareRoot(number) {
	let isNegative = '';
	if (number < 0) {
		number = Math.abs(number);
		isNegative = 'i';
	}

	let squareRoot = "1";

	for (let i = 2; i <= Math.sqrt(number); i++) {
		while (number % (i * i) === 0) {
			squareRoot = i * squareRoot;
			number /= (i * i);
		}
	}

	if (number === 1) {
		return [0, "1"];
	} else if (number === 0) {
		return [0, "0"];
	} else {
		return [squareRoot, `${number}${isNegative}`];
	}
}

function showFraction(num1, num2) {
	num1 = (typeof num1 === 'number') ? Math.abs(num1) : num1;
	num2 = (typeof num2 === 'number') ? Math.abs(num2) : num2;
	if (num2 === 1) return `<p class="result-text">${num1}</p>`;
	return `
	<div class="col fraction-text">` +
		`<p class="result-text text-center">${num1}</p>` +
		`<p class="result-text text-center">${num2}</p>` +
		`</div>`;
}