function calculate() {
	const week = input.get('pregnancy_stage').index().val();
	let height = input.get('height').gt(0).val();
	const weight = input.get('weight').gt(0).val();
	const weightBefore = input.get('weight_before').gt(0).val();
	const isTwins = _('pregnant_twins').checked;
	if(!input.valid()) return;

	height = height / 100;
	let beforeBmi = ((weightBefore) / (height * height));
	let weightUnit = 'kgs';
	let weightInLbs = weight * 2.20462;
	let weightBeforeInLbs = weightBefore * 2.20462;
	const isUSC = !isMetricSystem();
	if(isUSC) {
		weightUnit = 'lbs';
	}

	let minWeeklyGain;
	let maxWeeklyGain;
	let weightGain = [
		{min: 0, max: 0},
		{min: 0.09, max: 0.4},
		{min: 0.2, max: 0.7},
		{min: 0.3, max: 1.1},
		{min: 0.4, max: 1.5},
		{min: 0.5, max: 1.8},
		{min: 0.6, max: 2.2},
		{min: 0.6, max: 2.6},
		{min: 0.7, max: 2.9},
		{min: 0.8, max: 3.3},
		{min: 0.9, max: 3.7},
		{min: 1, max: 4},
		{min: 1.1, max: 4.4},
	];
	if(!isTwins){
		if(beforeBmi < 18.5) {
			minWeeklyGain = 1;
			maxWeeklyGain = 1.32;
		}
		else if(beforeBmi < 24.9) {
			minWeeklyGain = 0.89;
			maxWeeklyGain = 1.13;
		}
		else if(beforeBmi < 29.9) {
			minWeeklyGain = 0.515;
			maxWeeklyGain = 0.764;
		}
		else {
			minWeeklyGain = 0.367;
			maxWeeklyGain = 0.58;
		}
	}
	else {
		if(beforeBmi < 18.5) {
			minWeeklyGain = 1.35;
			maxWeeklyGain = 1.35;
		}
		else if(beforeBmi < 24.9) {
			minWeeklyGain = 1.3;
			maxWeeklyGain = 1.85;
		}
		else if(beforeBmi < 29.9) {
			minWeeklyGain = 1.1;
			maxWeeklyGain = 1.7;
		}
		else {
			minWeeklyGain = 0.9;
			maxWeeklyGain = 1.4;
		}
	}
	for(let i = 1; i <= 27; i++) {
		weightGain.push({min: 1.1 + (i * minWeeklyGain), max: 4.4 + (i * maxWeeklyGain)});
	}
	const chartWeightGain = weightGain.map((item) => {
		return {
			min: item.min * 0.453592 + weightBefore,
			max: item.max * 0.453592 + weightBefore
		}
	});
	const min = chartWeightGain.map((item) => item.min);
	const current = [{ x: week + 1, y: weight }];
	const max = chartWeightGain.map((item) => item.max);
	output.val(beforeBmi.toFixed(1) + ' kg/m2').set('beforeBmi');
	let weightRange = '';
	let deliveryWeightRange = '';
	if(isUSC) {
		weightRange = (weightBeforeInLbs + weightGain[week].min).toFixed(1) + ' - ' + (weightBeforeInLbs + weightGain[week].max).toFixed(1) + ' ' + weightUnit;
		deliveryWeightRange = (weightBeforeInLbs + weightGain[weightGain.length - 1].min).toFixed(1) + ' - ' + (weightBeforeInLbs + weightGain[weightGain.length - 1].max).toFixed(1) + ' ' + weightUnit;
	}
	else {
		weightRange = (weightBefore + weightGain[week].min * 0.453592).toFixed(1) + ' - ' + (weightBefore + weightGain[week].max * 0.453592).toFixed(1) + ' ' + weightUnit;
		deliveryWeightRange = (weightBefore + weightGain[weightGain.length - 1].min * 0.453592).toFixed(1) + ' - ' + (weightBefore + weightGain[weightGain.length - 1].max * 0.453592).toFixed(1) + ' ' + weightUnit;
	}
	output.val(weightRange).set('weight-range');
	output.val(deliveryWeightRange).set('delivery-weight-range');
	changeChartData([current, max, min]);
	let resultTable = '';
	weightGain.forEach((item, index) => {
		const fraction = item.min < 0.1 && item.min > 0 ? 2 : 1;
		if(isUSC) {
			resultTable += `<tr><td>Week ${index + 1}</td><td class="short">${(weightBeforeInLbs + item.min).toFixed(fraction)} -  ${(weightBeforeInLbs + item.max).toFixed(fraction)}  ${weightUnit}</td><td class="short">${(item.min).toFixed(fraction)} -  ${( item.max).toFixed(fraction)}  ${weightUnit}</td></tr>`;
		}
		else {
			resultTable += `<tr><td>Week ${index + 1}</td><td class="short">${(weightBefore + item.min * 0.453592).toFixed(fraction)} -  ${(weightBefore + item.max * 0.453592).toFixed(fraction)}  ${weightUnit}</td><td class="short">${(item.min * 0.453592).toFixed(fraction)} -  ${(item.max * 0.453592).toFixed(fraction)}  ${weightUnit}</td></tr>`;
		}
	});
	output.val(resultTable).set('result-table');
}
