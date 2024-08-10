function calculate(){
	const gender = input.get('gender').raw();
	const weight = input.get('weight').gt(0).val();
	let height = input.get('height').gt(0).val();
	let neck = input.get('neck').gt(0).val();
	let waist = input.get('waist').gte('neck').val();
	let age = input.get('age').natural().gte(15).lte(80).val();
	let hip = input.get('hip').gt(0).val();
	const method = input.get('method').raw();
	if(!input.valid()) return;

	const weightUnit = isMetricSystem() ? 'kgs' : 'lbs';

	const bmi = weight / Math.pow(height / 100, 2);
	let bfpBmi = 0;
	let bfpNavi = 0;
	if(gender === 'male'){
		if(age > 17){
			bfpBmi = 1.2 * bmi + 0.23 * age - 16.2;
		}
		else {
			bfpBmi = 1.51 * bmi - 0.7 * age - 2.2;
		}
		bfpNavi = (495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height))) - 450;
	}
	else {
		if(age > 17){
			bfpBmi = 1.20 * bmi + 0.23 * age - 5.4;
		}
		else {
			bfpBmi = 1.51 * bmi - 0.7 * age + 1.4;
		}
		bfpNavi = (495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height))) - 450;
	}
	bfpNavi = bfpNavi < 0 ? 0 : bfpNavi;
	bfpBmi = bfpBmi < 0 ? 0 : bfpBmi;

	const bfUserMethod = method === 'bmi' ? bfpBmi : bfpNavi;

	const fm = isMetricSystem() ? (bfpNavi * weight) / 100 : ((bfUserMethod * weight) / 100) * 2.20462;
	const lm = isMetricSystem() ? (weight - fm) : (weight - fm) * 2.20462;
	const bfCategory = getCategory(gender, bfUserMethod);
	const idealBf = getIdealBf(age, gender).toFixed(1);
	const bfToLose = isMetricSystem() ? (((bfUserMethod - idealBf) * weight) / 100) : (((bfUserMethod - idealBf) * weight) / 100) * 2.20462;

	let arrowPosition = '';

	if(gender === 'male') {
		arrowPosition = (bfUserMethod * 3.5);
	}
	else {
		arrowPosition = ((bfUserMethod - 8) * 3.5);
	}
	arrowPosition = arrowPosition < 0 ? 0 : arrowPosition;
	arrowPosition = arrowPosition > 100 ? 100 : arrowPosition;

	$('.table-progress-list.table-progress-list--fat').setAttribute('data-gender', gender);
	if(gender === 'female') {
		$('.table-progress--fat').style.background = 'linear-gradient(90deg, #ff8686 0, #ffdd84 7%, #ffdd84 19%, #9cff84 21%, #9cff84 44%, #87b958 45.5%, #87b958 58%, #ffdd86 59.5%, #ffdd86 82%, #ff8585 84%, #ff8585 100%)';
	}
	else {
		$('.table-progress--fat').style.background = 'linear-gradient(90deg, #ff8686 0, #ffdd84 7%, #ffdd84 19%, #9cff84 21%, #9cff84 47%, #87b958 49%, #87b958 61%, #ffdd86 63%, #ffdd86 85%, #ff8585 87.5%, #ff8585 100%)';
	}
	$('.table-progress__indicator').style.left = arrowPosition + '%';
	_('bf').innerHTML = bfUserMethod.toFixed(1) + '%';
	_('bf-ideal').innerHTML = idealBf + '%';
	_('bf-category').innerHTML = bfCategory;
	_('bf-mass').innerHTML = fm.toFixed(1) + ' ' + weightUnit;
	_('lb-mass').innerHTML = lm.toFixed(1) + ' ' + weightUnit;
	if(bfToLose > 0){
		_('bf-to-lose').innerHTML = bfToLose.toFixed(1) + ' ' + weightUnit;
	}
	else {
		_('bf-to-lose').innerHTML = '-';
	}
}

function getCategory(gender, bfpNavi){
	const bfCategories = [
		{
			description: 'Essential fat',
			female: '0-13',
			male: '0-5',
		},
		{
			description: 'Athletes',
			female: '14-20',
			male: '6-13',
		},
		{
			description: 'Fitness',
			female: '21-24',
			male: '14-17',
		},
		{
			description: 'Average',
			female: '25-31',
			male: '18-24',
		},
		{
			description: 'Obese',
			female: '32-100',
			male: '25-100',
		}
	];
	return bfCategories.find(x => {
		let range = x[gender].split('-');
		return (Number(bfpNavi.toFixed()) >= parseFloat(range[0]) && Number(bfpNavi.toFixed()) <= parseFloat(range[1]));
	}).description;
}

function getIdealBf(age, gender){
	const idealBfList = [
		{
			age: 20,
			female: 17.7,
			male: 8.5,
		},
		{
			age: 25,
			female: 18.4,
			male: 10.5,
		},
		{
			age: 30,
			female: 19.3,
			male: 12.7,
		},
		{
			age: 35,
			female: 21.5,
			male: 13.7,
		},
		{
			age: 40,
			female: 22.2,
			male: 15.3,
		},
		{
			age: 45,
			female: 22.9,
			male: 16.4,
		},
		{
			age: 50,
			female: 25.2,
			male: 18.9,
		},
		{
			age: 55,
			female: 26.3,
			male: 20.9,
		},
	];
	age = age > 55 ? 55 : age;
	return idealBfList.find(x => {
		return age <= x.age;
	})[gender];
}
