window.firstDay = new Date(2023, 9, 4);
window.firstMonthDate = new Date(2023, 9, 1);
window.cyclesLength = 28;
window.lastPeriodLength = 5;

function calculate(){
	const firstDay = input.get('first_day').date().raw();
	let lastPeriodLength = input.get('last_period_length').index().val();
	let cyclesLength = input.get('avg_cycles_length').index().val();
	if(!input.valid()) return;
	cyclesLength = cyclesLength + 22;
	lastPeriodLength = lastPeriodLength + 1;
	let firstMonthDate = new Date(firstDay);
	firstMonthDate.setDate(1);
	window.firstMonthDate = firstMonthDate;

	window.firstDay = firstDay;
	window.cyclesLength = cyclesLength;
	window.lastPeriodLength = lastPeriodLength;
	showCalendars();
	let estimationTable = '';
	for(let i = 1; i <= 6; i++){
		let date = new Date(firstDay);
		date.setDate(date.getDate() + (cyclesLength * (i - 1)));
		let endPeriodDate = new Date(date);
		endPeriodDate.setDate(endPeriodDate.getDate() + lastPeriodLength);
		let ovulationWin = calculateOvulationWindow(cyclesLength, date);
		estimationTable += `<tr>
		<td class="text-center">${i}</td>
		<td class="short">${formattedDate(date, false, true)} - ${formattedDate(endPeriodDate, false, true)}</td>
		<td class="short">${formattedDate(ovulationWin[0], false, true)} - ${formattedDate(ovulationWin[ovulationWin.length - 1], false, true)}</td>
		</tr>`;
	}
	output.val(estimationTable).set('next-6-cycles');
}

function getDatesInMonth(date){
	let periodDays = [];
	let ovulationDays = [];
	const firstDay = window.firstDay;
	const cyclesLength = window.cyclesLength;
	const lastPeriodLength = window.lastPeriodLength;
	let startPeriod = new Date(firstDay);
	let timeDiff = date.getTime() - startPeriod.getTime();
	let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	let periods = Math.floor(diffDays / cyclesLength);
	startPeriod.setDate(startPeriod.getDate() + (cyclesLength * periods));
	let nextPeriod = new Date(startPeriod);
	nextPeriod.setDate(nextPeriod.getDate() + cyclesLength);
	const startOvulationDays = calculateOvulationWindow(cyclesLength, startPeriod);
	const nextOvulationDays = calculateOvulationWindow(cyclesLength, nextPeriod);
	for(let i = 0; i < startOvulationDays.length; i++){
		let ovulationDate = new Date(startOvulationDays[i]);
		if(ovulationDate.getMonth() === date.getMonth()){
			ovulationDays.push(ovulationDate);
		}
	}
	for(let i = 0; i < nextOvulationDays.length; i++){
		let ovulationDate = new Date(nextOvulationDays[i]);
		if(ovulationDate.getMonth() === date.getMonth()){
			ovulationDays.push(ovulationDate);
		}
	}
	for(let i = 0; i < lastPeriodLength; i++){
		let periodDate = new Date(startPeriod);
		let nextPeriodDate = new Date(nextPeriod);
		periodDate.setDate(periodDate.getDate() + i);
		nextPeriodDate.setDate(nextPeriodDate.getDate() + i);
		if(periodDate.getMonth() === date.getMonth()){
			periodDays.push(periodDate);
		}
		if(nextPeriodDate.getMonth() === date.getMonth()){
			periodDays.push(nextPeriodDate);
		}
	}
	return {
		periodDays,
		ovulationDays
	}
}

function showCalendars(){
	for(let i = 0; i < 3; i++){
		let startDate = new Date(window.firstMonthDate);
		startDate.setMonth(startDate.getMonth() + i);
		let dates = getDatesInMonth(startDate);
		generateCalendar(startDate, dates.periodDays, dates.ovulationDays, `result-${i + 1}`);
	}
}

function changeCalendar(action) {
	if(action === 'next'){
		window.firstMonthDate.setMonth(window.firstMonthDate.getMonth() + 3);
	}
	else {
		window.firstMonthDate.setMonth(window.firstMonthDate.getMonth() - 3);
	}
	showCalendars();
}

function getPeriodDays(firstDay, cyclesLength) {
	let result = [];
	for(let i = 0; i < cyclesLength; i++){
		let date = new Date(firstDay);
		date.setDate(date.getDate() + i);
		result.push(date);
	}
	return result;
}

function calculateOvulationWindow(cycleLength, firstDay) {
	cycleLength = Number(cycleLength);
	var result = [];
	var firstDayDate = new Date(firstDay);

	var startDate = new Date(firstDayDate);
	startDate.setDate(firstDayDate.getDate() + (cycleLength - 16));

	var endDate = new Date(firstDayDate);
	result.push(startDate);
	endDate.setDate(firstDayDate.getDate() + (cycleLength - 12));
	for(let i = 1; i < 5; i++){
		let date = new Date(startDate);
		date.setDate(date.getDate() + i);
		result.push(date);
	}
	return result;
}

function formattedDate(date, onlyMonth = false, dayAndMonth = false){
	const monthNames = ["Jan", "Feb", "Marc", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const day = date.getDate();
	const month = monthNames[date.getMonth()]
	const year = date.getFullYear();
	if(dayAndMonth) return month + ' ' + day;
	if(onlyMonth) return month + ' ' + year;
	return month + ' ' + day + ', ' + year;
}

function generateCalendar(date, periodDays, ovulationDays, calendar = 'result-1') {
	const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	const daysInMonthPrev = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

	if (!firstDay) firstDay = 7;

	let activeClass = 'green-cell';

	const $days = $$(`.${calendar} .result-age--days p`);

	let i = 0;
	while (i <= $days.length) {
		if ($days[i]) {
			$days[i].innerHTML = '';
			$days[i].classList.remove('green-cell', 'pink-cell', 'next');
		}
		let day = i - firstDay + 1;
		const $current_month_day = $days[i - 1];
		let currentDate = new Date();
		/*Current month*/
		if (i >= firstDay && i < daysInMonth + firstDay) {
			currentDate = new Date(date.getFullYear(), date.getMonth(), day);
			$current_month_day.innerHTML = day;
			for(let a = 0; a < periodDays.length; a++){
				if(periodDays[a].getDate() === currentDate.getDate()){
					$current_month_day.classList.add('pink-cell');
				}
			}
			for(let a = 0; a < ovulationDays.length; a++){
				if(ovulationDays[a].getDate() === currentDate.getDate()){
					$current_month_day.classList.add('green-cell');
				}
			}
			/*Prev month*/
		} else if (i < firstDay - 1) {
			if ($days[i]) $days[i].innerHTML = '';
			/*Next month*/
		} else if (i >= firstDay) {
			$current_month_day.innerHTML = '';
		}
		i++;
	}

	$(`.${calendar} .date-title--date b`).innerHTML = formattedDate(date, true);
}
