function calculate() {
	const numbers = input.get('data_set').split(/[ ,]+/).numbers().vals();
	if(!Array.isArray(numbers) || numbers.length < 2) input.error('data_set', 'Please provide at least two numbers.');
	if(!input.valid()) return;
	const numbersLength = numbers.length;
	const sum = numbers.reduce((a, b) => a + b, 0);
	const mean = sum / numbersLength;
	const delimiterSample = numbersLength - 1;
	const delimiterPopulation = numbersLength;
	const varianceSample = numbers.reduce((a, b) => a + Math.pow((b - mean), 2) / delimiterSample, 0);
	const variancePopulation = numbers.reduce((a, b) => a + Math.pow((b - mean), 2) / delimiterPopulation, 0);
	const standardDeviationSample = Math.sqrt(varianceSample);
	const standardDeviationPopulation = Math.sqrt(variancePopulation);
	const ss = numbers.reduce((a, b) => a + Math.pow((b - mean), 2), 0);

	_('standard-deviation-sample').innerHTML = +standardDeviationSample.toFixed(4);
	_('standard-deviation-population').innerHTML = +standardDeviationPopulation.toFixed(4);
	_('variance-sample').innerHTML = +varianceSample.toFixed(4);
	_('variance-population').innerHTML = +variancePopulation.toFixed(4);
	_('mean-sample').innerHTML = +mean.toFixed(4);
	_('mean-population').innerHTML = +mean.toFixed(4);
	_('count-sample').innerHTML = numbersLength;
	_('count-population').innerHTML = numbersLength;
	_('sum-sample').innerHTML = +ss.toFixed(4);
	_('sum-population').innerHTML = +ss.toFixed(4);
}
