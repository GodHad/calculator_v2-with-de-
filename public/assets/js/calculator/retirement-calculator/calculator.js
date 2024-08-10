function calculate(){
	const age = input.get('current_age').gt(0).val();
	const retAge = input.get('planned_retirement').gt('current_age').val();
	const lifeExp = input.get('life_expectancy').gt('planned_retirement').val();
	const income = input.get('current_income').gt(0).val();
	const socialSecurityIncome = +input.get('expected_social_security_income').val();
	const otherIncome = +input.get('other_income_after_retirement').val();
	const inflation = +input.get('inflation_rate').val();
	const interest = input.get('average_investment_return').gt('inflation_rate').val();
	const incomeNeeded = input.get('income_needed_after_retirement').gt(0).val();
	const incomeSavings = +input.get('current_income_savings').val();
	const futureSavings = +input.get('future_retirement_savings').val();
	if(!incomeSavings && !futureSavings){
		input.error('current_income_savings', 'Please enter your current retirement savings or future retirement savings');
	}
	if(!input.valid()) return;

	const years = retAge - age;
	const retirementYears = lifeExp - retAge;
	const deposit = income * futureSavings / 100;
	let totalSavings = calculateTotalSavings(incomeSavings, interest, deposit, years);
	const neededIncome = income * incomeNeeded / 100;
	const neededIncomeWithInflation = calculateFutureSumWithInflation(neededIncome, years, inflation);
	const neededSavings = calculateAmount(retirementYears * 12, interest - inflation, neededIncomeWithInflation / 12 - socialSecurityIncome - otherIncome);
	const rateReturnInflation = (interest - inflation) / 100;
	const payout = totalSavings * (rateReturnInflation + rateReturnInflation / (Math.pow(1 + rateReturnInflation, retirementYears) - 1))

	output.val('$553,407 at Age 65').replace('65', retAge).replace('$553,407', currencyFormat(totalSavings)).set('total-saving');
	output.val('Savings Needed at 65: $1,516,653').replace('65', retAge).replace('$1,516,653', currencyFormat(neededSavings)).set('needed-total');
	output.val('Equivalent Purchase Power Now: $624,841').replace('$624,841', currencyFormat(backwardFlatRateInflationCalculator(neededSavings, years, inflation))).set('total-without-inflation');
	output.val('Lifestyle after Retirement: $55,198').replace('$55,198', currencyFormat((payout) + (socialSecurityIncome + otherIncome) * 12)).set('lifestyle-after-retirement');

	output.val('MONTHLY INCOME After retirement (if saved $553,407):').replace('$553,407', currencyFormat(totalSavings)).set('monthly-income-savings');
	output.val('MONTHLY INCOME After retirement (if saved $1,516,653):').replace('$1,516,653', currencyFormat(neededSavings)).set('monthly-income-needed');

	output.val(currencyFormat(payout / 12 + socialSecurityIncome + otherIncome)).set('total-monthly');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(payout / 12 + socialSecurityIncome + otherIncome, years, inflation))).set('total-monthly-2');

	output.val(currencyFormat(payout / 12)).set('monthly-from-saving');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(payout / 12, years, inflation))).set('monthly-from-saving-2');

	output.val(currencyFormat(socialSecurityIncome)).set('monthly-from-social');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(socialSecurityIncome, years, inflation))).set('monthly-from-social-2');
	output.val(currencyFormat(otherIncome)).set('monthly-from-other');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(otherIncome, years, inflation))).set('monthly-from-other-2');

	output.val(currencyFormat(neededIncomeWithInflation / 12)).set('total-monthly-needed');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(neededIncomeWithInflation / 12, years, inflation))).set('total-monthly-needed-2');
	output.val(currencyFormat(neededIncomeWithInflation / 12 - socialSecurityIncome - otherIncome)).set('monthly-from-saving-needed');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(neededIncomeWithInflation / 12 - socialSecurityIncome - otherIncome, years, inflation))).set('monthly-from-saving-needed-2');

	output.val(currencyFormat(socialSecurityIncome)).set('monthly-from-social-needed');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(socialSecurityIncome, years, inflation))).set('monthly-from-social-needed-2');
	output.val(currencyFormat(otherIncome)).set('monthly-from-other-needed');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(otherIncome, years, inflation))).set('monthly-from-other-needed-2');

	const savingsPercentage = totalSavings / (neededSavings + totalSavings) * 100;
	changeChartData([roundTo(savingsPercentage / 2, 0), roundTo((100 - savingsPercentage) / 2, 0)], [currencyFormat(totalSavings), currencyFormat(neededSavings)]);
}

function backwardFlatRateInflationCalculator(futureValue, years, inflationRate){
	const rate = inflationRate / 100;

	return futureValue / Math.pow(1 + rate, years);
}

function calculateFutureSumWithInflation(presentValue, numberOfYears, inflationRate){
	const rate = inflationRate / 100;
	return presentValue * Math.pow(1 + rate, numberOfYears);
}

function currencyFormat(num, decimal = 0){
	return '$' + num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function calculateAmount(finMonths, finInterest, finPayment){
	var result = 0;

	if(finInterest == 0){
		result = finPayment * finMonths;
	}
	else {
		var i = ((finInterest / 100) / 12),
			i_to_m = Math.pow((i + 1), finMonths),
			a = finPayment / ((i * i_to_m) / (i_to_m - 1));
		result = Math.round(a * 100) / 100;
	}

	return result;
}

function calculateTotalSavings(principal, interest, deposit, periods){
	var balance = principal;
	for(let i = 0; i < periods; i++){
		let interestPayment = balance * interest / 100;
		balance += interestPayment;

		balance += deposit;
	}

	return balance;
}


function calculate2(){
	const age = input.get('current_age_2').gt(0).val();
	const retAge = input.get('planned_retirement_2').gt('current_age_2').val();
	const amount = input.get('amount_needed').gt(0).val();
	const yourSavings = +input.get('retirement_saving').optional().lt('amount_needed').val();
	const rate = input.get('average_Investment_return_2').gt(0).val();
	if(!input.valid()) return;
	const rateReturnsP = rate / 100;

	const workYears = retAge - age;
	const cc = 1 / 12;

	const ratePayB = Math.pow(1 + rateReturnsP, cc) - 1;
	const monthContribution = (amount - yourSavings * Math.pow(1 + ratePayB, workYears * 12)) / ((Math.pow(1 + ratePayB, workYears * 12) - 1) / ratePayB);
	const monthPrincipal = (monthContribution * workYears*12) + yourSavings;
	const monthInterest = amount - monthPrincipal;

	const yearContribution = (amount - yourSavings * Math.pow(1 + rateReturnsP, workYears)) / ((Math.pow(1 + rateReturnsP, workYears) - 1) / rateReturnsP);
	const yearsPrincipal = (yearContribution * workYears) + yourSavings;
	const yearsInterest = amount - yearsPrincipal;

	const loanAmount = amount - yourSavings * Math.pow(1 + rateReturnsP, workYears);
	const oneTimePay = loanAmount / Math.pow(1 + rateReturnsP, workYears)
	const onetimePrincipal = oneTimePay + yourSavings;
	const onetimeInterest = amount - onetimePrincipal;

	output.val('IF YOU SAVE EVERY MONTH UNTIL 65').replace('65', retAge).set('monthly-payment-2');
	output.val('IF YOU SAVE EVERY YEAR UNTIL 65').replace('65', retAge).set('yearly-payment-2');
	output.val(currencyFormat(monthContribution, 2)).set('save-every-month');
	output.val(currencyFormat(monthPrincipal, 2)).set('save-every-month-principal');
	output.val(currencyFormat(monthInterest, 2)).set('save-every-month-interest');

	output.val(currencyFormat(yearContribution, 2)).set('save-every-year');
	output.val(currencyFormat(yearsPrincipal, 2)).set('save-every-year-principal');
	output.val(currencyFormat(yearsInterest, 2)).set('save-every-year-interest');

	output.val(currencyFormat(oneTimePay, 2)).set('you-have');
	output.val(currencyFormat(onetimePrincipal, 2)).set('you-have-principal');
	output.val(currencyFormat(onetimeInterest, 2)).set('you-have-interest');
}


function calculate3(){
	const age = input.get('current_age_3').gt(0).val();
	const retAge = input.get('planned_retirement_3').gt('current_age_3').val();
	const lifeExp = input.get('life_expectancy_2').gt('planned_retirement_3').val();
	const annualContribution = +input.get('annual_contribution').val();
	const monthlyContribution = +input.get('monthly_contribution').val();
	const yourSavings = +input.get('retirement_saving_2').optional().val();
	const rate = input.get('average_Investment_return_3').gt(0).val();
	const inflation = +input.get('inflation_rate_2').val();
	if(!input.valid()) return;

	const rateReturnsP = rate / 100;
	const inflationRateP = inflation / 100;
	const workYears = retAge - age;
	const afterWorkYear = lifeExp - retAge;

	const cp  = monthlyContribution === 0 ? 1 : 12;
	const cc = 1 / cp;
	const ratePayB = Math.pow(1 + rateReturnsP, cc) - 1;
	const totalEndBalance = yourSavings * Math.pow(1 + ratePayB, workYears * cp) +(monthlyContribution * (Math.pow(1 + ratePayB, workYears * cp) - 1) ) / ratePayB + (annualContribution * (Math.pow(1 + rateReturnsP, workYears) - 1) ) / rateReturnsP;
	const totalEndBalanceInflation = backwardFlatRateInflationCalculator(totalEndBalance, workYears, inflation);

	const rateReturnsInflation = rateReturnsP - inflationRateP;
	const cc_month = 1 / 12
	const rateMonthInfl = Math.pow(1 + rateReturnsInflation, cc_month) - 1;
	const inflMonthIncome = totalEndBalance * (rateMonthInfl + rateMonthInfl / (Math.pow(1 + rateMonthInfl, afterWorkYear * 12) - 1));
	const todayInflMonthIncome = backwardFlatRateInflationCalculator(inflMonthIncome, workYears, inflation);

	const rateMonth = Math.pow(1 + rateReturnsP, cc_month) - 1;
	const fixedMonthIncome = totalEndBalance * (rateMonth + rateMonth / (Math.pow(1 + rateMonth, afterWorkYear*12) - 1));


	output.val('Balance at the retirement age of 65').replace('65', retAge).set('balance-retirement-title');
	output.val('At age 65, equivalent to current purchase power of').replace('65', retAge).set('withdraw-monthly-title-65');
	output.val('At age 85, equivalent to current purchase power of').replace('85', lifeExp).set('withdraw-monthly-title-85');
	output.val('The amount you can withdraw monthly at 65 and increase 3% annually').replace('65', retAge).replace('3%', inflation + '%').set('withdraw-monthly-title');
	output.val('The amount you can withdraw monthly from 65 to 85').replace('65', retAge).replace('85', lifeExp).set('withdraw-monthly-title-65-85');

	output.val(currencyFormat(totalEndBalance, 2)).set('balance-retirement');
	output.val(currencyFormat(totalEndBalanceInflation, 2)).set('today-balance-retirement');

	output.val(currencyFormat(inflMonthIncome, 2)).set('withdraw-monthly');
	output.val(currencyFormat(todayInflMonthIncome, 2)).set('today-withdraw-monthly');
	output.val(currencyFormat(fixedMonthIncome, 2)).set('withdraw-monthly-65-85');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(fixedMonthIncome, workYears, inflation), 2)).set('withdraw-monthly-65');
	output.val(currencyFormat(backwardFlatRateInflationCalculator(fixedMonthIncome, workYears + afterWorkYear, inflation), 2)).set('withdraw-monthly-85');
}


function calculate4(){
	const yourSavings = input.get('amount_have').gt(0).val();
	const withdraw = input.get('plan_withdraw').gt(0).val();
	const rate = input.get('average_Investment_return_4').gt(0).val();
	if(!input.valid()) return;
	const rateReturnsP = rate / 100;

	const cc = 1 / 12;
	const rateMonth = Math.pow(1 + rateReturnsP, cc) - 1;
	const r = rateMonth;
	const part = withdraw / (withdraw - yourSavings * r);
	let infinitePayment = 0;
	let resultText = '';
	if(part <= 0) {
		infinitePayment = yourSavings * r;
		resultText = 'Your monthly investment return is $2,921. So you can withdraw $5 per month infinitely.'.replace('$2,921', currencyFormat(infinitePayment)).replace('$5', currencyFormat(withdraw));
		_('result-table-4').classList.add('hidden');
	}
	else {
		const howLong = Math.log(part) / Math.log(1 + r);
		const howLongYears = Math.floor(howLong / 12);
		const howLongMonths = howLong - howLongYears * 12;
		const howLongtext = howLongYears > 0 ? howLongYears + ' years and ' + +howLongMonths.toFixed(1) + ' months' : +howLongMonths.toFixed(1) + ' months';
		resultText = 'If withdraw $5,000 per month, $600,000 can last 15 years and 0.7 months.'.replace('15 years and 0.7 months', howLongtext).replace('$5,000', currencyFormat(withdraw)).replace('$600,000', currencyFormat(yourSavings));

		let withdrawTable = {};
		let afterWorkYear = 0;
		let rows = 7;
		if(howLongYears < 10) {
			rows = 10;
		}
		for (let i = 0; i < rows; i++) {
			if(howLongYears < 10) {
				afterWorkYear = i + 1;
			}
			else if(20 > howLongYears < 10){
				afterWorkYear = (howLongYears - 10) + i * 5;
			}

			else if(howLongYears > 20){
				afterWorkYear = (howLongYears - 10) * i * 10;
			}

			withdrawTable[afterWorkYear] = yourSavings * (rateMonth + rateMonth / (Math.pow(1 + rateMonth, afterWorkYear * 12) - 1));
		}
		let tableResultHtml = '';
		Object.keys(withdrawTable).forEach((key) => {
			tableResultHtml += '<tr><th>' + key + ' years</th><td>' + currencyFormat(withdrawTable[key], 2) + '/month</td></tr>';
		});
		output.val(tableResultHtml).set('withdraw-table');
		_('result-table-4').classList.remove('hidden');
	}
	output.val(resultText).set('result-4');
}
