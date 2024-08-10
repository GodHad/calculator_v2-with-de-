function calculate() {
	const gender = input.get('gender').raw();
	const height = input.get('height').gt(0).val();
	const neck = input.get('neck').gt(0).val();
	const waist = input.get('waist').gte('neck').val();
	const age = input.get('age').gte(17).lte(80).val();
	const hip = input.get('hip').gt(0).val();
	if(!input.valid()) return;
	let bodyFat;
	if(gender === 'male') {
		bodyFat = (495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height))) - 450;
	}
	else {
		bodyFat = (495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height))) - 450;
	}

	let success = isSuccess(bodyFat, age , gender);
	const allowedValues = dataTable.find(function(el) {
		return age <= el.age;
	});

	if(success){
		output.val("You meet the Department of Defense goal: 28% body fat for males, and 34% body fat for females.").replace(28, allowedValues.male).replace(34, allowedValues.female).set("result-description");
	} else {
		output.val("You are not in compliance with the Department of Defense body fat goal.").set("result-description");
	}
	output.val("15%").replace(15, bodyFat.toFixed(0)).set("result");
}

function isSuccess(bodyFat, age, gender) {
	if(gender === 'male') {
		if((age >= 17 && age <= 20 && bodyFat <= 24)
			|| (age >= 21 && age <= 27 && bodyFat <= 26)
			|| (age >= 28 && age <= 39 && bodyFat <= 28)
			|| (age >= 40 && bodyFat <= 30)) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		if((age >= 17 && age <= 20 && bodyFat <= 30)
			|| (age >= 21 && age <= 27 && bodyFat <= 32)
			|| (age >= 28 && age <= 39 && bodyFat <= 34)
			|| (age >= 40 && bodyFat <= 36)) {
			return true;
		}
		else {
			return false;
		}
	}
}

const dataTable = [
	{
		age: 20,
		male: 24,
		female: 30,
	},
	{
		age: 27,
		male: 26,
		female: 32,
	},
	{
		age: 39,
		male: 28,
		female: 34,
	},
	{
		age: 80,
		male: 30,
		female: 36,
	},
];
