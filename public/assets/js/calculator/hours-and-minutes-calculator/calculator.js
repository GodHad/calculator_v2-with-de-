function calculate() {
	let startTime = input.get('start_time_a').time("hh:mm").raw();
	let endTime = input.get('end_time_a').time("hh:mm").raw();
	if(!input.valid()) return;
	let totalSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
	if(totalSeconds < 0) {
		endTime.setDate(endTime.getDate() + 1);
		totalSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
	}
	printResults(totalSeconds);
}

function toDaysMinutesSeconds(totalSeconds){
	let result = '';
	const seconds = Math.floor(totalSeconds % 60);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
	const days = Math.floor(totalSeconds / (3600 * 24));
	if(days) {
		result += plural(days, 'd') + ' ';
	}
	result += plural(hours, 'h') + ' ';
	if(minutes) {
		result += plural(minutes, 'm') + ' ';
	}
	if(seconds) {
		result += plural(seconds, 's');
	}
	return result;
}

function plural(number, label, prefix = '') {
	if (label === 'd') return number === 1 ? number + prefix + ' day' : number + prefix + ' days';

	if (label === 'h') return number === 1 ? number + prefix + ' hour' : number + prefix + ' hours';

	if (label === 'm') return number === 1 ? number + prefix + ' minute' : numberWithCommas(number) + prefix + ' minutes';

	if (label === 's') return number === 1 ? number + prefix + ' second' : number + prefix + ' seconds';

}

function printResults(totalSeconds, suffix = '') {
	_('result' + suffix).innerHTML = toDaysMinutesSeconds(totalSeconds);
	_('result-hours-minutes' + suffix).innerHTML = plural(Math.floor((totalSeconds % (3600 * 24)) / 3600), 'h') + ' ' + plural(Math.floor((totalSeconds % 3600) / 60), 'm');
	_('result-in-hours' + suffix).innerHTML = plural(+(totalSeconds / 3600).toFixed(5), 'h');
	_('result-in-minutes' + suffix).innerHTML = plural(+(totalSeconds / 60).toFixed(5), 'm');
}

function calculateDate() {
	let startDate = input.get('start_date').date().raw();
	let endDate = input.get('end_date').date().raw();
	let startTime = input.get('start_time_b').time('hh:mm').raw();
	let endTime = input.get('end_time_b').time('hh:mm').raw();
	if(!input.valid()) return;
	startDate.setHours(startTime.getHours());
	startDate.setMinutes(startTime.getMinutes());
	endDate.setHours(endTime.getHours());
	endDate.setMinutes(endTime.getMinutes());
	let totalSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
	printResults(totalSeconds, '-date');
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
