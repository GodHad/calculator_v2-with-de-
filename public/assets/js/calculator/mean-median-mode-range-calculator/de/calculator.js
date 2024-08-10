function calculate() {
	const numbers = input.get('data_set').split(/[ ,]+/).numbers().vals();
	if(!input.valid()) return;

	const numbersLength = numbers.length;
	const sum = numbers.reduce((a, b) => a + b, 0);
	const mean = sum / numbersLength;
	let median;

	if(numbersLength % 2 === 0){
		median = (numbers[numbersLength / 2] + numbers[(numbersLength / 2) - 1]) / 2;
	}
	else {
		median = numbers[Math.floor(numbersLength / 2)]
	}
	const modeValue = mode(numbers);
	const min = Math.min(...numbers);
	const max = Math.max(...numbers);
	const range =  max - min;

	_('mean').innerHTML = mean;
	_('min').innerHTML = min;
	_('max').innerHTML = max;
	_('median').innerHTML = median;
	_('range').innerHTML = range;
	_('sum').innerHTML = sum;
	_('count').innerHTML = numbersLength;
	_('mode').innerHTML = modeValue;
	_('geometric-mean').innerHTML = getGeometricMean(numbers);

	changeChartData(numbers);
}

function mode(array) {
	let counts = {}
	let result = [];
	array.forEach((e) => {
		if(counts[e] === undefined) {
			counts[e] = 0
		}
		counts[e] += 1
	});

	let values = Object.values(counts);
	let keys = Object.keys(counts);

	const max = Math.max(...values);
	if(max === 1) {
		return 'Alle Werte erschienen genau einmal.';
	}
	keys.forEach((key) => {
		if(counts[key] === max) {
			result.push(key)
		}
	});
	if(result.length === 1) {
		return result[0] + ' erschienen ' + plural(max, 'Mal:Mal:Mal:Male:Mal:Mal');
	}
	else {
		return result.join(', ') + ' jeder erschien ' + plural(max, 'Mal:Mal:Mal:Male:Mal:Mal');
	}
}

function getGeometricMean(numbers) {
	let product = 1;
	for (var i = 0; i < numbers.length; i++) {
		product *= numbers[i];
	}
	const geometricMean = Math.pow(product, 1 / numbers.length);
	return geometricMean;
}
