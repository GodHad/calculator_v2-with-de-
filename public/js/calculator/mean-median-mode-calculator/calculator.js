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
	const q1Value = q1(numbers);
	const q3Value = q3(numbers);
	const iqr = q3Value - q1Value;
	const outliersValue = outliers(numbers, q1Value, q3Value);
	_('mean-x').innerHTML = mean;
	_('outliers').innerHTML = outliersValue;
	_('median-x').innerHTML = median;
	_('q-1').innerHTML = q1Value;
	_('q-2').innerHTML = median;
	_('q-3').innerHTML = q3Value;
	_('mode').innerHTML = modeValue;
	_('range').innerHTML = range;
	_('min').innerHTML = min;
	_('max').innerHTML = max;
	_('iqr').innerHTML = iqr;
	_('sum').innerHTML = sum;
	_('count').innerHTML = numbersLength;
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
		return 'All values appeared just once.';
	}
	keys.forEach((key) => {
		if(counts[key] === max) {
			result.push(key)
		}
	});
	if(result.length === 1) {
		return result[0] + ' appeared ' + max + ' times';
	}
	else {
		return result.join(', ') + ' each appeared ' + max + ' times'
	}
}

function q3(numbers) {
	const position = Math.ceil(numbers.length / 2);
	let array = numbers.map(x => x);
	array = array.splice(position);
	const arrayLength = array.length;
	let median;
	if(arrayLength % 2 === 0){
		median = (array[arrayLength / 2] + array[(arrayLength / 2) - 1]) / 2;
	}
	else {
		median = array[Math.floor(arrayLength / 2)]
	}
	return median;
}

function q1(numbers) {
	const arrayLength = Math.floor(numbers.length / 2);
	let array = numbers.map(x => x);
	array = array.splice(0, arrayLength);
	if(arrayLength % 2 === 0){
		return (array[arrayLength / 2] + array[(arrayLength / 2) - 1]) / 2;
	}
	else {
		return array[Math.floor(arrayLength / 2)]
	}
}

function outliers(numbers, q1, q3) {
	const iqr = q3 - q1;
	const result = [];
	numbers.forEach(x => {
		if(x > (q3 + 1.5 * iqr) || x < (q1 - 1.5 * iqr)){
			result.push(x)
		}
	})
	if(!result.length) {
		return 'none';
	}
	else {
		return result.join(', ');
	}
}
