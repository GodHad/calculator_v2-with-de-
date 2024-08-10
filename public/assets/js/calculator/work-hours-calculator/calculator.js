function calculate(){
	const mondayStart = input.get('start_time_monday').optional().time("hh:mm").raw();
	const mondayEnd = input.get('end_time_monday').optional().time("hh:mm").raw();
	const mondayBreak = +input.get('break_monday').val();
	const tuesdayStart = input.get('start_time_tuesday').optional().time("hh:mm").raw();
	const tuesdayEnd = input.get('end_time_tuesday').optional().time("hh:mm").raw();
	const tuesdayBreak = +input.get('break_tuesday').val();
	const wednesdayStart = input.get('start_time_wednesday').optional().time("hh:mm").raw();
	const wednesdayEnd = input.get('end_time_wednesday').optional().time("hh:mm").raw();
	const wednesdayBreak = +input.get('break_wednesday').val();
	const thursdayStart = input.get('start_time_thursday').optional().time("hh:mm").raw();
	const thursdayEnd = input.get('end_time_thursday').optional().time("hh:mm").raw();
	const thursdayBreak = +input.get('break_thursday').val();
	const fridayStart = input.get('start_time_friday').optional().time("hh:mm").raw();
	const fridayEnd = input.get('end_time_friday').optional().time("hh:mm").raw();
	const fridayBreak = +input.get('break_friday').val();
	const saturdayStart = input.get('start_time_saturday').optional().time("hh:mm").raw();
	const saturdayEnd = input.get('end_time_saturday').optional().time("hh:mm").raw();
	const saturdayBreak = +input.get('break_saturday').val();
	const sundayStart = input.get('start_time_sunday').optional().time("hh:mm").raw();
	const sundayEnd = input.get('end_time_sunday').optional().time("hh:mm").raw();
	const sundayBreak = +input.get('break_sunday').val();

	if(!input.valid()) return;
	const monday = dayInfo(mondayStart, mondayEnd, mondayBreak);
	const tuesday = dayInfo(tuesdayStart, tuesdayEnd, tuesdayBreak);
	const wednesday = dayInfo(wednesdayStart, wednesdayEnd, wednesdayBreak);
	const thursday = dayInfo(thursdayStart, thursdayEnd, thursdayBreak);
	const friday = dayInfo(fridayStart, fridayEnd, fridayBreak);
	const saturday = dayInfo(saturdayStart, saturdayEnd, saturdayBreak);
	const sunday = dayInfo(sundayStart, sundayEnd, sundayBreak);
	const result = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
	const total = result.reduce((acc, day) => {
		if(!day) return acc;
		return acc + day.minutesDiff;
	}, 0);
	const ot = total > 40 * 60 ? total - 40 * 60 : 0;
	const reg = total > 40 * 60 ? 40 * 60 : total;
	const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	let resultHtml = '';
	for(let i = 0; i < result.length; i++) {
		let label = labels[i];
		resultHtml += `<tr><td>${label}</td>`;
		if(!result[i]){
			resultHtml += `<td>-</td><td class="short">-</td><td class="short">-</td><td class="short">-</td><td class="short">-</td>`;
		}
		else {
			resultHtml += `<td>${result[i].shortStartTime}</td><td class="short">${result[i].shorEndTime}</td><td class="short">${result[i].timeBreak}</td><td class="short">${result[i].timeDiff}</td><td class="short">${result[i].timeDiffDecimal}</td>`;
		}
		resultHtml += `</tr>`;
	}
	output.val(resultHtml).set('result-days');
	output.val(minutesToHours(reg)).set('reg');
	output.val(minutesToHoursDecimal(reg)).set('reg-decimal');
	output.val(minutesToHours(ot)).set('ot');
	output.val(minutesToHoursDecimal(ot)).set('ot-decimal');
	output.val(minutesToHours(total)).set('total');
	output.val(minutesToHoursDecimal(total)).set('total-decimal');
}

function dayInfo(start, end, timeBreak) {
	if(!start || !end) return false;
	const minutesDiff = (end.getTime() - start.getTime()) / 1000 / 60  - timeBreak;
	return {
		minutesDiff: minutesDiff,
		timeDiff: minutesToHours(minutesDiff),
		timeDiffDecimal: minutesToHoursDecimal(minutesDiff),
		timeBreak: minutesToHours(timeBreak),
		shortStartTime: start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
		shorEndTime: end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
	}
}

function minutesToHours(minutes) {
	const hours = Math.floor(minutes / 60);
	const minutesLeft = minutes % 60;
	return `${String(hours).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}`;
}

function minutesToHoursDecimal(minutes) {
	const hours = Math.floor(minutes / 60);
	const minutesLeft = minutes % 60;
	return `${hours}.${String(roundTo(minutesLeft * 100 / 60, 0)).padStart(2, '0')}`;
}

const clearButtons = document.getElementsByClassName('input-field--clear');
for(let i = 0; i < clearButtons.length; i++) {
	clearButtons[i].addEventListener('click', function(e) {
		let inputs = clearButtons[i].closest('.input-wrapper').querySelectorAll('.input-field__input');
		for(let i = 0; i < inputs.length; i++) {
			inputs[i].value = '';
		}
	});
}
