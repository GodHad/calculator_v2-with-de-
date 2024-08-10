function calculate(){
	const invested = input.get('amount_invested').gt(0).val();
	const returned = input.get('amount_returned').gt(0).val();
	const time = input.get('time').raw();
	const length = input.get('investment_length').gt(0).val();
	const lengthType = input.get('investment_length_type').index().val();
	const startDate = input.get('start_date').date().raw();
	const endDate = input.get('end_date').date().raw();
	if(!input.valid()) return;

	let returnedPercent = (returned - invested) * 100 / returned;
	let investedPercent = 100 - returnedPercent;
	if(returned < invested) {
		investedPercent = returned * 100 / invested;
		returnedPercent = 100 - investedPercent;
	}

	let years = 0;
	if(time === 'length'){
		switch(lengthType){
			case 0:
				years = length / 365;
				break
			case 1:
				years = length / 360;
				break;
			case 2:
				years = length / 52;
				break;
			case 3:
				years = length / 12;
				break;
			case 4:
				years = length / 4;
				break;
			default:
				years = length;
		}
	}
	else {
		years = (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 / 365;
	}

	const roi = (returned - invested) / invested * 100;
	const annualizedRoi = (Math.pow((1 + roi / 100), 1 / years) - 1) * 100;

	output.val(roi.toFixed(2) + '%').set('roi');
	output.val(currencyFormat(returned - invested)).set('investment-gain');
	output.val(annualizedRoi.toFixed(2) + '%').set('annualized-roi');
	output.val(+years.toFixed(3) + ' years').set('investment-length');
	if(returned < invested){
		output.val('Loss').set('profit-label');
		output.val('Remaining').set('invested-label');
	}
	else {
		output.val('Profit').set('profit-label');
		output.val('Invested').set('invested-label');
	}
	changeChartData([investedPercent.toFixed(0), returnedPercent.toFixed(0)]);
}

function currencyFormat(price){
	return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
