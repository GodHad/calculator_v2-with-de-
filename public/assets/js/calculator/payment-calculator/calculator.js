function calculate(){
	const amount = input.get('loan_amount').gt(0).val();
	const months = input.get('loan_term_month').val();
	const years = input.get('loan_term_year').gt(0).val();
	const interest = input.get('interest_rate').gt(0).val();
	if(!input.valid()) return;

	const termLoan = years * 12 + months;
	const monthlyPayment = getPayment(amount, termLoan, interest);
	const yearsToPay = Math.floor(termLoan / 12);
	const monthsToPay = termLoan % 12;
	let period = yearsToPay + ' years';
	if(monthsToPay > 0){
		period += ', ' + monthsToPay + ' months';
	}
	const totalPayment = monthlyPayment * termLoan;
	const totalInterest = totalPayment - amount;
	output.val('Monthly Payment: $1,186.19'.replace('$1,186.19', currencyFormat(monthlyPayment))).set('monthly-payment');
	output.val('You will need to pay $1,186.19 every month for 15 years to payoff the debt').replace('$1,186.19', currencyFormat(monthlyPayment)).replace('15 years', period).set('payments');
	output.val('Time Required to Clear Debt: 15 years').replace('15 years', period).set('period');
	output.val('Total of 180 Payments: $213,514.20').replace('180', termLoan).replace('$213,514.20', currencyFormat(totalPayment)).set('total');
	output.val('Total Interest: $63,514.20').replace('$63,514.20', currencyFormat(totalInterest)).set('total-interest');

	let chartLegendHtml = '';
	for(let i = 0; i <= termLoan / 12 / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if((termLoan / 12) % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${Math.ceil(termLoan / 12)} yr</p>`;
	}
	_('chart__legend').innerHTML = chartLegendHtml;

	const schedule = calculateAmortization(amount, termLoan, interest);
	let monthlyResultsHtml = '';
	let annualResults = [];
	let annualInterest = 0;
	let annualPrincipal = 0;
	schedule.forEach((item, index) => {
		let principle = item.principle < 1 ? 0 : item.principle;
		monthlyResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(principle + item.paymentToPrinciple)}</td>
			<td>${currencyFormat(item.paymentToInterest)}</td>
			<td>${currencyFormat(item.paymentToPrinciple)}</td>
			<td>${currencyFormat(principle)}</td>
		</tr>`;
		if((index + 1) % 12 === 0 || (index + 1) === schedule.length) {
			let title = 'Year #{1} End'.replace('{1}', Math.ceil((index + 1) / 12).toString());
			monthlyResultsHtml += `<th class="indigo text-center" colspan="5">${title}</th>`;
		}

		annualInterest += item.paymentToInterest;
		annualPrincipal += item.paymentToPrinciple;
		if((index + 1) % 12 === 0 || (index + 1) === schedule.length){
			annualResults.push({
				"paymentToInterest": annualInterest,
				"paymentToPrinciple": annualPrincipal,
				"principle": principle,
				"interest": item.interest,
			});
			annualInterest = 0;
			annualPrincipal = 0;
		}
	});

	const principalPercent = +((totalPayment - amount) / totalPayment* 100).toFixed(0);
	const interestPercent = +(amount / totalPayment * 100).toFixed(0);
	const donutData = [interestPercent, principalPercent];
	const chartData = [[], [], [], []];
	let prevPrincipal = 0;
	let prevInterest = 0;
	let annualResultsHtml = '';
	annualResults.forEach((item, index) => {
		let principle = item.principle < 1 ? 0 : item.principle;
		annualResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(principle + item.paymentToPrinciple)}</td>
			<td>${currencyFormat(item.paymentToInterest)}</td>
			<td>${currencyFormat(item.paymentToPrinciple)}</td>
			<td>${currencyFormat(principle)}</td>
	</tr>`;

		prevPrincipal = item.paymentToPrinciple + prevPrincipal;
		prevInterest = item.paymentToInterest + prevInterest;
		if((index + 1) === annualResults.length) {
			prevPrincipal = amount;
		}
		chartData[0].push((index + 1));
		chartData[1].push(item.principle.toFixed(0));
		chartData[2].push(prevInterest.toFixed(0));
		chartData[3].push(prevPrincipal.toFixed(0));
	});
	changeChartData(donutData, chartData);

	output.val(monthlyResultsHtml).set('monthlyResult');
	output.val(annualResultsHtml).set('annualResult');
}

function getPayment(finAmount, finMonths, finInterest){
	var result = 0;

	if(finInterest == 0){
		result = finAmount / finMonths;
	}
	else{
		var i = ((finInterest/100) / 12),
			i_to_m = Math.pow((i + 1), finMonths),
			p = finAmount * ((i * i_to_m) / (i_to_m - 1));
		result = Math.round(p * 100) / 100;
	}

	return result;
}


function calculateAmortization(finAmount, finMonths, finInterest){
	var payment = getPayment(finAmount, finMonths, finInterest),
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
		if(balance < 0 ) {
			balance = 0;
		}
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

function calculateFixed(){
	const amount = input.get('loan_amount_2').gt(0).val();
	const payment = input.get('monthly_pay').gt(0).val();
	const interest = input.get('interest_rate_2').gt(0).val();
	if(!input.valid()) return;

	const period = calculateMonths(amount, interest, payment);

	const yearsToPay = Math.floor(period / 12);
	const monthsToPay = period % 12;
	let payoff = yearsToPay + ' years';
	if(monthsToPay > 0){
		payoff += ', ' + monthsToPay.toFixed(0) + ' months';
	}
	output.val(payoff).set('payoff');
	output.val(currencyFormat(payment)).set('monthly-payment-2');
	output.val(currencyFormat(payment * period)).set('total-payment-2');
	output.val(currencyFormat(payment * period - amount)).set('total-interest-2');
}

function calculateMonths(finAmount, finInterest, finPayment){
	var result = 0;

	if(finInterest == 0){
		result = finAmount / finPayment;
	}
	else{
		result = ( (-1/12) * (Math.log(1-(finAmount/finPayment)*((finInterest/100)/12))) / Math.log(1+((finInterest/100)/12))*12);
	}

	return result;
}
