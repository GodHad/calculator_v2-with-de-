function calculate() {
	const find = input.get('find').raw();
	const principalP = input.get('principal_p').gt(0).val();
	const rateR = input.get('rate_r').gt(0).val();
	const timeT = input.get('time_t').gt(0).val();
	const compoundN = input.get('compound_n').index().val();

	const totalA = input.get('total_a').gt(0).val();
	const rateR2 = input.get('rate_r_2').gt(0).val();
	const timeT2 = input.get('time_t_2').gt(0).val();
	const compoundC = input.get('compound_c').index().val();

	const totalI = input.get('total_i').gt(0).val();
	const rateR3 = input.get('rate_r_3').gt(0).val();
	const timeT3 = input.get('time_t_3').gt(0).val();
	const compoundC2 = input.get('compound_c_2').index().val();

	const totalA2 = input.get('total_a_2').gt(0).val();
	const principalP2 = input.get('principal_p_2').gt(0).lt('total_a_2').val();
	const timeT4 = input.get('time_t_4').gt(0).val();
	const compoundC3 = input.get('compound_c_3').index().val();

	const totalA3 = input.get('total_a_3').gt(0).val();
	const principalP3 = input.get('principal_p_3').gt(0).lt('total_a_3').val();
	const rateR4 = input.get('rate_r_4').gt(0).val();
	const compoundC4 = input.get('compound_c_4').index().val();

	if(!input.valid()) return;

	let result = '';
	let rate = 0;
	let timePeriod = 0;
	if(find === 'a'){
		rate = rateR / 100;
		timePeriod = getCompound(compoundN);
		if(timePeriod === 'continuously'){
			result = 'A = ' + currencyFormat(principalP * Math.pow(Math.exp(1), rate * timeT));
		}
		else {
			result = 'A = ' + currencyFormat(principalP * Math.pow((1 + (rate/timePeriod)), timePeriod * timeT));
		}
	}
	else if(find === 'pa'){
		rate = rateR2 / 100;
		timePeriod = getCompound(compoundC);
		if( timePeriod=== 'continuously'){
			result = 'P = ' + currencyFormat(totalA / Math.pow(Math.exp(1), rate * timeT2));
		}
		else {
			result = 'P = ' + currencyFormat(totalA / Math.pow((1 + rate / timePeriod), timePeriod * timeT2));
		}
	}
	else if(find === 'pi'){
		timePeriod = getCompound(compoundC2);
		rate = rateR3 / 100;
		if(timePeriod === 'continuously'){
			result = 'P = ' + currencyFormat(totalI / (Math.pow(Math.exp(1), rate * timeT3) - 1));
		}
		else {
			result = 'P = ' + currencyFormat(totalI / (Math.pow((1 + rate / timePeriod), timePeriod * timeT3) - 1));
		}
	}
	else if(find === 'r'){
		timePeriod = getCompound(compoundC3);
		if(timePeriod === 'continuously'){
			result = 'R = ' + Number((Math.log(totalA2 / principalP2) / timeT4 * 100).toFixed(3)) + ' %/year';
		}
		else {
			result = 'R = ' + Number((timePeriod * Math.abs(Math.pow((totalA2 / principalP2), 1 / (timePeriod * timeT4)) - 1) * 100).toFixed(3)) + ' %/year';
		}
	}
	else if(find === 't'){
		rate = rateR4 / 100;
		timePeriod = getCompound(compoundC4);
		if(timePeriod === 'continuously'){
			result = 't = ' + Number((Math.log(totalA3/principalP3) / rate).toFixed(3)) + ' years';
		}
		else {
			result = 't = ' + Number((Math.log(totalA3/principalP3) / (timePeriod * Math.abs(Math.log(1 + rate/timePeriod)))).toFixed(3)) + ' years';
		}
	}
	_('result-' + find).innerHTML = result;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function currencyFormat(price){
	return '$' + numberWithCommas(Number(price).toFixed(2));
}

function getCompound(timePeriod) {
	let time;
	switch(timePeriod){
		case 0:
			time = 'continuously';
			break;
		case 1:
			time = 365;
			break;
		case 2:
			time = 360;
			break;
		case 3:
			time = 52;
			break;
		case 4:
			time = 26;
			break;
		case 5:
			time = 24;
			break;
		case 6:
			time = 12;
			break;
		case 7:
			time = 6;
			break;
		case 8:
			time = 4;
			break;
		case 9:
			time = 2;
			break;
		case 10:
			time = 1;
			break;
	}
	return time;
}
