function calculate(){
	const amount = input.get('home_price').gt(0).val();
	const downPayment = +input.get('down_payment').val();
	const years = input.get('loan_term').gt(0).val();
	const interest = input.get('interest_rate').gt(0).val();
	const upfront = +input.get('upfront_fha_mip').val();
	const annualFhaMip = +input.get('annual_fha_mip').val();
	const annualFhaMipDuration = input.get('annual_fha_mip_duration').index().val();
	const tax = +input.get('property_taxes').val();
	const insurance = +input.get('home_insurance').val();
	const hoa = +input.get('hoa_fee').val();
	if(!input.valid()) return;

	const downPaymentAmount = amount * downPayment / 100;
	const loanAmount = amount - downPaymentAmount;
	const loanTerm = years * 12;
	const upFrontValue = upfront / 100 * loanAmount;
	const annualFhaMipValue = (annualFhaMip / 100 * loanAmount) / 12;
	const insuranceTotal = insurance * years;
	const hoaTotal = hoa * years;

	const monthlyPayment = calculatePayment(loanAmount + upFrontValue, loanTerm, interest);
	const amortization = calculateAmortization(loanAmount + upFrontValue, loanTerm, interest);

	const taxMonthlyValue = tax / 100 * amount / 12;
	const totalTax = taxMonthlyValue * loanTerm;
	let annualFhaMipPayments = 0;
	if(annualFhaMipDuration === 0){
		annualFhaMipPayments = loanTerm;
	}
	else if(annualFhaMipDuration === 1){
		annualFhaMipPayments = years < 11 ? loanTerm : 132;
	}
	else if(annualFhaMipDuration === 2){
		annualFhaMipPayments = years < 5 ? loanTerm : 60;
	}
	else if(annualFhaMipDuration === 3){
		let shouldSkip = false;
		amortization.forEach((item, index) => {
			if(!shouldSkip && item.principle <= (loanAmount) * 0.78){
				annualFhaMipPayments = index;
				shouldSkip = true;
			}
		})
	}

	const totalMip = annualFhaMipPayments * annualFhaMipValue;

	let chartLegendHtml = '';
	for(let i = 0; i <= years / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if(years % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${years} yr</p>`;
	}
	let annualResults = [];
	let annualInterest = 0;
	let annualPrincipal = 0;
	let monthlyResultsHtml = '';
	amortization.forEach((item, index) => {
		monthlyResultsHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(item.beginBalance)}</td>
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
				beginBalance: item.beginBalance,
				"interest": item.interest,
				"paymentToInterest": annualInterest,
				"paymentToPrinciple": annualPrincipal,
				"principle": item.principle,
			});
			annualInterest = 0;
			annualPrincipal = 0;
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
	const totalInterest = amortization.reduce((total, item) => total + item.paymentToInterest, 0);
	const totalPrincipal = amortization.reduce((total, item) => total + item.paymentToPrinciple, 0);
	const totalPayment = totalInterest + totalPrincipal + totalTax + insuranceTotal + hoaTotal + totalMip;
	const interestPercent = +(totalInterest / totalPayment * 100).toFixed(0);
	const principalPercent = +(totalPrincipal / totalPayment * 100).toFixed(0);
	const taxesPercent = +(totalTax / totalPayment * 100).toFixed(0);
	const insurancePercent = +(insuranceTotal / totalPayment * 100).toFixed(0);
	const hoaPercent = +(hoaTotal / totalPayment * 100).toFixed(0);
	const totalMipPercent = +(totalMip / totalPayment * 100).toFixed(0);
	const donutData = [principalPercent, interestPercent, hoaPercent, taxesPercent, insurancePercent, totalMipPercent];
	_('chart__legend').innerHTML = chartLegendHtml;
	changeChartData(donutData, chartData);
	output.val(currencyFormat(monthlyPayment)).set('monthly-payment');
	output.val(currencyFormat(totalInterest + totalPrincipal)).set('mortgage-payment');
	output.val(currencyFormat(totalTax)).set('property-tax');
	output.val(currencyFormat(insuranceTotal)).set('insurance-total');
	output.val(currencyFormat(totalMip)).set('annual-mip');
	output.val(currencyFormat(hoaTotal)).set('hoa-fee');
	output.val(currencyFormat(totalPayment)).set('total-payment');
	output.val(annualResultsHtml).set('annual-results');
	output.val(monthlyResultsHtml).set('monthly-results');
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
			beginBalance: balance + currPrinciple,
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
	return '$' + price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
