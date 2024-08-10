function calculate(){
	const investment = input.get('investment').gt(0).val();
	const years = input.get('number_of_years').gt(0).val();
	const interest = input.get('interest_rate').gt(0).val() / 100;
	const contributions = +input.get('contributions').val();
	const compound = input.get('compound').index().val();
	const frequency = input.get('frequency').index().val();
	if(!input.valid()) return;
	const compoundPeriods = getCompound(compound);
	const frequencyPeriods = getCompound(frequency);
	const futureValue = get_futerevalue_with_contrib(investment, years, interest, compoundPeriods, contributions, frequencyPeriods);
	output.val(currencyFormat(futureValue)).set('result_a');
}

function calculate2(){
	const calcType = input.get('type').index().val();
	const fv1 = input.get('future_account_value').gt(0).val();
	const years1 = input.get('number_of_years_2').gt(0).val();
	const interest1 = +input.get('interest_rate_2').gt(0).val() / 100;
	const compound1 = input.get('compound_2').index().val();
	const contributions1 = +input.get('contributions_2').val();
	const frequency1 = input.get('frequency_2').index().val();

	const fv2 = input.get('future_account_value_2').gt(0).val();
	const amount2 = input.get('investment_amount').gt(0).lt('future_account_value_2').val();
	const years2 = input.get('number_of_years_3').gt(0).val();
	const compound2 = input.get('compound_3').index().val();
	const contributions2 = +input.get('contributions_3').val();
	const frequency2 = input.get('frequency_3').index().val();

	const fv3 = input.get('future_account_value_3').gt(0).val();
	const amount3 = input.get('investment_amount_2').gt(0).val();
	const interest3 = +input.get('interest_rate_3').gt(0).val() / 100;
	const years3 = input.get('number_of_years_4').gt(0).val();
	const compound3 = input.get('compound_4').index().val();
	const frequency3 = input.get('frequency_4').index().val();
	if(!input.valid()) return;
	let result;
	if(calcType === 0) {
		result = get_primalvalue_with_contrib(fv1, years1, interest1, getCompound(compound1), contributions1, getCompound(frequency1));
		output.val(currencyFormat(result)).set('result_b');
	}
	else if(calcType === 1) {
		let totalContribution = contributions2 * years2 * getCompound(frequency2);
		let totalInvested = amount2 + totalContribution;
		if(totalInvested > fv2) {
			return input.error(['investment_amount', 'contributions_3'], 'Total invested cannot be greater than future value', true);
		}
		else {
			var roi = 100 - (totalInvested * 100 / fv2);
			const compoundPeriods = getCompound(compound2);
			const frequencyPeriods = getCompound(frequency2);
			var rate = 0;
			var increment = 1;
			while (!rate) {
				let futureValue = get_futerevalue_with_contrib(amount2, years2, roi / 100, compoundPeriods, contributions2, frequencyPeriods);
				if((futureValue / fv2) < 0.999) {
					roi += 1;
					increment = 0.001;
				}
				else if((futureValue / fv2) >= 0.999 && (futureValue / fv2) <= 1) {
					rate = roi;
				}
				else {
					roi -= increment;
				}
			}
			output.val(+roi.toFixed(2)+'%').set('result_c');
		}
	}
	else if(calcType === 2) {
		result = get_contribution(getCompound(compound3), getCompound(frequency3), fv3, amount3, interest3, years3);
		output.val(currencyFormat(result)).set('result_d');
	}
}

function getCompound(compound){
	switch(compound){
		case 0:
			return 12;
		case 1:
			return 2;
		case 2:
			return 4;
		case 3:
			return 24;
		case 4:
			return 26;
		case 5:
			return 52;
		case 6:
			return 365;
	}
}


function get_annuitetrate(compound_periods_per_year, pay_back_per_year, interest_rate_year) {
	const cp = compound_periods_per_year == pay_back_per_year ? 1 : compound_periods_per_year / pay_back_per_year;
	const ic = compound_periods_per_year == 1 ? interest_rate_year : interest_rate_year / compound_periods_per_year;
	return Math.pow(1 + ic, cp) - 1;
}

function get_futerevalue_with_contrib(amount, years, rateP_year, compound_per_year, contribution, contribution_per_year){
	const rate_an = get_annuitetrate(compound_per_year, contribution_per_year, rateP_year);
	return amount*Math.pow(1+rate_an, years*contribution_per_year) + (contribution * (Math.pow(1+rate_an, years*contribution_per_year) - 1)) / rate_an;
}

function get_primalvalue_with_contrib(future_value, years, rateP_year, compound_per_year, contribution, contribution_per_year){
	const rate_an = get_annuitetrate(compound_per_year, contribution_per_year, rateP_year);
	return (future_value - ((contribution * (Math.pow(1+rate_an, years*contribution_per_year) - 1)) / rate_an)) / Math.pow(1+rate_an, years*contribution_per_year);
}

function get_contribution(compound_periods_per_year, contribution_per_year, needed_amount, existing_savings, interest_rate_year, years) {
	const rateP = get_annuitetrate(compound_periods_per_year, contribution_per_year, interest_rate_year);
	return (needed_amount - existing_savings * Math.pow(1 + rateP, years * contribution_per_year)) / (
		(Math.pow(1 + rateP, years * contribution_per_year) - 1) / rateP);
}

function currencyFormat(num) {
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
