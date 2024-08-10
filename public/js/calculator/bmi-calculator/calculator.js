function calculate(){
	const gender = input.get('gender').raw();
	const weight = input.get('weight').gt(0).val();
	let height = input.get('height').gt(0).val();
	let age = input.get('age').natural().gte(2).lte(120).val();

	if(!input.valid()) return;

	const weightUnit = isMetricSystem() ? 'kgs' : 'lbs';
	const originWeight = isMetricSystem() ? weight : weight * 2.20462;
	height = height / 100;
	const bmiUnit = 'kg/m<sup>2</sup>';
	const bmi = +(weight / (height * height)).toFixed(1);
	let indicatorPosition = ((bmi - 12) * 4) > 100 ? 100 : ((bmi - 12) * 4);
	if(indicatorPosition < 0) indicatorPosition = 0;
	let range;
	let bmiRange;
	let category;
	let diff = {
		gain: '-',
		lose: '-',
		gainLabel: 'Gain to reach a BMI of 18.5 kg/m<sup>2</sup>',
		loseLabel: 'Lose to reach a BMI of 25 kg/m<sup>2</sup>',
	};
	const pi = ((weight) / (height * height * height)).toFixed(2);
	if(age < 21) {
		const minBmi = childBMI[age].min[gender];
		const maxBmi = childBMI[age].max[gender];
		range = (getWeightFromBmi(minBmi, height)).toFixed(1) + ' ' + weightUnit + ' - ' +  (getWeightFromBmi(maxBmi, height)).toFixed(1) + ' ' + weightUnit;
		bmiRange = minBmi +' ' + bmiUnit + ' - ' + maxBmi + ' ' + bmiUnit;
		if(bmi < minBmi){
			category = 'Underweight';
		}
		else if(bmi < maxBmi){
			category = 'Healthy weight';
		}
		else if(bmi > maxBmi){
			category = 'At risk of overweight';
		}
		diff.gainLabel = 'Gain to reach a BMI of ' + minBmi + bmiUnit;
		diff.loseLabel = 'Lose to reach a BMI of ' + maxBmi + bmiUnit;

		if(bmi < minBmi){
			diff.gain = (getWeightFromBmi((minBmi), height) - originWeight).toFixed(1) + weightUnit;
		}
		else if(bmi > maxBmi){
			diff.lose = (originWeight - getWeightFromBmi((maxBmi), height)).toFixed(1) + weightUnit;
		}
	}
	else {
		range = (getWeightFromBmi(18.5, height)).toFixed(1) + ' ' + weightUnit + ' - ' + (getWeightFromBmi(25, height)).toFixed(1) + ' ' + weightUnit;
		bmiRange = '18.5 ' + bmiUnit + ' - ' +  '25 ' + bmiUnit;
		if(bmi < 18.5){
			category = 'Underweight';
		}
		else if(bmi < 25){
			category = 'Healthy weight';
		}
		else if(bmi < 30){
			category = 'Overweight';
		}
		else {
			category = 'Obese';
		}

		if(bmi < 18.5){
			diff.gain = (getWeightFromBmi((18.5), height) - originWeight).toFixed(1) + ' ' + weightUnit;
		}
		else if(bmi > 25){
			diff.lose = (originWeight - getWeightFromBmi((25), height)).toFixed(1) + ' ' + weightUnit;
		}
	}

	_('bmi-value').innerHTML = bmi + ' ' + bmiUnit;
	_('bmi-category').innerHTML = category;
	_('bmi-range').innerHTML = bmiRange;
	_('weight-range').innerHTML = range;
	_('ponderal-index').innerHTML = pi + ' kg/m<sup>3</sup>';

	$('.table-progress__indicator').style.left = indicatorPosition + '%';
	_('weight-gain').innerHTML = diff.gain;
	_('weight-lose').innerHTML = diff.lose;
	_('weight-lose-label').innerHTML = diff.loseLabel;
	_('weight-gain-label').innerHTML = diff.gainLabel;
}

function getWeightFromBmi(bmi, height){
	let weight = bmi * Math.pow(height, 2);
	if(!isMetricSystem()){
		weight = weight * 2.20462;
	}
	return weight;
}

const childBMI = {
	'2' : {
		min: {
			male: 14.7,
			female: 14.4,
		},
		max	: {
			male: 18.2,
			female: 18,
		}
	},
	'3' : {
		min: {
			male: 14.3,
			female: 14,
		},
		max	: {
			male: 17.4,
			female: 17.2,
		}
	},
	'4' : {
		min: {
			male: 14,
			female: 13.7,
		},
		max	: {
			male: 16.9,
			female: 16.8,
		}
	},
	'5' : {
		min: {
			male: 13.8,
			female: 13.5,
		},
		max	: {
			male: 16.8,
			female: 16.8,
		}
	},
	'6' : {
		min: {
			male: 13.7,
			female: 13.4,
		},
		max	: {
			male: 17,
			female: 17.1,
		}
	},
	'7' : {
		min: {
			male: 13.7,
			female: 13.4,
		},
		max	: {
			male: 17.4,
			female: 17.6,
		}
	},
	'8' : {
		min: {
			male: 13.8,
			female: 13.5,
		},
		max	: {
			male: 17.9,
			female: 18.3,
		}
	},
	'9' : {
		min: {
			male: 14,
			female: 13.7,
		},
		max	: {
			male: 18.6,
			female: 19.1,
		}
	},
	'10' : {
		min: {
			male: 14.2,
			female: 14,
		},
		max	: {
			male: 19.4,
			female: 19.9,
		}
	},
	'11' : {
		min: {
			male: 14.5,
			female: 14.4,
		},
		max	: {
			male: 20.2,
			female: 20.8,
		}
	},
	'12' : {
		min: {
			male: 15,
			female: 14.8,
		},
		max	: {
			male: 21,
			female: 21.7,
		}
	},
	'13' : {
		min: {
			male: 15.4,
			female: 15.3,
		},
		max	: {
			male: 21.8,
			female: 22.5,
		}
	},
	'14' : {
		min: {
			male: 16,
			female: 15.8,
		},
		max	: {
			male: 22.6,
			female: 23.3,
		}
	},
	'15' : {
		min: {
			male: 16.5,
			female: 16.3,
		},
		max	: {
			male: 23.4,
			female: 24,
		}
	},
	'16' : {
		min: {
			male: 17.1,
			female: 16.8,
		},
		max	: {
			male: 24.2,
			female: 24.6,
		}
	},
	'17' : {
		min: {
			male: 17.7,
			female: 17.2,
		},
		max	: {
			male: 24.9,
			female: 25.2,
		}
	},
	'18' : {
		min: {
			male: 18.2,
			female: 17.5,
		},
		max	: {
			male: 25.6,
			female: 25.7,
		}
	},
	'19' : {
		min: {
			male: 18.7,
			female: 17.8,
		},
		max	: {
			male: 26.3,
			female: 26.1,
		}
	},
	'20' : {
		min: {
			male: 19.1,
			female: 17.8,
		},
		max	: {
			male: 27,
			female: 26.5,
		}
	},
};
