function calculate(){
	const amount = input.get('unpaid_principal').gt(0).val();
	const interest = input.get('interest_rate').gt(0).val();
	const payment = +input.get('payment').val();
	const years = input.get('loan_term_year').gt(0).val();
	const originalYears = +input.get('original_term_loan').gt(0).val();
	const months = +input.get('loan_term_month').val();
	if(!input.valid()) return;
	const totalRemainingMonths = years * 12 + months;
	const totalOriginalMonths = originalYears * 12;
	const monthlyPayment = calculatePayment(amount, totalOriginalMonths, interest);
	const payoffData = calculateEarlyPayoff(amount, interest, totalOriginalMonths, totalRemainingMonths, payment, monthlyPayment);
	const savingsMoney = payoffData.saving;
	const savingsMonths = payoffData.years * 12 + payoffData.months;
	const payoffTime = getYearsMonths(totalRemainingMonths - savingsMonths);
	let previousLoanTerm = totalOriginalMonths - totalRemainingMonths;
	if(previousLoanTerm < 1) previousLoanTerm = 1;
	const amortization = calculateAmortization(amount, totalOriginalMonths, interest);
	const payed = amortization[previousLoanTerm - 1];
	output.val('Payoff in ' + payoffTime).set('payoff-time');
	output.val('IF PAY EXTRA $500.00 PER MONTH').replace('$500.00', currencyFormat(payment)).set('payout-value');

	const totalPayments = monthlyPayment * totalOriginalMonths;
	output.val(currencyFormat(monthlyPayment)).set('monthly-payment');
	output.val(currencyFormat(monthlyPayment + payment)).set('monthly-payment-extra');
	output.val(currencyFormat(totalPayments)).set('total-payment');
	output.val(currencyFormat(totalPayments - savingsMoney)).set('total-payment-extra');
	output.val(currencyFormat(totalPayments - amount)).set('total-interest');
	output.val(currencyFormat((totalPayments - amount) - savingsMoney)).set('total-interest-extra');
	output.val(currencyFormat(monthlyPayment * totalRemainingMonths)).set('remaining-payments');
	output.val(currencyFormat(monthlyPayment * totalRemainingMonths - savingsMoney)).set('remaining-payments-extra');
	output.val(currencyFormat((monthlyPayment * totalRemainingMonths) - payed.principle)).set('remaining-interest');
	output.val(currencyFormat((monthlyPayment * totalRemainingMonths) - payed.principle - savingsMoney)).set('remaining-interest-extra');

	let chartLegendHtml = '';
	for(let i = 0; i <= (totalRemainingMonths / 12) / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if((totalRemainingMonths / 12) % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${(totalRemainingMonths / 12).toFixed(0)} yr</p>`;
	}
	_('chart__legend').innerHTML = chartLegendHtml;

	let annualResults = [];
	let annualInterest = 0;
	let annualPrincipal = 0;

	amortization.forEach((item, index) => {
		if(index < totalOriginalMonths - totalRemainingMonths) return;
		annualInterest += item.paymentToInterest;
		annualPrincipal += item.paymentToPrinciple;
		if((index + 1) % 12 === 0 || (index + 1) === amortization.length){
			annualResults.push({
				"interest": item.interest,
				"paymentToInterest": annualInterest,
				"paymentToPrinciple": annualPrincipal,
				"principle": item.principle,
			});
			annualInterest = 0;
			annualPrincipal = 0;
		}
	});
	const chartData = [[], [], [], []];
	let prevInterest = 0;
	let prevPrincipal = 0;
	annualResults.forEach((r, index) => {
		prevInterest = r.paymentToInterest + prevInterest;
		prevPrincipal = r.paymentToPrinciple + prevPrincipal;
		chartData[0].push((index + 1));
		chartData[1].push(+r.principle.toFixed(2));
		chartData[2].push(+prevInterest.toFixed(2));
		chartData[3].push(+prevPrincipal.toFixed(2));
	});
	changeChartData(chartData);
}

function getYearsMonths(months){
	let result = Math.floor(months / 12) + ' years';
	if(months % 12 > 0){
		result += ' and ' + (months % 12) + ' months';
	}
	return result;
}

function calculatePayment(finAmount, finMonths, finInterest){
	var result = 0;

	if(finInterest == 0){
		result = finAmount / finMonths;
	}
	else {
		var i = ((finInterest / 100) / 12),
			i_to_m = Math.pow((i + 1), finMonths),
			p = finAmount * ((i * i_to_m) / (i_to_m - 1));
		result = Math.round(p * 100) / 100;
	}

	return result;
}

function calculateEarlyPayoff(finAmount, finInterest, finMonths, finRemainingMonths, finExtraPay, finMonthlyPay){

	var principle1 = finAmount, interest1 = 0, principle2 = finAmount, interest2 = 0;
	var ep;
	var mRate = finInterest / 1200;
	var paidOff = finMonths;

	for(months = 1; months <= finMonths; months++){
		if(months > (finMonths - finRemainingMonths)){
			ep = finExtraPay;
		}
		else {
			ep = 0;
		}
		var mi1 = mRate * principle1;
		mi1 = Math.round(mi1 * 100) / 100;
		interest1 += mi1;
		principle1 -= (finMonthlyPay - mi1);

		if(principle2 > 0){
			var mi2 = mRate * principle2;
			mi2 = Math.round(mi2 * 100) / 100;
			interest2 += mi2;
			principle2 -= (finMonthlyPay - mi2 + ep);
			principle2 = Math.round(principle2 * 100) / 100;

			if(principle2 <= 0){
				principle2 = 0;
				paidOff = months;
			}
		}
	}

	var timeDifference = finMonths - paidOff;
	var y = parseInt(timeDifference / 12, 10);
	months = timeDifference % 12;

	return {
		saving: Math.round((interest1 - interest2) * 100) / 100,
		years: y,
		months: months
	};
}

function calculateAmortization(finAmount, finMonths, finInterest){
	var payment = calculatePayment(finAmount, finMonths, finInterest),
		balance = finAmount,
		interest = 0.0,
		totalInterest = 0.0,
		schedule = [],
		currInterest = null,
		currPrinciple = null;

	for(var i = 0; i < finMonths; i++){
		currInterest = balance * finInterest / 1200;
		totalInterest += currInterest;
		currPrinciple = payment - currInterest;
		balance -= currPrinciple;

		schedule.push({
			principle: balance,
			interest: totalInterest,
			payment: payment,
			paymentToPrinciple: currPrinciple,
			paymentToInterest: currInterest,
		});
	}

	return schedule;
}


function calculateExtraAmortization(finAmount, finMonths, finInterest, extraPayment, remainingMonths){
	var payment = calculatePayment(finAmount, finMonths, finInterest),
		balance = finAmount,
		interest = 0.0,
		totalInterest = 0.0,
		schedule = [],
		currInterest = null,
		currPrinciple = null;

	var paymentWithExtra = payment + extraPayment;
	for(var i = 0; i < finMonths; i++){
		currInterest = balance * finInterest / 1200;
		totalInterest += currInterest;
		if(i >= (finMonths - remainingMonths)){
			payment = paymentWithExtra;
		}
		currPrinciple = payment - currInterest;
		balance -= currPrinciple;

		schedule.push({
			principle: balance,
			interest: totalInterest,
			payment: payment,
			paymentToPrinciple: currPrinciple,
			paymentToInterest: currInterest,
		});
	}

	return schedule;
}

function currencyFormat(price){
	return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
