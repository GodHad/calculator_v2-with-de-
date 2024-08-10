function calculate(){
	const gender = input.get('gender').raw();
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
	let bmr = 0;
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

	_('bmr').innerHTML = numberWithCommas(bmr.toFixed(0));
	_('bmr-no-exercise').innerHTML = numberWithCommas((bmr * 1.2).toFixed(0));
	_('bmr-low').innerHTML = numberWithCommas((bmr * 1.375).toFixed(0));
	_('bmr-light').innerHTML = numberWithCommas((bmr * 1.465).toFixed(0));
	_('bmr-medium').innerHTML = numberWithCommas((bmr * 1.55).toFixed(0));
	_('bmr-high').innerHTML = numberWithCommas((bmr * 1.725).toFixed(0));
	_('bmr-very-high').innerHTML = numberWithCommas((bmr * 1.9).toFixed(0));
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
