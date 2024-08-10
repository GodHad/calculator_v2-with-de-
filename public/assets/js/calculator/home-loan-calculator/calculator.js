function calculate(){
	const price = input.get('home_price').gt(0).val();
	const years = input.get('loan_term').gt(0).val();
	const downPaymentPercent = input.get('down_payment').gt(0).val();
	const interestRate = input.get('interest_rate').gt(0).val();
	const propertyTax = +input.get('property_tax').val();
	const insurance = +input.get('insurance').val();
	const pmi = +input.get('pmi').val();
	const hoaFee = +input.get('hoa_fee').val();

	if(!input.valid()) return;
	const pmiPayment = downPaymentPercent < 20 ? price * pmi / 100 / 12 : 0;
	const downPayment = price * downPaymentPercent / 100;
	const loanTerm = years * 12;
	const monthlyPayment = calculatePayment(price - downPayment, loanTerm, interestRate);
	const totalMonthlyPayment = monthlyPayment + propertyTax + insurance + pmiPayment + hoaFee;

	const totalMonthly = monthlyPayment * loanTerm;
	const principalPercent = (price - downPayment) * 100 / totalMonthly;
	const interestPercent = 100 - principalPercent;

	output.val('Monthly Payment: $1,816.92').replace('$1,816.92', currencyFormat(monthlyPayment)).set('monthly-payment');
	output.val('Property Tax: $144,000.00').replace('$144,000.00', currencyFormat(propertyTax * loanTerm)).set('property-tax');
	output.val('Home Insurance: $36,000.00').replace('$36,000.00', currencyFormat(insurance * loanTerm)).set('home-insurance');
	output.val('Total Out-of-Pocket: $834,091.20').replace('$834,091.20', currencyFormat(totalMonthlyPayment * loanTerm)).set('total-out-of-pocket');
	output.val('House Price: $400,000.00').replace('$400,000.00', currencyFormat(price)).set('house-price');
	window.changeChartData([principalPercent.toFixed(0), interestPercent.toFixed(0)]);
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

function currencyFormat(price){
	return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
