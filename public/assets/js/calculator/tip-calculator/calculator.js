function calculate() {
	const price = input.get('bill_amount').gt(0).val();
	const tip = input.get('tip').gt(0).val();
	const people = input.get('number_people').gt(0).val();
	if(!input.valid()) return;

	let tips = [5, 7, 10, 15, 20, 25, 30, 50];
	if(!tips.includes(tip)) tips.push(tip);
	tips.sort((a, b) => a - b);

	const results = tips.map((tip) => {
		return {
			tip: tip,
			tipAmount: price * tip / 100,
			tipAmountPerPerson: price * tip / 100 / people,
			tipPerPerson: tip / people,
			total: price + price * tip / 100,
			totalPerPerson: (price + price * tip / 100) / people,		
		};
	})

	let resultHTML = '';
	results.forEach(result => {
		let tdClass = result.tip === tip ? 'semibold' : '';
		resultHTML += `
			<tr>
				<td class="${tdClass}">${result.tip}%</td>
				<td class="border-right ${tdClass}">${+result.tipPerPerson.toFixed(2)}%</td>
				<td class="${tdClass}">$${result.tipAmount.toFixed(2)}</td>
				<td class="border-right ${tdClass}">$${result.tipAmountPerPerson.toFixed(2)}</td>
				<td class="${tdClass}">$${result.total.toFixed(2)}</td>
				<td class="${tdClass}">$${result.totalPerPerson.toFixed(2)}</td>
			</tr>
		`;
	});

	_('result').innerHTML = resultHTML;
}
