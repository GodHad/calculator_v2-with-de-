function calculate() {
	const loanAmount = input.get('loan_amount').gt(0).val();
	let loanTerm = input.get('loan_term').gt(0).val();
	const rate = input.get('interest_rate').gt(0).val();
	if(!input.valid()) return;

	loanTerm = loanTerm * 12;
	let monthlyResults = [];
	let balance = loanAmount;
	let interest = rate / 100 / 12;
	let payment = loanAmount * interest / (1 - Math.pow((1 + interest), -1 * Number(loanTerm)));

	for(let period = 0; period < Number(loanTerm); period++){
		let result = {
			"beginBalance": balance,
			"interest": balance * interest,
			"principal": payment - balance * interest,
		};
		balance = balance - payment + balance * interest;
		balance = balance < 0 ? 0 : balance;
		result.endBalance = balance;
		monthlyResults.push(result);
	}

	let annualResults = [];
	let annualInterest = 0;
	let annualPrincipal = 0;
	let beginBalance = 0;
	monthlyResults.forEach((item, index) => {
		annualInterest += item.interest;
		annualPrincipal += item.principal;
		if(index === 0 || (index % 12) === 0){
			beginBalance = item.beginBalance;
		}
		else if((index + 1) % 12 === 0 || (index + 1) === monthlyResults.length){
			annualResults.push({
				"beginBalance": beginBalance,
				"interest": annualInterest,
				"principal": annualPrincipal,
				"endBalance": item.endBalance,
			});
			annualInterest = 0;
			annualPrincipal = 0;
		}
	});
	let monthlyResultsHtml = '';
	monthlyResults.forEach((r, index) => {
		monthlyResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(r.beginBalance)}</td>
			<td>${currencyFormat(r.interest)}</td>
			<td>${currencyFormat(r.principal)}</td>
			<td>${currencyFormat(r.endBalance)}</td>
	</tr>`;
		if((index + 1) % 12 === 0 || (index + 1) === monthlyResults.length) {
			let title = 'Year #{1} End'.replace('{1}', Math.ceil((index + 1) / 12).toString());
			monthlyResultsHtml += `<th class="indigo text-center" colspan="5">${title}</th>`;
		}
	});

	let annualResultsHtml = '';
	const chartData = [[], [], [], []];
	let prevInterest = 0;
	let prevPrincipal = 0;
	annualResults.forEach((r, index) => {
		annualResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(r.beginBalance)}</td>
			<td>${currencyFormat(r.interest)}</td>
			<td>${currencyFormat(r.principal)}</td>
			<td>${currencyFormat(r.endBalance)}</td>
	</tr>`;
		prevInterest = r.interest + prevInterest;
		prevPrincipal = r.principal + prevPrincipal;
		chartData[0].push((index + 1));
		chartData[1].push(r.endBalance.toFixed(2));
		chartData[2].push(prevInterest.toFixed(2));
		chartData[3].push(prevPrincipal.toFixed(2));
	});
	const totalInterest = annualResults.reduce((total, item) => total + item.interest, 0);
	const totalPrincipal = annualResults.reduce((total, item) => total + item.principal, 0);
	const totalPayment = totalInterest + totalPrincipal;
	const interestPercent = +(totalInterest / totalPayment * 100).toFixed(0);
	const principalPercent = +(totalPrincipal / totalPayment * 100).toFixed(0);
	const donutData = [interestPercent, principalPercent];
	const totalTerm = loanTerm / 12;
	let chartLegendHtml = '';
	for(let i = 0; i <= totalTerm / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if(totalTerm % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${totalTerm} yr</p>`;
	}
	_('chart__legend').innerHTML = chartLegendHtml;

	changeChartData(donutData, chartData);

	output.val(monthlyResultsHtml).set('monthlyResult');
	output.val(annualResultsHtml).set('annualResult');
	output.val('Monthly Payment: $1,619.92').replace('$1,619.92', currencyFormat(payment)).set('monthlyPayment');
	output.val('Total of 120 Payments: $194,390.67').replace('120', loanTerm).replace('$194,390.67', currencyFormat(totalPayment)).set('totalPayments');
	output.val('Total Interest: $34,390.67').replace('$34,390.67', currencyFormat(totalInterest)).set('totalInterest');
}

function currencyFormat(price){
	return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
