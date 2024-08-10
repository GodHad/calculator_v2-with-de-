function calculate(){
	const balance = input.get('card_balance').gt(0).val();
	const interestRate = input.get('interest_rate').gt(0).val();
	const payment = input.get('your_payment').gt(0).val();
	if(!input.valid()) return;
	if(payment <= balance * (interestRate / 100 / 12)){
		let errorMessage = 'It is unlikely that you can payoff the balance with a monthly payment of $111.11. You will need to pay an amount higher than $122.22.';
		errorMessage = errorMessage.replace('$111.11', currencyFormat(currencyFormat(payment))).replace('$122.22', currencyFormat(currencyFormat(balance * (interestRate / 100 / 12))));
		return input.error('your_payment', errorMessage, true);
	}
	const result = calculateCreditCardPayoff(balance, interestRate / 100, payment);
	output.val(currencyFormat(payment)).set('payment-amount');
	output.val(currencyFormat(result.totalInterest)).set('total-interest');
	output.val(getYearsMonths(result.payoffTime)).set('payback-time');
	drawChart(result, result.payoffTime);
}
function calculate2(){
	const balance = input.get('card_balance_2').gt(0).val();
	const interestRate = input.get('interest_rate_2').gt(0).val();
	const years = input.get('payback_year').gt(0).val();
	const months = +input.get('payback_month').val();
	if(!input.valid()) return;

	const totalMonths = years * 12 + months;
	const result = calculateCreditCardPayoff2(balance, interestRate / 100, totalMonths);
	output.val(currencyFormat(result.payment)).set('payment-amount');
	output.val(currencyFormat(result.totalInterest)).set('total-interest');
	output.val(getYearsMonths(totalMonths)).set('payback-time');
	drawChart(result, totalMonths);
}

function drawChart(result, periods){
	const principalPercent = result.totalPrincipal / (result.totalPrincipal + result.totalInterest) * 100;
	const interestPercent = 100 - principalPercent;
	const donutData = [roundTo(interestPercent, 0), roundTo(principalPercent, 0)];
	const chartData = [[], [], []];
	result.payments.forEach(function(payment, index){
		let balance = payment.balance > 0 ? payment.balance : 0;
		chartData[0].push((index + 1) / 12);
		chartData[1].push(roundTo(balance, 2));
		chartData[2].push(roundTo(payment.interestPayment, 2));
	});
	let chartLegendHtml = '';
	for(let i = 0; i <= periods / 5; i++){
		if(i === 0) {
			chartLegendHtml += `<p class="result-text result-text--small">1 m</p>`;
		}
		else {
			chartLegendHtml += `<p class="result-text result-text--small">${i * 5} m</p>`;
		}
	}
	if(periods % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${periods} m</p>`;
	}
	_('chart__legend').innerHTML = chartLegendHtml;
	changeChartData(donutData, chartData);
}
function calculateCreditCardPayoff(balance, interestRate, monthlyPayment) {
	var payments = [];
	var totalInterest = 0;
	var totalPrincipal = 0;
	var payoffTime = 0;
	var interestPayment = 0;

	while (balance > 0 && payoffTime < 1000) {
		var interest = balance * (interestRate / 12);
		var principal = monthlyPayment - interest;
		balance -= principal;
		totalInterest += interest;
		totalPrincipal += principal;
		interestPayment += interest;
		payoffTime++;
		payments.push({
			principal: principal,
			interestPayment: interestPayment,
			interest: interest,
			balance: balance
		});

		if (balance < monthlyPayment) {
			monthlyPayment = balance + interest;
		}
	}

	return {
		payments: payments,
		totalInterest: totalInterest,
		totalPrincipal: totalPrincipal,
		payoffTime: payoffTime
	};
}

function calculateCreditCardPayoff2(balance, interestRate, payoffMonths) {
	var payments = [];
	var totalInterest = 0;
	var totalPrincipal = 0;
	var interestPayment = 0;
	var monthlyInterestRate = interestRate / 12;
	var payment = calculateFixedPayment(balance, interestRate, payoffMonths);

	for (var i = 0; i < payoffMonths; i++) {
		var interest = balance * monthlyInterestRate;
		var principal = payment - interest;
		balance -= principal;
		totalInterest += interest;
		totalPrincipal += principal;
		interestPayment += interest;

		payments.push({
			principal: principal,
			interestPayment: interestPayment,
			interest: interest,
			balance: balance
		});
	}

	return {
		payments: payments,
		totalInterest: totalInterest,
		payment: payment,
		totalPrincipal: totalPrincipal
	};
}

function calculateFixedPayment(balance, interestRate, payoffMonths) {
	var monthlyInterestRate = interestRate / 12;
	var monthlyPayment = balance * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -payoffMonths)));

	return monthlyPayment;
}

function getYearsMonths(months){
	let result = Math.floor(months / 12) + ' years';
	if(months % 12 > 0){
		result += ' ' + (months % 12) + ' months';
	}
	return result;
}

function currencyFormat(number){
	return number.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}
