function calculate(){
	const amount = input.get('investment_amount').gt(0).val();
	const period = input.get('investment_period').gt(0).val();
	const annualReturns = input.get('annual_returns').gt(0).val();
	if(!input.valid()) return;
	const sip = sipCalculator(amount, period, annualReturns);
	const periods = [5, 8, 10, 12, 15, 18];
	const totalInvested = amount * period * 12;
	const gain = sip - totalInvested;

	const totalInvestmentPercent = (totalInvested * 100) / sip;
	const gainPercent = (gain * 100) / sip;
	changeChartData([roundTo(gainPercent, 0), roundTo(totalInvestmentPercent, 0)]);
	output.val('Expected Amount: $278,657.27').replace('$278,657.27', currencyFormat(sip)).set('expected-amount');
	output.val('Amount Invested: $120,000.00').replace('$120,000.00', currencyFormat(totalInvested)).set('invested');
	output.val('Wealth Gain: $158,657.27').replace('$158,657.27', currencyFormat(gain)).set('gain');
	let tableHtml = '';
	for(let i = 0; i < periods.length; i++) {
		const period = periods[i];
		const sip = sipCalculator(amount, period, annualReturns);
		tableHtml += `<tr><td class="text-center">${i + 1}</td><td>${period} years</td><td>${currencyFormat(amount)}</td><td>${currencyFormat(sip)}</td></tr>`;
	}
	output.val(tableHtml).set('period-values');
}
function sipCalculator(investmentAmount, investmentPeriodYears, annualReturns) {
	const monthlyReturns = annualReturns / 12 / 100; // Convert annual returns to monthly returns
	const totalMonths = investmentPeriodYears * 12;

	return investmentAmount * ((Math.pow(1 + monthlyReturns, totalMonths) - 1) / monthlyReturns) * (1 + monthlyReturns);
}

function currencyFormat(number) {
	return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
