function calculate(){
	const price = input.get('home_price').gt(0).val();
	const downPayment = input.get('down_payment').gt(0).lt('home_price').val();
	const years = input.get('loan_term').gt(0).val();
	const interest = input.get('interest_rate').gt(0).val();
	let startDate = input.get('start_date').optional().date().raw();
	const propertyTaxes = +input.get('property_taxes').val();
	const homeInsurance = +input.get('home_insurance').val();
	const pmi = +input.get('pmi').val();
	const hoa = +input.get('hoa_fee').val();
	const otherCosts = +input.get('other_costs').val();
	if(!input.valid()) return;
	const pmiPayment = downPayment >= 20 ? 0 : pmi;

	const termLoan = years * 12;
	const loanAmount = price - (price * downPayment / 100);
	if(!startDate) startDate = new Date();
	const monthlyPayment = calculatePayment(loanAmount, termLoan, interest);
	const totalMonthly = (propertyTaxes + homeInsurance + otherCosts + pmiPayment) / 12 + monthlyPayment + hoa;
	const amortization = calculateAmortization(loanAmount, termLoan, interest, startDate);

	let annualResults = [];
	let annualInterest = 0;
	let annualPrincipal = 0;
	let beginBalance = 0;
	let monthlyResultsHtml = '';
	amortization.forEach((item, index) => {
		monthlyResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${formattedDate(item.date)}</td>
			<td>${currencyFormat(item.paymentToInterest)}</td>
			<td>${currencyFormat(item.paymentToPrinciple)}</td>
			<td>${currencyFormat(item.principle)}</td>
		</tr>`;
		if((index + 1) % 12 === 0 || (index + 1) === amortization.length) {
			let title = 'Year #{1} End'.replace('{1}', Math.ceil((index + 1) / 12).toString());
			monthlyResultsHtml += `<th class="indigo text-center" colspan="5">${title}</th>`;
		}
		annualInterest += item.paymentToInterest;
		annualPrincipal += item.paymentToPrinciple;
		if((index + 1) % 12 === 0 || (index + 1) === amortization.length){
			annualResults.push({
				"date": item.date,
				"interest": item.interest,
				"paymentToInterest": annualInterest,
				"paymentToPrinciple": annualPrincipal,
				"principle": item.principle,
			});
			annualInterest = 0;
			annualPrincipal = 0;
		}
	});

	let chartLegendHtml = '';
	for(let i = 0; i <= years / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if(years % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${years} yr</p>`;
	}
	const totalInterest = annualResults.reduce((total, item) => total + item.paymentToInterest, 0);
	const totalPrincipal = annualResults.reduce((total, item) => total + item.paymentToPrinciple, 0);
	const totalTaxes = (totalMonthly - monthlyPayment) * 12 * years;
	const totalPayment = totalInterest + totalPrincipal + totalTaxes;
	const interestPercent = +(totalInterest / totalPayment * 100).toFixed(0);
	const principalPercent = +(totalPrincipal / totalPayment * 100).toFixed(0);
	const taxesPercent = +(totalTaxes / totalPayment * 100).toFixed(0);
	const donutData = [principalPercent, taxesPercent, interestPercent];

	let annualResultsHtml = '';
	const chartData = [[], [], [], []];
	let prevInterest = 0;
	let prevPrincipal = 0;
	annualResults.forEach((r, index) => {
		annualResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${formattedDate(r.date)}</td>
			<td>${currencyFormat(r.paymentToInterest)}</td>
			<td>${currencyFormat(r.paymentToPrinciple)}</td>
			<td>${currencyFormat(r.principle)}</td>
	</tr>`;
		prevInterest = r.paymentToInterest + prevInterest;
		prevPrincipal = r.paymentToPrinciple + prevPrincipal;
		chartData[0].push((index + 1));
		chartData[1].push(+r.principle.toFixed(2));
		chartData[2].push(+prevInterest.toFixed(2));
		chartData[3].push(+prevPrincipal.toFixed(2));
	});
	_('chart__legend').innerHTML = chartLegendHtml;
	changeChartData(donutData, chartData);
	output.val(annualResultsHtml).set('annual-results');
	output.val(monthlyResultsHtml).set('monthly-results');
	output.val('Monthly Payment: $1,816.92').replace('$1,816.92', currencyFormat(monthlyPayment)).set('monthly-payment');
	output.val('Property Tax: $132,000.00').replace('$132,000.00', currencyFormat(propertyTaxes / 12 * termLoan)).set('property-tax');
	output.val('Home Insurance: $39,000.00').replace('$39,000.00', currencyFormat(homeInsurance / 12 * termLoan)).set('insurance');
	output.val('HOA Fee: $36,000.00').replace('$36,000.00', currencyFormat(hoa * termLoan)).set('hoa');
	output.val('Other Costs: $150,000.00').replace('$416.67', currencyFormat(otherCosts / 12 * termLoan)).set('other-costs');
	output.val('Total Out-of-Pocket: $1,011,091.20').replace('$1,011,091.20', currencyFormat(totalMonthly * termLoan)).set('total-monthly');
	output.val('House Price: $400,000.00').replace('$400,000.00', currencyFormat(price)).set('price');
}

function calculatePayment(finAmount, finMonths, finInterest){
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

function calculateAmortization(finAmount, finMonths, finInterest, finDate){
	var payment = this.calculatePayment(finAmount, finMonths, finInterest),
		balance = finAmount,
		interest = 0.0,
		totalInterest = 0.0,
		schedule = [],
		currInterest = null,
		currPrinciple = null,
		currDate = (finDate !== undefined && finDate.constructor === Date)? new Date(finDate) : (new Date());

	for(var i=0; i<finMonths; i++){
		currInterest = balance * finInterest/1200;
		totalInterest += currInterest;
		currPrinciple = payment - currInterest;
		balance -= currPrinciple;

		schedule.push({
			principle: balance,
			interest: totalInterest,
			payment: payment,
			paymentToPrinciple: currPrinciple,
			paymentToInterest: currInterest,
			date: new Date(currDate.getTime())
		});

		currDate.setMonth(currDate.getMonth()+1);
	}

	return schedule;
}

function currencyFormat(price){
	return '$' + price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formattedDate(date){
	const monthNames = ["Jan", "Feb", "Marc", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();
	return month + ' ' + day + ', ' + year;
}
