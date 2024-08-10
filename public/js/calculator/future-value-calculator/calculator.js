function calculate(){
	const principal = input.get('present_value').gt(0).val();
	const interest = input.get('interest_rate').gt(0).val();
	const periods = input.get('periods').gt(0).val();
	const deposit = +input.get('periodic_deposit').val();
	const paymentType = input.get('periodic_payment').raw();
	if(!input.valid()) return;
	const amortization = calculateAmortization(principal, interest, deposit, periods, paymentType);
	let monthlyResultsHtml = '';
	amortization.forEach((item, index) => {
		monthlyResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(item.beginBalance)}</td>
			<td>${currencyFormat(item.deposit)}</td>
			<td>${currencyFormat(item.interestPayment)}</td>
			<td>${currencyFormat(item.endBalance)}</td>
		</tr>`;
	});
	const totalInterest = amortization.reduce((acc, item) => acc + item.interestPayment, 0);
	const totalDeposit = amortization.reduce((acc, item) => acc + item.deposit, 0);
	const totalBalance = amortization[amortization.length - 1].endBalance;
	const interestPercent = totalInterest / totalBalance * 100;
	const depositPercent = totalDeposit / totalBalance * 100;
	const startPrincipalPercent = principal / totalBalance * 100;
	changeChartData([roundTo(startPrincipalPercent, 0), roundTo(depositPercent, 0), roundTo(interestPercent, 0)]);
	const pv = calculatePresentValue(totalBalance, interest / 100, periods);
	output.val('Future Value: $39,869.90').replace('$39,869.90', currencyFormat(totalBalance)).set('fv');
	output.val('PV (Present Value): $12,431.62').replace('$12,431.62', currencyFormat(pv)).set('pv');
	output.val('N (Number of Periods): 20').replace('20', periods).set('periods-result');
	output.val('I/Y (Interest Rate): 6').replace('6', interest).set('interest-result');
	output.val('PMT (Periodic Deposit): $200.00').replace('$200.00', currencyFormat(deposit)).set('deposit-result');
	output.val('Starting Amount: $10,000.00').replace('$10,000.00', currencyFormat(principal)).set('start-amount-result');
	output.val('Total Periodic Deposits: $4,000.00').replace('$4,000.00', currencyFormat(totalDeposit)).set('total-deposit');
	output.val('Total Interest: $25,869.90').replace('$25,869.90', currencyFormat(totalInterest)).set('total-interest');
	output.val(monthlyResultsHtml).set('monthly-result');
}


function currencyFormat(num){
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}


function calculateAmortization(principal, interest, deposit, periods, paymentType){
	let balance = principal;
	let result = [];
	for(let i = 0; i < periods; i++){
		if(paymentType === 'beginning'){
			balance += deposit;
		}

		let interestPayment = balance * interest / 100;
		let beginBalance = balance;
		balance += interestPayment;

		if(paymentType === 'end'){
			balance += deposit;
		}
		let endBalance = balance;
		result.push({
			beginBalance,
			deposit,
			interestPayment,
			endBalance
		})
	}

	return result;
}

function calculatePresentValue(futureValue, discountRate, numberOfPeriods) {
	return futureValue / Math.pow(1 + discountRate, numberOfPeriods);
}
