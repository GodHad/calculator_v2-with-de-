function calculate(){
	const hours = +input.get('hours').val();
	const minutes = +input.get('minutes').val();
	const seconds = +input.get('seconds').val();
	if(!input.valid()) return;

	const totalSeconds = hours * 3600 + minutes * 60 + seconds;
	const hoursDecimal = totalSeconds / 3600;
	const minutesDecimal = totalSeconds / 60;
	const result = `${+hoursDecimal.toFixed(4)} hours<br>
		or ${+minutesDecimal.toFixed(4)} minutes<br>
		or ${totalSeconds} seconds`;
	output.val(result).set('result');
}
