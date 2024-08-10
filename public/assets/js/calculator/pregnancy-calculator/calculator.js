function calculate() {
	const basedOn = input.get('based_on').index().val();
	const dueDate = input.get('due_date').date().raw();
	const firstDay = input.get('first_day').date().raw();
	let avgCyclesLength = input.get('avg_cycles_length').index().val();
	const ultrasoundDate = input.get('ultrasound_date').date().raw();
	const pregnancyWeeks = input.get('pregnancy_weeks').val();
	const pregnancyDays = input.get('pregnancy_days').val();
	const conceptionDate = input.get('conception_date').date().raw();
	const transferDate = input.get('transfer_date').date().raw();
	let embryoAge = input.get('embryo_age').index().val();
	avgCyclesLength = avgCyclesLength + 22;
	embryoAge = embryoAge + 3;
	if(!input.valid()) return;

	if(basedOn === 0) {
		if(!dueDate) {
			return input.error('due_date', 'Please enter a due date', true);
		}
		else {
			const date = dueDate;
			const startDate = dueDate;
			startDate.setDate(date.getDate() - 280);
			const daysDiff = dateDiff(startDate, new Date());
			showResult(daysDiff);

		}
	}
	else if(basedOn === 1) {
		if(!firstDay) {
			return input.error('first_day', 'Please enter a first day', true);
		}
		else {
			const date = firstDay;
			const startDate = firstDay;
			const cycleDays = Number(avgCyclesLength - 28);
			startDate.setDate(date.getDate() + cycleDays);
			const daysDiff = dateDiff(startDate, new Date());
			showResult(daysDiff);
		}
	}
	else if(basedOn === 2) {
		if(!ultrasoundDate) {
			input.error('ultrasound_date', 'Please enter a ultrasound date');
		}
		if(!pregnancyWeeks) {
			input.error('pregnancy_weeks', 'Please length of pregnancy at the time');
		}
		if(!input.valid()) return;
		const date = ultrasoundDate;
		const days = Number(pregnancyWeeks * 7) + Number(pregnancyDays);
		const startDate = ultrasoundDate;
		startDate.setDate(date.getDate() - days);
		const daysDiff = dateDiff(startDate, new Date());
		showResult(daysDiff);
	}
	else if(basedOn === 3) {
		const date = conceptionDate;
		const startDate = conceptionDate;
		startDate.setDate(date.getDate() - 14);
		const daysDiff = dateDiff(startDate, new Date());
		showResult(daysDiff);
	}
	else if(basedOn === 4) {
		const date = new Date(transferDate);
		const startDate = new Date(transferDate);
		startDate.setDate(date.getDate() - Number(embryoAge) - 14);
		const daysDiff = dateDiff(startDate, new Date());
		showResult(daysDiff);
	}
}

function dateDiff(startingDate, endDate) {
	if(!startingDate || !endDate) {
		return false;
	}
	return Math.floor((endDate.getTime() - startingDate.getTime()) / (1000 * 3600 * 24));
}

function showResult(days){
	if(days < 0 || days > 300) {
		output.val('You probably are not pregnant yet.').set('result')
	}
	else {
		output.val('Week {#23} ({22 weeks} {6 days} or {5 months} {9 days}) of pregnancy.')
			.replace('{#23}', `#${(Math.floor(days / 7) + 1)}`)
			.replace('{22 weeks}', plural(Math.floor(days / 7), 'w'))
			.replace('{6 days}', plural(Math.floor(days % 7), 'd'))
			.replace('{5 months}', plural(Math.floor(days / 30.41), 'm'))
			.replace('{9 days}', plural(Math.floor(days % 30.41), 'd')).set('result')
	}
}

function plural(number, label) {
	/*Days*/
	if(number === 0) return '';

	if (label === 'd') return number === 1 ? number + ' day' : number + ' days';

	/*Week*/
	if (label === 'w') return number === 1 ? number + ' week' : number + ' weeks';

	/*Month*/
	if (label === 'm') return number === 1 ? number + ' month' : number + ' months';

	/*Year*/
	if (label === 'y') return number === 1 ? number + ' year' : number + ' years';

}
