function calculate(){
	const firstDay = input.get('first_day').date().raw();
	let cyclesLength = input.get('avg_cycles_length').index().val();
	if(!input.valid()) return;
	cyclesLength = cyclesLength + 22;
	const ovulationWindow = calculateOvulationWindow(cyclesLength, firstDay);
	const mostProbableOvulationDay = new Date(ovulationWindow.startDate);
	mostProbableOvulationDay.setDate(mostProbableOvulationDay.getDate() + 2);

	const intercourseDay = new Date(ovulationWindow.startDate);
	intercourseDay.setDate(intercourseDay.getDate() - 3);

	const testDay = new Date(ovulationWindow.endDate);
	testDay.setDate(testDay.getDate() + 7);

	const nextPeriod = new Date(firstDay);
	nextPeriod.setDate(nextPeriod.getDate() + cyclesLength);

	output.val(formattedDate(ovulationWindow.startDate) + ' - ' + formattedDate(ovulationWindow.endDate)).set('ovulation-window');
	output.val(formattedDate(intercourseDay) + ' - ' + formattedDate(ovulationWindow.endDate)).set('intercourse-window');
	output.val(formattedDate(mostProbableOvulationDay)).set('most-probable');
	output.val(formattedDate(testDay)).set('test-day');
	output.val(formattedDate(nextPeriod)).set('next-period');

	let estimationTable = '';
	for(let i = 1; i <= 6; i++){
		let date = new Date(firstDay);
		date.setDate(date.getDate() + (cyclesLength * (i - 1)));
		let ovulationWin = calculateOvulationWindow(cyclesLength, date);
		let dueDate = new Date(date);
		dueDate.setDate(dueDate.getDate() + cyclesLength - 28 + 280);
		estimationTable += `<tr>
		<td>${i}</td>
		<td class="short">${formattedDate(date)}</td>
		<td class="short">${formattedDate(ovulationWin.startDate)} - ${formattedDate(ovulationWin.endDate)}</td>
		<td class="short">${formattedDate(dueDate)}</td>
		</tr>`;
	}

	output.val(estimationTable).set('next-6-cycles');
	generateCalendar(ovulationWindow.startDate, ovulationWindow.startDate, ovulationWindow.endDate);

}

function calculateOvulationWindow(cycleLength, firstDay) {
	cycleLength = Number(cycleLength);

	var firstDayDate = new Date(firstDay);

	var startDate = new Date(firstDayDate);
	startDate.setDate(firstDayDate.getDate() + (cycleLength - 16));

	var endDate = new Date(firstDayDate);
	endDate.setDate(firstDayDate.getDate() + (cycleLength - 12));

	return {
		startDate,
		endDate
	};
}

function formattedDate(date, onlyMonth = false){
	const monthNames = ["Jan", "Feb", "Marc", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const day = date.getDate();
	const month = monthNames[date.getMonth()]
	const year = date.getFullYear();
	if(onlyMonth) return month + ' ' + year;
	return month + ' ' + day + ', ' + year;
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
			$days[i].classList.remove('current', 'active', 'current-between', 'holiday', 'next');
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
			$days[i].classList.add('next');
			if ($days[i]) $days[i].innerHTML = daysInMonthPrev - firstDay + i + 2;
			if(holidays.find(holiday => ((holiday.day === (daysInMonthPrev - firstDay + i + 2)) && (holiday.month === (date.getMonth()))))) {
				$days[i].classList.add('holiday');
			}
			/*Next month*/
		} else if (i >= firstDay) {
			$current_month_day.classList.add('next');
			if(holidays.find(holiday => ((holiday.day === (i - daysInMonth - firstDay + 1)) && (holiday.month === (date.getMonth() + 2))))) {
				$current_month_day.classList.add('holiday');
			}
			$current_month_day.innerHTML = i - daysInMonth - firstDay + 1;
		}
		/*Holidays*/
		if (holidays.length) {

		}
		if(typeof $current_month_day !== 'undefined' && currentDate.getTime() >= startDate.getTime() && currentDate.getTime() < endDate.getTime() && day !== date.getDate() && day !== endDate.getDate()) {
			$current_month_day.classList.add('current-between');
		}
		i++;
	}

	$(`.${calendar} .date-title--date`).innerHTML = formattedDate(date, true);
}
