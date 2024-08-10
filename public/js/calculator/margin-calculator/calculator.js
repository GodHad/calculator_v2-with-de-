function calculate() {
	const cost = input.get('cost').gt(0).val();
	const revenue = input.get('revenue').gt(0).val();

	if(!input.valid()) return;

	output.val(currencyFormat(revenue - cost)).set('result-profit');
	output.val((( revenue - cost ) / cost * 100).toFixed(2) + '%').set('result-markup');
	output.val(((revenue - cost) / revenue * 100).toFixed(2) + '%').set('result');
}

function currencyFormat(price){
	return '$' + numberWithCommas(Number(price).toFixed(2));
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
