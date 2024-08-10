function calculate() {
	const gender = input.get('gender').raw();
	const formula = input.get('formula').index().val();
	const activityVal = input.get('activity').index().val();
	const weight = input.get('weight').gt(0).val();
	let height = input.get('height').gt(0).val();
	let age = input.get('age').natural().gte(18).lte(80).val();
	let bodyFat = 0;
	if(!input.valid()) return;
	if(formula === 2){
		bodyFat = input.get('fat').gt(0).val();
		if(!input.valid()) return;
	}

	let bmr = 0;
	let activity = 1;
	switch(activityVal) {
		case 0:
			activity = 1;
			break;
		case 1:
			activity = 1.2;
			break;
		case 2:
			activity = 1.375;
			break;
		case 3:
			activity = 1.465;
			break;
		case 4:
			activity = 1.55;
			break;
		case 5:
			activity = 1.725;
			break;
		case 6:
			activity = 1.9;
			break;
	}

	switch(formula) {
		case 0:
			if(gender === 'male') {
				bmr = (10 * weight + (6.25 * height) - (5 * age) + 5) * activity;
			}
			else {
				bmr = (10 * weight + (6.25 * height) - (5 * age) - 161) * activity;
			}
			break;
		case 1:
			if(gender === 'male') {
				bmr = (13.397 * weight + (4.799 * height) - (5.677 * age) + 88.362) * activity;
			}
			else {
				bmr = (9.247 * weight + (3.098 * height) - (4.330 * age) + 447.593) * activity;
			}
			break;
		case 2:
			bmr = (370 + 21.6 * (1 - (bodyFat / 100)) * weight) * activity;
			break;
	}
	let step = 250;
	bmr = +bmr.toFixed(0);

	const weightLoss = isMetricSystem() ? 0.25 : 0.5;
	const weightUnit = isMetricSystem() ? 'kg' : 'lb';
	_('text-result').innerHTML = numberWithCommas(bmr);

	if(activity === 1){
		_('result').style.display = 'none';
	}
	else {
		_('result').style.display = 'block';

		_('result_1_weight').innerHTML = '-' + weightLoss * 4 + ' ' + weightUnit + '/week';
		_('result_1').innerHTML = numberWithCommas(bmr - step * 4) + ' cal/day';
		_('result_1_percent').innerHTML = getPercent(bmr - step * 4, bmr) + '%';

		_('result_2_weight').innerHTML = '-' + weightLoss * 2 + ' ' + weightUnit + '/week';
		_('result_2').innerHTML = numberWithCommas(bmr - step * 2) + ' cal/day';
		_('result_2_percent').innerHTML = getPercent(bmr - step * 2, bmr) + '%';

		_('result_3_weight').innerHTML = '-' + weightLoss + ' ' + weightUnit + '/week';
		_('result_3').innerHTML = numberWithCommas(bmr - step) + ' cal/day';
		_('result_3_percent').innerHTML = getPercent(bmr - step, bmr) + '%';

		_('result_4_weight').innerHTML = '0 ' + weightUnit + '/week';
		_('result_4').innerHTML = numberWithCommas(bmr) + ' cal/day';
		_('result_4_percent').innerHTML = '100%';

		_('result_5_weight').innerHTML = '+' + weightLoss + ' ' + weightUnit + '/week';
		_('result_5').innerHTML = numberWithCommas(bmr + step) + ' cal/day';
		_('result_5_percent').innerHTML = getPercent(bmr + step, bmr) + '%';

		_('result_6_weight').innerHTML = '+' + weightLoss * 2 + ' ' + weightUnit + '/week';
		_('result_6').innerHTML = numberWithCommas(bmr + step * 2) + ' cal/day';
		_('result_6_percent').innerHTML = getPercent(bmr + step * 2, bmr) + '%';

		_('result_7_weight').innerHTML = '+' + weightLoss * 4 + ' ' + weightUnit + '/week';
		_('result_7').innerHTML = numberWithCommas(bmr + step * 4) + ' cal/day';
		_('result_7_percent').innerHTML = getPercent(bmr + step * 4, bmr) + '%';
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getPercent(partial, total) {
	return (partial * 100 / total).toFixed(0)
}
