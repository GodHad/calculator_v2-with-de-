function calculate(){
	const gender = input.get('gender').raw();
	const activity = input.get('activity').raw();
	const formula = input.get('formula').raw();
	const weight = input.get('weight').gt(0).val();
	let height = input.get('height').gt(0).val();
	let age = input.get('age').natural().gte(15).lte(80).val();
	let bodyFat = 0;
	if(!input.valid()) return;

	if(formula === 'Katch-McArdle'){
		bodyFat = input.get('fat').gt(0).val();
		if(!input.valid()) return;
	}
	const weightUnit = isMetricSystem() ? 'kg' : 'lb';
	let bmr = 0;
	let activityVal = 1;
	switch(activity){
		case 'Basal Metabolic Rate (BMR)':
			activityVal = 1;
			break;
		case 'Sedentary: little or no exercise':
			activityVal = 1.2;
			break;
		case 'Light: exercise 1-3 times/week':
			activityVal = 1.375;
			break;
		case 'Moderate: exercise 4-5 times/week':
			activityVal = 1.465;
			break;
		case 'Active: daily exercise or intense exercise 3-4 times/week':
			activityVal = 1.55;
			break;
		case 'Very Active: intense exercise 6-7 times/week':
			activityVal = 1.725;
			break;
		case 'Extra Active: very intense exercise daily or physical job':
			activityVal = 1.9;
			break;
	}
	switch(formula) {
		case 'Mifflin St Jeor':
			if(gender === 'male') {
				bmr = (10 * weight + (6.25 * height) - (5 * age) + 5);
			}
			else {
				bmr = (10 * weight + (6.25 * height) - (5 * age) - 161);
			}
			break;
		case 'Revised Harris-Benedict':
			if(gender === 'male') {
				bmr = (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362);
			}
			else {
				bmr = (9.247 * weight + (3.098 * height) - (4.330 * age) + 447.593);
			}
			break;
		case 'Katch-McArdle':
			bmr = (370 + 21.6 * (1 - (bodyFat / 100)) * weight);
			break;
	}
	bmr = bmr * activityVal;
	let units = ' cal/day';
	let step = 250;
	const weightLoss = isMetricSystem() ? 0.25 : 0.5;
	const results = [
		{
			change: '-' + weightLoss * 4 + ' ' + weightUnit + '/week',
			value: numberWithCommas(bmr - step * 4) + units,
			percent: getPercent(bmr - step * 4, bmr),
		},
		{
			change: '-' + weightLoss * 2 + ' ' + weightUnit + '/week',
			value: numberWithCommas(bmr - step * 2) + units,
			percent: getPercent(bmr - step * 2, bmr),
		},
		{
			change: '-' + weightLoss + ' ' + weightUnit + '/week',
			value: numberWithCommas(bmr - step) + units,
			percent: getPercent(bmr - step, bmr),
		},
		{
			change: '0 ' + weightUnit + '/week',
			value: numberWithCommas(bmr) + units,
			percent: '100%',
		},
		{
			change: '+' + weightLoss + ' ' + weightUnit + '/week',
			value: numberWithCommas(bmr + step) + units,
			percent: getPercent(bmr + step, bmr),
		},
		{
			change: '+' + weightLoss * 2 + ' ' + weightUnit + '/week',
			value: numberWithCommas(bmr + step * 2) + units,
			percent: getPercent(bmr + step * 2, bmr),
		},
		{
			change: '+' + weightLoss * 4 + ' ' + weightUnit + '/week',
			value: numberWithCommas(bmr + step * 4) + units,
			percent: getPercent(bmr + step * 4, bmr),
		},
	];

	results.forEach((result, index) => {
		_('change-' + index).innerHTML = result.change;
		_('cal-' + index).innerHTML = result.value;
		_('percent-' + index).innerHTML = result.percent;
	});
}

function numberWithCommas(x) {
	return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPercent(partial, total) {
	return (partial * 100 / total).toFixed(0) + '%';
}
function convert(el) {
	const joules = input.get('joules').gte(0).val();
	const calories = input.get('calories').gte(0).val();

	if(!input.valid()) return;

	_('result-joules').innerHTML = joules + ' J = ' + +(joules * 0.239006).toFixed(2) + ' cal';
	_('result-calories').innerHTML = calories + ' cal = ' + +(calories * 4.184).toFixed(2) + ' J';
}
