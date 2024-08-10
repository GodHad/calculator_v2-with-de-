function calculate() {
	const decimal_number = input.get('decimal_number').number().val();

	_('result').innerHTML = decimal_number * 100 + '%';
}
