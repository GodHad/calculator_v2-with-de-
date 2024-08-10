function calculate(){
	const amount = input.get('loan_amount').gt(0).val();
	let interest = input.get('interest_rate').gt(0).val();
	const years = +input.get('loan_term_year').val();
	const months = +input.get('loan_term_month').val();
	const loanedFees = +input.get('loaned_fees').optional().lt('loan_amount').val();
	const upfrontFees = +input.get('upfront_fees').optional().lt('loan_amount').val();
	const loanTerm = years + months / 12;
	const compound = input.get('compound').index().val();
	const payBack = input.get('pay_back').index().val();
	const payBackText = input.get('pay_back').raw();
	if(!loanTerm) {
		input.error('loan_term_year', 'Please enter loan term');
	}
	if(!input.valid()) return;
	interest = interest / 100;
	let compoundPayments = 12;
	let payBackPayments = 12;
	switch(compound) {
		case 0:
			compoundPayments = 12;
			break;
		case 1:
			compoundPayments = 2;
			break;
		case 2:
			compoundPayments = 4;
			break;
		case 3:
			compoundPayments = 24;
			break;
		case 4:
			compoundPayments = 26;
			break;
		case 5:
			compoundPayments = 52;
			break;
		case 6:
			compoundPayments = 365;
			break;
		case 7:
			compoundPayments = 1;
			break;
		case 8:
			compoundPayments = 0;
			break;
	}

	switch(payBack) {
		case 0:
			payBackPayments = 365;
			break;
		case 1:
			payBackPayments = 52;
			break;
		case 2:
			payBackPayments = 26;
			break;
		case 3:
			payBackPayments = 24;
			break;
		case 4:
			payBackPayments = 12;
			break;
		case 5:
			payBackPayments = 4;
			break;
		case 6:
			payBackPayments = 2;
			break;
		case 7:
			payBackPayments = 1;
			break;
	}
	const cc = compoundPayments / payBackPayments
	const i = interest / compoundPayments
	let ratePayB = Math.pow(1 + i, cc) - 1;
	if(compoundPayments === 0) {
		ratePayB = Math.pow(Math.E, interest / payBackPayments) - 1
	}

	var paybackN = payBackPayments * loanTerm;
	var loanAmount = amount + loanedFees;
	const paybackPeriodPayment = loanAmount * (ratePayB + ratePayB / (Math.pow(1 + ratePayB, paybackN) - 1));
	var resultTable = [];
	var totalInterestPayment = 0;
	var totalPrincipalPayment = 0;
	while(paybackN > 0) {
		let periodPayment = loanAmount * (ratePayB + ratePayB / (Math.pow(1 + ratePayB, paybackN) - 1));
		let interestPayment = loanAmount * ratePayB;
		let principalPayment = periodPayment - interestPayment;
		let beginningBalance = loanAmount;
		paybackN--;
		loanAmount -= principalPayment;
		totalInterestPayment += interestPayment;
		totalPrincipalPayment += principalPayment;
		resultTable.push({
			beginningBalance,
			interestPayment,
			principalPayment,
			endBalance: loanAmount,
			totalInterestPayment,
			totalPrincipalPayment,
		})
	}
	let annualResultsHtml = '';
	resultTable.forEach((item, index) => {
		annualResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(item.beginningBalance)}</td>
			<td>${currencyFormat(item.interestPayment)}</td>
			<td>${currencyFormat(item.principalPayment)}</td>
			<td>${currencyFormat(item.endBalance)}</td>
	</tr>`;
	});
	const totalInterest = resultTable.reduce((acc, item) => acc + item.interestPayment, 0);
	const totalPrincipal = resultTable.reduce((acc, item) => acc + item.principalPayment, 0);

	const totalPayment = totalPrincipal + totalInterest + upfrontFees + loanedFees;
	const interestPercent = +(totalInterest / totalPayment * 100).toFixed(0);
	const principalPercent = +(totalPrincipal / totalPayment * 100).toFixed(0);
	const upfrontFeesPercent = +((upfrontFees + loanedFees) / totalPayment * 100).toFixed(0);
	const donutData = [interestPercent, principalPercent, upfrontFeesPercent];
	const realRate = calculateInterest(amount - upfrontFees, loanTerm * payBackPayments, paybackPeriodPayment, payBackPayments);

	changeChartData(donutData);
	output.val(annualResultsHtml).set('annual-results');
	output.val(currencyFormat(amount + loanedFees)).set('amount-financed');
	output.val(currencyFormat(upfrontFees)).set('upfront-out-of-pocket');
	output.val('Payment ' + payBackText).set('payment-period');
	output.val(currencyFormat(paybackPeriodPayment)).set('payment-every-period');
	output.val(currencyFormat(totalInterest)).set('total-interest');
	output.val('Total of {120} Payments').replace('{120}', payBackPayments * loanTerm).set('total-payments-count');
	output.val(currencyFormat(totalPrincipal + totalInterest)).set('total-payments');
	output.val(currencyFormat(totalPayment)).set('total-payments-with-fees');
	output.val(roundTo(realRate, 3) + '%').set('real-apr');
}

function currencyFormat(num) {
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function calculateInterest(finAmount, finMonths, finPayment, periods = 12){
	var result = 0;

	var min_rate = 0, max_rate = 100;
	while(min_rate < max_rate-0.0001){
		var mid_rate = (min_rate + max_rate)/2,
			j = mid_rate / (periods * 100),
			guessed_pmt = finAmount * ( j / (1-Math.pow(1+j, finMonths*-1)));

		if(guessed_pmt > finPayment){
			max_rate = mid_rate;
		}
		else{
			min_rate = mid_rate;
		}
	}
	return mid_rate;
}
function calculateMortgageAPR(){
	const amount = input.get('house_value').gt(0).val();
	const downPayment = +input.get('down_payment').val();
	const interest = input.get('interest_rate_2').gt(0).val();
	const loanTerm = input.get('loan_term_year_2').gt(0).val();
	const loanFees = +input.get('loan_fees').val();
	const points = +input.get('points').lt(40).val();
	let pmiInsurance = +input.get('pmi_insurance').val();
	if(!input.valid()) return;

	const downPaymentAmount = amount * downPayment / 100;
	const loanAmount = amount - downPaymentAmount;
	const pointsAmount = loanAmount * points / 100;
	pmiInsurance = downPayment >= 20 ? 0 : pmiInsurance;
	const monthlyPmi = pmiInsurance / 12;

	const monthlyPayment = calculatePayment(loanAmount, loanTerm * 12, interest);
	const amortization = calculateAmortization(loanAmount, loanTerm * 12, interest);
	const totalInterest = amortization.reduce((acc, item) => acc + item.paymentToInterest, 0);
	const totalLoanPayment = amortization.reduce((acc, item) => acc + item.paymentToInterest + item.paymentToPrinciple, 0);
	let shouldSkip = false;
	let pmiPaymentsCount = 0;
	amortization.forEach((item, index) => {
		if(!shouldSkip && item.principle <= loanAmount * (0.8 + downPayment / 100)){
			pmiPaymentsCount = index;
			shouldSkip = true;
		}
	})
	const pmiPaymentsTotal = pmiPaymentsCount * monthlyPmi;
	const totalPayment = totalLoanPayment + loanFees + pmiPaymentsTotal;
	const realRate = calculateInterest(loanAmount - loanFees - pointsAmount - pmiPaymentsTotal, loanTerm * 12, monthlyPayment);
	output.val(realRate.toFixed(3) + '%').set('real-apr-2');
	output.val(currencyFormat(loanAmount)).set('amount-result-2');
	output.val(currencyFormat(downPaymentAmount)).set('down-payment-result-2');
	output.val(currencyFormat(monthlyPayment)).set('monthly-pay-result-2');
	output.val('Total of 120 Payments').replace('120', loanTerm * 12).set('total-payments-count-2');
	output.val(currencyFormat(totalLoanPayment)).set('total-payments-2');
	output.val(currencyFormat(totalInterest)).set('total-interest-2');
	output.val('PMI Insurance (0 months)').replace('0', pmiPaymentsCount).set('pmi-payments-count-2');
	output.val(currencyFormat(monthlyPmi) + '/month').set('pmi-payment-result-2');
	output.val(currencyFormat(pmiPaymentsTotal)).set('pmi-total-result-2');
	output.val(currencyFormat(totalPayment)).set('all-payments-total-2');

	const interestPercent = totalInterest / totalPayment * 100;
	const principalPercent = loanAmount / totalPayment * 100;
	const feePercent = (loanFees + pmiPaymentsTotal) / totalPayment * 100;
	const donutData = [interestPercent.toFixed(0), principalPercent.toFixed(0), feePercent.toFixed(0)];
	changeChartData(donutData)
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
