function calculate() {
	let startTime = input.get('start_time').time().raw();
	let endTime = input.get('end_time').time().raw();
	if(!input.valid()) return;
	let totalSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
	if(totalSeconds < 0) {
		endTime.setDate(endTime.getDate() + 1);
		totalSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
	}
	_('result').innerHTML = toDaysMinutesSeconds(totalSeconds);
	_('result-hours-minutes').innerHTML = 'or ' + Math.floor((totalSeconds % (3600 * 24)) / 3600) + ':' + String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
	_('result-in-hours').innerHTML = 'or '  + plural(+(totalSeconds / 3600).toFixed(5), 'h');
	_('result-in-minutes').innerHTML = 'or ' + plural(+(totalSeconds / 60).toFixed(5), 'm');
}

function toDaysMinutesSeconds(totalSeconds){
	let result = '';
	const seconds = Math.floor(totalSeconds % 60);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
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

	if (label === 'm') return number === 1 ? number + prefix + ' minute' : number + prefix + ' minutes';

	if (label === 's') return number === 1 ? number + prefix + ' second' : number + prefix + ' seconds';
}
