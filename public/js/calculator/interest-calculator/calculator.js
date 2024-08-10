function calculate(){
	const principal = input.get('starting_principal').gt(0).val();
	const annualAddition = +input.get('annual_addition').val();
	const monthlyAddition = +input.get('monthly_addition').val();
	const contributeType = input.get('contribute').raw();
	const interest = +input.get('annual_interest').val();
	const years = +input.get('years').val();
	const tax = +input.get('tax_rate').val();
	const inflation = +input.get('inflation_rate').val();
	if(!input.valid()) return;
	const amortization = calculateAmortization(principal, annualAddition, monthlyAddition, contributeType, interest, years, tax);

	let annualResults = [];
	let chartData = [[], [], [], []];
	let annualInterest = 0;
	let annualContribution = 0;
	let monthlyResultsHtml = '';
	let annualResultsHtml = '';
	amortization.forEach((item, index) => {
		monthlyResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(item.contribution)}</td>
			<td>${currencyFormat(item.interestPayment)}</td>
			<td>${currencyFormat(item.endBalance)}</td>
		</tr>`;
		annualInterest += item.interestPayment;
		annualContribution += item.contribution;
		if((index + 1) % 12 === 0 || (index + 1) === amortization.length){
			let title = 'Year #{1} End'.replace('{1}', Math.ceil((index + 1) / 12).toString());
			monthlyResultsHtml += `<th class="indigo text-center" colspan="5">${title}</th>`;
		}
		if((index + 1) % 12 === 0 || (index + 1) === amortization.length){
			annualResults.push({
				"interestPayment": annualInterest,
				"contribution": annualContribution,
				"endBalance": item.endBalance,
				"totalInterest": item.totalInterest,
				"totalContributions": item.totalContributions,
			});
			annualInterest = 0;
			annualContribution = 0;
		}
	});

	let chartLegendHtml = '';
	for(let i = 0; i <= years / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if(years % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${years} yr</p>`;
	}
	annualResults.forEach((r, index) => {
		annualResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(r.contribution)}</td>
			<td>${currencyFormat(r.interestPayment)}</td>
			<td>${currencyFormat(r.endBalance)}</td>
	</tr>`;
		chartData[0].push((index + 1));
		chartData[1].push(+principal.toFixed(2));
		chartData[2].push(+r.totalInterest.toFixed(2));
		chartData[3].push(+r.totalContributions.toFixed(2));
	});

	const totalInterest = amortization[amortization.length - 1].totalInterest;
	const totalContributions = amortization[amortization.length - 1].totalContributions;
	const endBalance = amortization[amortization.length - 1].endBalance;
	const interestWithTax = totalInterest * 1 / ((100 - tax) / 100);
	const taxValue = interestWithTax - totalInterest;
	const totalValue = interestWithTax + totalContributions + principal;
	const interestWithoutTaxPercent = totalInterest / totalValue * 100;
	const taxPercent = taxValue / totalValue * 100;
	const contributionsPercent = totalContributions / totalValue * 100;
	const principalPercent = principal / totalValue * 100;
	changeChartData([roundTo(principalPercent, 0), roundTo(interestWithoutTaxPercent, 0), roundTo(contributionsPercent, 0), roundTo(taxPercent, 0)], chartData);
	_('chart__legend').innerHTML = chartLegendHtml;
	output.val(annualResultsHtml).set('annual-results');
	output.val(monthlyResultsHtml).set('monthly-results');
	output.val('End Balance: $135,479.01').replace('$135,479.01', currencyFormat(endBalance)).set('end-balance');
	output.val('Total Principal: $99,000.00').replace('$99,000.00', currencyFormat(totalContributions + principal)).set('total-contribution');
	output.val('Total Interest: $39,224.74').replace('$39,224.74', currencyFormat(interestWithTax)).set('total-interest');
	output.val('Total Interest after Tax: $36,479.01').replace('$36,479.01', currencyFormat(totalInterest)).set('total-interest-after-tax');
	output.val('After Inflation Adjustment: $100,809.11').replace('$100,809.11', currencyFormat(backwardFlatRateInflationCalculator(endBalance, years, inflation))).set('balance-with-inflation');
}
function currencyFormat(num) {
	return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function calculateAmortization(principal, annualAddition, monthlyAddition, contributeType, interest, years, tax){
	const monthlyInterest = interest / 12;
	const months = years * 12;
	let balance = principal;
	let totalInterest = 0;
	let totalContributions = 0;
	let amortization = [];
	for(let i = 0; i < months; i++){
		let contribution = i === 0 ? principal : 0;
		if(contributeType === 'beginning'){
			balance += monthlyAddition;
			totalContributions += monthlyAddition;
			contribution += monthlyAddition;
			if(i % 12 === 0){
				balance += annualAddition;
				totalContributions += annualAddition;
				contribution += annualAddition;
			}
		}

		let interestPayment = balance * monthlyInterest / 100;
		interestPayment = interestPayment - interestPayment * tax / 100
		totalInterest += interestPayment;
		const beginBalance = balance;
		balance += interestPayment;

		if(contributeType === 'end'){
			balance += monthlyAddition;
			totalContributions += monthlyAddition;
			contribution += monthlyAddition;
			if((i + 1) % 12 === 0){
				balance += annualAddition;
				totalContributions += annualAddition;
				contribution += annualAddition;
			}
		}
		amortization.push({
			beginBalance,
			contribution,
			interestPayment,
			totalInterest,
			endBalance: balance,
			totalContributions
		});
	}
	return amortization;
}


function backwardFlatRateInflationCalculator(futureValue, years, inflationRate) {
	const rate = inflationRate / 100;

	return futureValue / Math.pow(1 + rate, years);
}
