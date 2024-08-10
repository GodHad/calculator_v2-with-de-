function calculate() {
	const price = input.get('price').gt(0).val();
	const tax = input.get('tax').index().val();
	const salesTax = input.get('sales_tax').gte(0).val();

	if(!input.valid()) return;
	let beforeTax, afterTax;

	if(tax === 0) {
		beforeTax = price;
		afterTax = price * (1 + salesTax / 100);
	}
	else {
		afterTax = price;
		beforeTax = price / (1 + salesTax / 100);
	}

	_('before-tax').innerHTML = currencyFormat(beforeTax);
	_('after-tax').innerHTML = currencyFormat(afterTax);
	_('sales-tax').innerHTML = currencyFormat((salesTax * beforeTax) / 100);
	_('sales-tax-percent').innerHTML = salesTax + '%';
}

function currencyFormat(price){
	return '$' + numberWithCommas(Number(price).toFixed(2));
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
