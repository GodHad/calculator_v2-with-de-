function calculate() {
	const data_set = input.get('data_set').raw();

	if (!data_set) {
		input.error(['data_set'], 'Enter range');
		return;
	}

	const numbers = data_set.split(',').map(n => Number(n.trim()));

	if (numbers.some(n => isNaN(n))) {
		input.error(['data_set'], 'Enter valid numbers');
		return;
	}

	const {sum, count, largest, smallest, median, range, geometricMean, average} = calculateAverages(numbers);

	_('result').innerHTML = average;
	_('largest').innerHTML = largest;
	_('smallest').innerHTML = smallest;
	_('median').innerHTML = median;
	_('range').innerHTML = range;
	_('geometric_mean').innerHTML = geometricMean;
	$$('.sum').forEach(el => el.innerHTML = sum);
	$$('.count').forEach(el => el.innerHTML = count);
}

function calculateAverages(numbers) {
	const sortedNumbers = numbers.sort((a, b) => a - b);
	const sum = numbers.reduce((acc, curr) => acc + curr, 0);
	const count = numbers.length;
	const largest = sortedNumbers[count - 1];
	const smallest = sortedNumbers[0];
	const middleIndex = Math.floor(count / 2);
	const median = count % 2 === 0 ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2 : sortedNumbers[middleIndex];
	const range = largest - smallest;
	const product = numbers.reduce((acc, curr) => acc * curr, 1);
	const geometricMean = roundTo(Math.pow(product, 1 / count), 8);
	const average = roundTo(sum / count, 8);
	return {sum, count, largest, smallest, median, range, geometricMean, average};
}
