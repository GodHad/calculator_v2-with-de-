function calculate() {
	let startTime = input.get('start_time').replace(/[hms]/g, "0").raw();
	let endTime = input.get('end_time').replace(/[hms]/g, "0").raw();

	if(!input.valid()) return;
	startTime = startTime ? startTime : '00:00';
	endTime = endTime ? endTime : '00:00';
	startTime = startTime.split(':');
	endTime = endTime.split(':');


	const h1 = parseInt(startTime[0]);
	const m1 = parseInt(startTime[1]);
	const s1 = parseInt(startTime[2]);
	const h2 = parseInt(endTime[0]);
	const m2 = parseInt(endTime[1]);
	const s2 = parseInt(endTime[2]);
	let totalSeconds = 0;
	const seconds1 = (h1 * 3600) + (m1 * 60) + s1;
	const seconds2 = (h2 * 3600) + (m2 * 60) + s2;
	totalSeconds = seconds1 > seconds2 ? (86400 - seconds1) + seconds2 : seconds2 - seconds1;
	totalSeconds = Math.abs(totalSeconds);
	_('result_a').innerHTML = toDaysMinutesSeconds(totalSeconds);
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
	if(hours) {
		result += plural(hours, 'h') + ' ';
	}
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

function calculateDate() {
	let startDate = input.get('start_date').raw();
	let endDate = input.get('end_date').raw();
	let startTime = input.get('start_time_2').replace(/[hms]/g, "0").raw();
	let endTime = input.get('end_time_2').replace(/[hms]/g, "0").raw();
	if(!input.valid()) return;

	startDate = startDate ? new Date(startDate) : new Date();
	endDate = endDate ? new Date(endDate) : new Date();
	startTime = startTime ? startTime : '00:00:00';
	endTime = endTime ? endTime : '00:00:00';
	startTime = startTime.split(':');
	endTime = endTime.split(':');

	const h1 = parseInt(startTime[0]);
	const m1 = parseInt(startTime[1]);
	const s1 = parseInt(startTime[2]);
	const h2 = parseInt(endTime[0]);
	const m2 = parseInt(endTime[1]);
	const s2 = parseInt(endTime[2]);
	let totalSeconds = 0;
	const seconds1 = (h1 * 3600) + (m1 * 60) + s1 + (startDate.getTime() / 1000);
	const seconds2 = (h2 * 3600) + (m2 * 60) + s2 + (endDate.getTime() / 1000);
	totalSeconds = seconds1 > seconds2 ? (86400 - seconds1) + seconds2 : seconds2 - seconds1;
	totalSeconds = Math.abs(totalSeconds);
	_('result_b').innerHTML = toDaysMinutesSeconds(totalSeconds);
}
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
