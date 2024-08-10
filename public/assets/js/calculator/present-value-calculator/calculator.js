function calculate(){
	const futureValue = input.get('future_value').gt(0).val();
	const periods = input.get('number_periods').gt(0).val();
	const interestRate = input.get('interest_rate').gte(0).val();
	if(!input.valid()) return;
	const presentValue = getPresentValue(futureValue, interestRate, periods);
	const totalInterest = futureValue - presentValue;
	output.val(currencyFormat(presentValue)).set('present-value-result');
	output.val(currencyFormat(totalInterest)).set('total-interest-result');
}

function calculate2(){
	const periodicDeposit = input.get('periodic_deposit').gt(0).val();
	const periods = input.get('number_periods_2').gt(0).val();
	const interestRate = input.get('interest_rate_2').gte(0).val();
	const pmt = input.get('pmt').raw();
	if(!input.valid()) return;
	let result = [];
	result = [
		{
			startPrincipal: pmt === 'beginning' ? periodicDeposit : 0,
			startBalance: pmt === 'beginning' ? periodicDeposit : 0,
			interest: pmt === 'beginning' ? periodicDeposit * (interestRate / 100) : 0,
			endBalance: pmt === 'beginning' ? periodicDeposit + periodicDeposit * (interestRate / 100) : periodicDeposit,
			endPrincipal: periodicDeposit
		}
	];
	for(let i = 1; i < periods; i++){
		let startPrincipal = result[i - 1].startPrincipal + periodicDeposit;
		let startBalance = result[i - 1].startBalance + result[i - 1].interest + periodicDeposit;
		let interest = startBalance * (interestRate / 100);
		let endBalance = startBalance + interest;
		let endPrincipal = result[i -1].endPrincipal + periodicDeposit
		if(pmt === 'end'){
			endBalance = startBalance + interest + periodicDeposit;
		}
		result.push({
			startPrincipal,
			startBalance,
			interest,
			endBalance,
			endPrincipal
		});
	}
	const totalInterest = result.reduce((acc, cur) => acc + cur.interest, 0);
	const futureValue = result[result.length - 1].endBalance;
	const totalPrincipal = periodicDeposit * periods
	const presentValue = getPresentValue(futureValue, interestRate, periods);
	const interestPercent = totalInterest / futureValue * 100;
	const principalPercent = 100 - interestPercent;
	const donatValues = [roundTo(interestPercent, 0), roundTo(principalPercent, 0)];
	let chartData = [[], [], [], []];
	let resultTableHtml = '';
	result.forEach((item, index) => {
		chartData[0].push(index + 1);
		chartData[1].push(roundTo(item.endBalance, 0))
		chartData[2].push(roundTo(item.interest, 0));
		chartData[3].push(roundTo(item.endPrincipal, 0));

		resultTableHtml += `<tr>
			<td class="text-center">${index + 1}</td>
			<td>${currencyFormat(item.startBalance)}</td>
			<td>${currencyFormat(item.interest)}</td>
			<td>${currencyFormat(item.endPrincipal)}</td>
			<td>${currencyFormat(item.endBalance)}</td>
		</tr>`;
	});
	output.val(resultTableHtml).set('result-table');
	changeChartData(donatValues, chartData);
	output.val(currencyFormat(futureValue)).set('future-value-result-2');
	output.val(currencyFormat(presentValue)).set('present-value-result-2');
	output.val(currencyFormat(totalInterest)).set('total-interest-result-2');
	output.val(currencyFormat(totalPrincipal)).set('total-principal-result-2');
	let chartLegendHtml = '';
	for(let i = 0; i <= periods / 5; i++){
		chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
	}
	if(periods % 5 !== 0){
		chartLegendHtml += `<p class="result-text result-text--small">${periods} yr</p>`;
	}
	_('chart__legend').innerHTML = chartLegendHtml;
}

function currencyFormat(number){
	return number.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}

function getPresentValue(futureValue, interestRate, periods){
	return futureValue / Math.pow(1 + (interestRate / 100), periods);
}
