function calculate() {
	const gender = input.get('gender').raw();
	const age = input.get('age').gte(2).val();
	let height = input.get('height').gt(0).val();
	if(!input.valid()) return;
	let hamwi, devine, robinson, miller, range;
	const weightUnits = isMetricSystem() ? ' kgs' : ' lbs';
	if(age > 20) {
		range = getWeightFromBmi(18.5,  height / 100) + ' - ' + getWeightFromBmi(25,  height / 100);
	}
	else {
		range = getWeightFromBmi(childBMI[age].min[gender],  height / 100) + ' - ' +  getWeightFromBmi(childBMI[age].max[gender],  height / 100)
	}
	if(height >= 152.4) {
		const inchSteps = (height - 152.4) / 2.54;
		if(gender === 'male'){
			hamwi = 48 + 2.7 * inchSteps;
			devine = 50 + 2.3 * inchSteps;
			robinson = 52 + 1.9 * inchSteps;
			miller = 56.2 + 1.41 * inchSteps;
		}
		else {
			hamwi = 45.5 + 2.2 * inchSteps;
			devine = 45.5 + 2.3 * inchSteps;
			robinson = 49 + 1.7 * inchSteps;
			miller = 53.1 + 1.36 * inchSteps;
		}

		_('robinson').innerHTML = clearWeightResult(robinson) + weightUnits;
		_('miller').innerHTML = clearWeightResult(miller) + weightUnits;
		_('devine').innerHTML = clearWeightResult(devine) + weightUnits;
		_('hamwi').innerHTML = clearWeightResult(hamwi) + weightUnits;
		_('bmi-range').innerHTML = range + weightUnits;

		_('table-result').style.display = 'block';
		_('text-result').style.display = 'none';
	}
	else {
		let resultText = '';
		if(age > 20){
			resultText = "According to the World Health Organization's recommendations, your healthy weight range is " + range  + weightUnits;
		}
		else {
			if(gender === 'male'){
				resultText = 'Based on the CDC chart for boys, the healthy weight range is ' + range + weightUnits;
			}
			else {
				resultText = 'Based on the CDC chart for girls, the healthy weight range is ' + range + weightUnits;
			}
		}
		_('simple-result').innerHTML = resultText;
		_('table-result').style.display = 'none';
		_('text-result').style.display = 'block';
	}
}

function getWeightFromBmi(bmi, height){
	return clearWeightResult(bmi * Math.pow(height, 2));
}
function clearWeightResult(weight){
	if(isMetricSystem()){
		return Number(weight.toFixed(1));
	}
	return Number((weight * 2.20462).toFixed(1));
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
