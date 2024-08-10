function calculate() {
	let startDate = input.get('start_date').date().raw();
	let endDate = input.get('end_date').date().raw();
	const countHolidays = _('count_holidays').checked;
	if(!input.valid()) return;
	let holidays = [];
	if(countHolidays) {
		for(let i = 0; i < LETTERS.length; i++) {
			const letter = LETTERS[i];
			if(_(`count_month_${letter}`) || _(`count_day_${letter}`)) {
				let holiday = input.get(`count_holiday_${letter}`).optional().raw()
				let month = input.get(`count_month_${letter}`).optional().lte(12).val();
				let day = input.get(`count_day_${letter}`).optional().lte(31).val();
				if(!input.valid()) return;
				if(month && day) {
					holidays.push({
						holiday,
						month,
						day
					});
				}
			}
		}
	}

	let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
	const endCalendarDate = new Date(endDate);
	seconds = Math.abs(seconds);
	if(countHolidays) {
		let holidaysCounted = 0;
		holidays.forEach(holiday => {
			let holidayDate = new Date(endCalendarDate.getFullYear(), holiday.month - 1, holiday.day);
			if(holidayDate.getTime() <= endCalendarDate.getTime() && holidayDate.getTime() >= startDate.getTime()) {
				holidaysCounted++;
			}
		})
		seconds = seconds - (3600 * 24 * holidaysCounted);
		endCalendarDate.setDate(endCalendarDate.getDate() - holidaysCounted);
	}
	let results = [];
	const diff = dateDiff(startDate, endCalendarDate);
	const minutes = seconds / 60;
	const hours = minutes / 60;
	const days = Math.trunc(hours / 24);

	results.unshift(`${setCommas(seconds)} seconds`);
	results.unshift(`${setCommas(minutes)} minutes`);
	results.unshift(`${setCommas(hours)} hours`);
	results.unshift(plural(setCommas(days), 'd'));

	/*Weeks*/
	const weeks = Math.trunc(days / 7);
	const weekRemainDays = days % 7;
	let weekResult = '';
	if (weeks > 0) weekResult = `${plural(setCommas(weeks), 'w')}`;
	if (weeks > 0 && weekRemainDays > 0) weekResult += ` ${plural(weekRemainDays, 'd')}`;

	if (weekResult.length) results.unshift(weekResult);

	/*Months*/
	let monthsResult = '';
	let months = 24 * diff.y + diff.m;
	if (months > 0) monthsResult = `${plural(setCommas(months), 'm')}`;
	if (months > 0 && diff.d > 0) monthsResult += ` ${plural(diff.d, 'd')}`;

	if (monthsResult.length) results.unshift(monthsResult);

	/*Years*/
	let yearsResult = '';
	const years = diff.y;
	if (years > 0) {
		yearsResult = `${plural(diff.y, 'y')} ${plural(diff.m, 'm')} ${plural(diff.w, 'w')} ${plural(diff.d, 'd')}`;
	}
	if (yearsResult.length) results.unshift(yearsResult);
	$('.result-age__text').innerHTML = '<div class="result-text">' + results.join('</div><div class="result-text">or ') + '</div>';
	if(endDate.getTime() < startDate.getTime()) {
		generateCalendar(endDate, endDate, startDate, holidays );
		generateCalendar(startDate, endDate, startDate, holidays,'result-end-date');
	}
	else {
		generateCalendar(startDate, startDate, endDate, holidays );
		generateCalendar(endDate, startDate, endDate, holidays,'result-end-date');
	}

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

function plural(number, label) {
	if(number == 0) return '';
	/*Days*/
	if (label === 'd') return number == 1 ? number + ' day' : number + ' days';

	/*Week*/
	if (label === 'w') return number == 1 ? number + ' week' : number + ' weeks';

	/*Month*/
	if (label === 'm') return number == 1 ? number + ' month' : number + ' months';

	/*Year*/
	if (label === 'y') return number == 1 ? number + ' year' : number + ' years';
}

function setCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function dateDiff(startDate, endDate) {
	const startYear = startDate.getFullYear();
	const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
	const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	let yearDiff = endDate.getFullYear() - startYear;
	let monthDiff = endDate.getMonth() - startDate.getMonth();
	if (monthDiff < 0) {
		yearDiff--;
		monthDiff += 12;
	}
	let dayDiff = endDate.getDate() - startDate.getDate();
	if (dayDiff < 0) {
		if (monthDiff > 0) {
			monthDiff--;
		} else {
			yearDiff--;
			monthDiff = 11;
		}
		dayDiff += daysInMonth[startDate.getMonth()];
	}

	return {
		y: yearDiff,
		m: monthDiff,
		w: Math.trunc(dayDiff / 7),
		d: Math.trunc(dayDiff % 7)
	}
}

function generateCalendar(date, startDate, endDate, holidays = [], calendar = 'result-start-date') {
	const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	const daysInMonthPrev = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

	if (!firstDay) firstDay = 7;

	let activeClass = 'current';

	const $days = $$(`.${calendar} .result-age--days p`);

	let i = 0;
	while (i <= $days.length) {
		if ($days[i]) {
			$days[i].innerHTML = '';
			$days[i].classList.remove('current', 'active', 'current-between', 'holiday');
		}
		let day = i - firstDay + 1;
		const $current_month_day = $days[i - 1];
		const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
		/*Current month*/
		if (i >= firstDay && i < daysInMonth + firstDay) {
			$current_month_day.innerHTML = day;
			$current_month_day.classList.add('active');
			if(holidays.find(holiday => ((holiday.day === day) && (holiday.month === (date.getMonth() + 1))))) {
				$current_month_day.classList.add('holiday');
			}

			if ((day === date.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) || (day === startDate.getDate() && startDate.getMonth() === currentDate.getMonth() && startDate.getFullYear() === currentDate.getFullYear()) || (day === endDate.getDate() && endDate.getMonth() === currentDate.getMonth() && endDate.getFullYear() === currentDate.getFullYear())) {
				$current_month_day.classList.add(activeClass);
			}
			/*Prev month*/
		} else if (i < firstDay - 1) {
			if ($days[i]) $days[i].innerHTML = daysInMonthPrev - firstDay + i + 2;
			if(holidays.find(holiday => ((holiday.day === (daysInMonthPrev - firstDay + i + 2)) && (holiday.month === (date.getMonth()))))) {
				$days[i].classList.add('holiday');
			}
			/*Next month*/
		} else if (i >= firstDay) {
			if(holidays.find(holiday => ((holiday.day === (i - daysInMonth - firstDay + 1)) && (holiday.month === (date.getMonth() + 2))))) {
				$current_month_day.classList.add('holiday');
			}
			$current_month_day.innerHTML = i - daysInMonth - firstDay + 1;
		}
		/*Holidays*/
		if (holidays.length) {

		}
		if(typeof $current_month_day !== 'undefined' && currentDate.getTime() >= startDate.getTime() && currentDate.getTime() < endDate.getTime() && day !== date.getDate()) {
			$current_month_day.classList.add('current-between');
		}
		i++;
	}

	$(`.${calendar} .date-title--date`).innerHTML = convertDateToDMY(date);
}

function convertDateToDMY(date) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();

	return `${day} ${months[monthIndex]} ${year}`;
}


function convert(){
	let startDate = input.get('start_date_two').date().raw();
	// let endDate = input.get('end_date').date().raw();
	const years = input.get('years').val();
	const months = input.get('months').val();
	const weeks = input.get('weeks').val();
	const days = input.get('days').val();
	const addSubtract = input.get('add_subtract').raw();
	const excludeHolidays = _('exclude_holidays').checked;
	if(!input.valid()) return;
	let holidays = [];
	if(excludeHolidays) {
		for(let i = 0; i < LETTERS.length; i++){
			const letter = LETTERS[i];
			if(_(`exclude_month_${letter}`) || _(`exclude_day_${letter}`)){
				let holiday = input.get(`exclude_holiday_${letter}`).optional().raw()
				let month = input.get(`exclude_month_${letter}`).optional().lte(12).val();
				let day = input.get(`exclude_day_${letter}`).optional().lte(31).val();
				if(!input.valid()) return;
				if(month && day){
					holidays.push({
						holiday,
						month,
						day
					});
				}
			}
		}
	}
	let totalDays = weeks * 7 + days;

	let endDate = new Date(startDate.getFullYear() - years, startDate.getMonth() - months, startDate.getDate() - totalDays);
	if(addSubtract === 'add') {
		endDate = new Date(startDate.getFullYear() + years, startDate.getMonth() + months, startDate.getDate() + totalDays);
	}
	let holidaysCounted = 0;
	if(excludeHolidays) {
		holidays.forEach(holiday => {
			let holidayDate = new Date(endDate.getFullYear(), holiday.month - 1, holiday.day);
			if(addSubtract === 'subtract') {
				holidayDate = new Date(startDate.getFullYear(), holiday.month - 1, holiday.day);
				if(holidayDate.getTime() <= startDate.getTime() && holidayDate.getTime() >= endDate.getTime()) {
					holidaysCounted++;
				}
			}
			else {
				if(holidayDate.getTime() <= endDate.getTime() && holidayDate.getTime() >= startDate.getTime()) {
					holidaysCounted++;
				}
			}

		})
	}
	if(addSubtract === 'add') {
		endDate.setDate(endDate.getDate() + holidaysCounted);
		generateCalendar(startDate, startDate, endDate, holidays, 'result-start-date-2' );
		generateCalendar(endDate, startDate, endDate, holidays,'result-end-date-2');
	}
	else {
		endDate.setDate(endDate.getDate() - holidaysCounted);
		generateCalendar(endDate, endDate, startDate, holidays, 'result-start-date-2' );
		generateCalendar(startDate, endDate, startDate, holidays,'result-end-date-2');
	}
}
