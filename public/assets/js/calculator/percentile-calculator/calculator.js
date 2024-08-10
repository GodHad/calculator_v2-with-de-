function calculate() {
	const numbers = input.get('data_set').split(/[ ,]+/).numbers().vals();
	const percentile = input.get('percentile').positive().lte(100).val();

	if (!input.valid()) return;

	const data = numbers.sort(function (a, b) {
		return a - b;
	});

	const result = calculatePercentile(data, percentile);

	const percentilesData = percentiles(data);

	Object.keys(percentilesData).forEach(key => {
		_("perc_" + key).innerHTML = percentilesData[key];
	});

	output.val('The 15th Percentile is 10.55')
		.replace('15th', numberSuffix(percentile))
		.replace('10.55', result).set('result_text');
}

function calculatePercentile(data, percentile) {
	// Sort the data array in ascending order
	let result;

	// Find the index of the percentile value
	const index = (percentile / 100) * (data.length - 1);

	// Check if the index is an integer
	if (index % 1 === 0) {
		// If the index is an integer, return the corresponding value
		result = data[index];
	} else {
		// If the index is not an integer, interpolate between values
		const floor = Math.floor(index);
		const ceil = Math.ceil(index);
		const lowerValue = data[floor];
		const upperValue = data[ceil];
		result = lowerValue + (upperValue - lowerValue) * (index - floor);
	}

	return roundTo(result, 2);
}

function percentiles(data) {
	for (let i = 0; i <= 100; i += 5) {
		percentiles[i] = roundTo(calculatePercentile(data, i), 2);
	}

	return percentiles;
}

function numberSuffix(i) {
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + "st";
	}
	if (j == 2 && k != 12) {
		return i + "nd";
	}
	if (j == 3 && k != 13) {
		return i + "rd";
	}
	return i + "th";
}
