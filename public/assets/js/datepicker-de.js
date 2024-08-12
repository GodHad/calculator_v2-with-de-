document.querySelectorAll('.datepicker_us').forEach((datepicker) => {
	new AirDatepicker(datepicker, {
		dateFormat: 'dd/MM/yyyy',
		autoClose: true,
		onSelect: function(event){
			return updateDate(event.datepicker.$el);
		},
		// visible: true,
		prevHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		nextHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		locale: {
			months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
			monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
			days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
			daysShort: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
			daysMin: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
		},
	});
});

document.querySelectorAll('.datepicker').forEach((datepicker) => {
	new AirDatepicker(datepicker, {
		dateFormat: 'yyyy-MM-dd',
		autoClose: true,
		onSelect: function(event){
			return updateDate(event.datepicker.$el);
		},
		// visible: true,
		prevHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 19L8 12L15 5" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		nextHtml:
			'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5L16 12L9 19" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
		locale: {
			months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
			monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
			days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
			daysShort: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
			daysMin: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
		},
	});
});