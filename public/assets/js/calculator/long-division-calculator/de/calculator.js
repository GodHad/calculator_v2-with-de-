function calculate() {
	const dividend = input.get('dividend').number().val();
	const divisor = input.get('divisor').number().lt('dividend').val();
	const results = [];

	if (!input.valid()) return;

	const quotient = Math.floor(dividend / divisor);
	const remainder = roundTo(dividend % divisor);

	results.push(`${dividend}÷${divisor}`);
	results.push(`${quotient} R ${remainder}`);
	results.push(`${quotient} ${remainder}/${divisor}`);

	_('result').innerHTML = results.join(' = ');
}
