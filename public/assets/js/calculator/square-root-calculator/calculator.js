function calculate() {
	const number = input.get('number').number().val();

	let result = roundTo(Math.sqrt(Math.abs(number)));
	let resultText = number + ' = ' + result;
	if(number < 0) resultText += 'i' + ' or ' + '-' + result + 'i';

	_('result').innerHTML = resultText;
}
