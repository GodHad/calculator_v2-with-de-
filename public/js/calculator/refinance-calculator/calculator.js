function calculate(){
	const amount = input.get('amount').gt(0).val();
	const loanTerm = input.get('loan_term').gt(0).val();
	const interest = input.get('interest_rate').gt(0).val();
	const remainingYears = input.get('time_remaining_years').gt(0).val();
	const remainingMonths = +input.get('time_remaining_months').val();
	const newYears = input.get('new_loan_term_years').gt(0).val();
	const newMonths = +input.get('new_loan_term_months').val();
	const newInterest = +input.get('interest_rate_2').gt(0).val();
	const points = +input.get('points').val();
	const cashOut = +input.get('cash_out').val();
	const costs = +input.get('costs').val();

	if(!input.valid()) return;

	const originalMonths = loanTerm * 12;
	const remainingMonthsTotal = remainingYears * 12 + remainingMonths;
	const newMonthsTotal = newYears * 12 + newMonths;

	const amortization = calculateAmortization(amount, originalMonths, interest);
	const principalIndex = originalMonths - remainingMonthsTotal > 1 ? originalMonths - remainingMonthsTotal - 1 : 0;
	const remainingAmount = amortization[principalIndex].principle;
	const pointsCost = (remainingAmount + cashOut) * points / 100;
	const newLoanAmount = remainingAmount + cashOut - pointsCost;
	const originalPayment = calculatePayment(amount, originalMonths, interest);
	const newLoanPayment = calculatePayment(newLoanAmount, newMonthsTotal, newInterest);
	output.val('$278.00/month').replace('$278.00', currencyFormat(originalPayment - newLoanPayment)).set('saving-month');
	output.val(currencyFormat(originalPayment * remainingMonthsTotal - newLoanPayment * newMonthsTotal)).set('lifetime-saving');
	output.val(currencyFormat(pointsCost + costs)).set('upfront-cost');
	output.val(currencyFormat(remainingAmount)).set('original-remaining-amount');
	output.val(currencyFormat(remainingAmount + cashOut - pointsCost)).set('new-remaining-amount');
	output.val(currencyFormat((remainingAmount + cashOut - pointsCost) - remainingAmount)).set('amount-diff');
	output.val('300 months').replace('300', remainingMonthsTotal).set('remaining-months');
	output.val('300 months').replace('300', newMonthsTotal).set('new-loan-months');
	output.val('0 months').replace('0', newMonthsTotal - remainingMonthsTotal).set('months-diff');
	output.val(interest + '%').set('original-interest');
	output.val(newInterest + '%').set('new-interest');
	output.val((interest - newInterest) + '%').set('interest-diff');
	output.val(currencyFormat(originalPayment)).set('origin-monthly-payment');
	output.val(currencyFormat(newLoanPayment)).set('new-monthly-payment');
	output.val(currencyFormat(newLoanPayment - originalPayment)).set('monthly-payment-diff');
	output.val(currencyFormat(originalPayment * remainingMonthsTotal)).set('total-payment');
	output.val(currencyFormat(newLoanPayment * newMonthsTotal)).set('new-total-payment');
	output.val(currencyFormat(newLoanPayment * newMonthsTotal - originalPayment * remainingMonthsTotal)).set('total-payment-diff');
	output.val(currencyFormat(originalPayment * remainingMonthsTotal - remainingAmount)).set('total-interest');
	output.val(currencyFormat(newLoanPayment * newMonthsTotal - newLoanAmount)).set('new-total-interest');
	output.val(currencyFormat((newLoanPayment * newMonthsTotal - newLoanAmount) - (originalPayment * remainingMonthsTotal - remainingAmount))).set('total-interest-diff');

	const pointsVal = points ? currencyFormat(pointsCost) : 'NA';
	output.val(pointsVal).set('points-cost');
	output.val(currencyFormat(pointsCost + costs)).set('points-with-cost');
	if(cashOut) {
		output.val(currencyFormat(cashOut)).set('cash-out-val');
		output.val(currencyFormat(cashOut - (pointsCost + costs))).set('take-home-amount-val');
		_('cash-out-info').classList.remove('hidden');
		_('take-home-amount-info').classList.remove('hidden');
		_('time-recovery').classList.add('hidden');
	}
	else {
		let recoveryTime = +((pointsCost + costs) / (originalPayment - newLoanPayment)).toFixed(2);
		if(recoveryTime){
			output.val('23.68 months').replace('23.68', recoveryTime).set('recovery-time-val');
		}
		else {
			output.val('NA').set('recovery-time-val');
		}
		_('cash-out-info').classList.add('hidden');
		_('take-home-amount-info').classList.add('hidden');
		_('time-recovery').classList.remove('hidden');
	}
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

function currencyFormat(price){
	return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
