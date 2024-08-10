function calculate(){
	const calcType = input.get('find').raw();
	const massD = input.get('mass_density').gt(0).number().val();
	const massUnitD = input.get('mass_dropdown_density').index().val();
	const densityUnitLabel = input.get('density_unit_density').raw();
	const densityUnit = input.get('density_unit_density').index().val();
	const massUnit = input.get('mass_unit_mass').index().val();
	const massUnitLabel = input.get('mass_unit_mass').raw();
	const volumeUnit = input.get('volume_unit_volume').index().val();
	const volumeUnitLabel = input.get('volume_unit_volume').raw();
	const massV = input.get('mass_volume').gt(0).number().val();
	const massUnitV = input.get('mass_dropdown_volume').index().val();
	const volumeD = input.get('volume_density').gt(0).number().val();
	const volumeUnitD = input.get('volume_dropdown_density').index().val();
	const volumeM = input.get('volume_mass').gt(0).number().val();
	const volumeUnitM = input.get('volume_dropdown_mass').index().val();
	const densityM = input.get('density_mass').gt(0).number().val();
	const densityUnitM = input.get('density_dropdown_mass').index().val();
	const densityV = input.get('density_volume').gt(0).number().val();
	const densityUnitV = input.get('density_dropdown_volume').index().val();
	if(!input.valid()) return;

	let result = '';
	if(calcType === 'density'){
		const pInGramsPerCubicCentimeter = massInGrams(massD, massUnitD) / volumeInCubicCentimeters(volumeD, volumeUnitD);
		result = 'p = ' + numberWithCommas(densityResult(pInGramsPerCubicCentimeter, densityUnit)) + ' ' + densityUnitLabel;
	}
	else if(calcType === 'mass'){
		const mInGrams = densityInGramsPerCubicCentimeter(densityM, densityUnitM) * volumeInCubicCentimeters(volumeM, volumeUnitM);
		result = 'm = ' + numberWithCommas(massResult(mInGrams, massUnit)) + ' ' + massUnitLabel;
	}
	else if(calcType === 'volume'){
		const vInCubicCentimeters = massInGrams(massV, massUnitV) / densityInGramsPerCubicCentimeter(densityV, densityUnitV);
		result = 'V = ' + numberWithCommas(volumeResult(vInCubicCentimeters, volumeUnit)) + ' ' + volumeUnitLabel;
	}
	output.val(result).set('result_' + calcType);
}

function massInGrams(mass, massUnit){
	switch(massUnit){
		case 0:
			return mass;
		case 1:
			return mass * 1000;
		case 2:
			return mass * 28.3495;
		case 3:
			return mass * 453.592;
		default:
			return false;
	}
}

function volumeInCubicCentimeters(volume, volumeUnit){
	switch(volumeUnit){
		case 0:
			return volume;
		case 1:
			return volume;
		case 2:
			return volume * 1000000;
		case 3:
			return volume * 1000;
		case 4:
			return volume * 28316.8;
		case 5:
			return volume * 16.3871;
		default:
			return false;
	}
}

function densityInGramsPerCubicCentimeter(density, densityUnit){
	switch(densityUnit){
		case 0:
			return density;
		case 1:
			return density / 1000;
		case 2:
			return density;
		case 3:
			return density * 1000;
		case 4:
			return density;
		case 5:
			return density * 27.6799;
		case 6:
			return density * 0.0160185;
		default:
			return false;
	}
}

function densityResult(density, densityUnit){
	switch(densityUnit){
		case 0:
			return density;
		case 1:
			return density * 1000;
		case 2:
			return density;
		case 3:
			return density * 1000;
		case 4:
			return density;
		case 5:
			return density * 0.0361273;
		case 6:
			return density * 62.4279606;
	}
}

function massResult(mass, massUnit){
	switch(massUnit){
		case 0:
			return mass;
		case 1:
			return mass / 1000;
		case 2:
			return mass * 0.035274;
		case 3:
			return mass * 0.00220462;
	}
}

function volumeResult(volume, volumeUnit){
	switch(volumeUnit){
		case 0:
			return volume;
		case 1:
			return volume;
		case 2:
			return volume / 1000000;
		case 3:
			return volume / 1000;
		case 4:
			return volume * 0.000035314667;
		case 5:
			return volume * 0.0610237;
	}
}

function numberWithCommas(n){
	const parts = n.toString().split(".");

	const numberPart = parts[0];
	const decimalPart = parts[1];
	const thousands = /\B(?=(\d{3})+(?!\d))/g;

	return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}
