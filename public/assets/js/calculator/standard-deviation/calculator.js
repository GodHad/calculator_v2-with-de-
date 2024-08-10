function calculate() {
	const numbers = input.get('data_set').split(/[ ,]+/).numbers().vals();
	const group = input.get('group').raw();

	if(!Array.isArray(numbers) || numbers.length < 2) {
		input.error(['data_set'], 'Please provide at least two numbers.');
	}
	if(!input.valid()) return;

	const numbersLength = numbers.length;
	const sum = numbers.reduce((a, b) => a + b, 0);
	const mean = sum / numbersLength;
	const delimiter = group=== 'population' ? numbersLength : numbersLength - 1;
	const variance = numbers.reduce((a, b) => a + Math.pow((b - mean), 2) / delimiter, 0);
	const standardDeviation = Math.sqrt(variance);
	const meanSymbol = group === 'population' ? 'μ' : 'x̄';
	const standardDeviationSymbol = group === 'population' ? 'σ' : 's';
	const varianceSymbol = group === 'population' ? 'σ<sup>2</sup>' : 's<sup>2</sup>';

	_('standard-deviation').innerHTML = standardDeviationSymbol + ' = ' + +standardDeviation.toFixed(2);
	_('variance').innerHTML = varianceSymbol + ' = ' + +variance.toFixed(2);
	_('mean').innerHTML = meanSymbol + ' = ' + +mean.toFixed(2);
	_('count').innerHTML = 'n = ' + numbersLength;
	_('sum').innerHTML = 'SS = ' + sum;
}
