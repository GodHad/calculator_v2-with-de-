function convert(){
	const format = input.get('format').raw();
	const letter_case = input.get('letter_case').raw();
	let number = input.get('number').gt(0).val();
	if(!input.valid()) return;

	let result = '';
	number = number.toString();
	const pointIndex = number.indexOf('.');

	if(format === 'words') {
		result = numberToWords(number);
	}
	else if(format === 'currency') {
		if(pointIndex === -1) {
			result = numberToWords(number) + ' ' + plural(number, 'Dollar:Dollar:Dollar:Dollar:Dollar:Dollar', {showNumber: false});
		}
		else {
			const cents = Number(number).toFixed(2).substr(pointIndex + 1);
			result = numberToWords(number.substr(0, pointIndex)) + ' ' + plural(number, 'Dollar:Dollar:Dollar:Dollar:Dollar:Dollar', {showNumber: false}) + ' und ' + numberToWords(cents) + ' ' + plural(cents, 'Cent:Cent:Cent:Cent:Cent:Cent', {showNumber: false});
		}
	}
	else if(format === 'check') {
		if(pointIndex === -1) {
			result = numberToWords(number) + ' und 00/100 ' + plural(number, 'Dollar:Dollar:Dollar:Dollar:Dollar:Dollar', {showNumber: false});
		}
		else {
			result = numberToWords(number.substr(0, pointIndex)) + ' und ' + Number(number).toFixed(2).substr(pointIndex + 1) + '/100 ' + plural(number, 'Dollar:Dollar:Dollar:Dollar:Dollar:Dollar', {showNumber: false});
		}
	}
	switch(letter_case) {
		case "GROSSBUCHSTABEN":
			result = result.toUpperCase();
			break;
		case "Titelkasus":
			result = toTitleCase(result);
			break;
		case "Satzanfang großschreiben":
			result = toSentenceCase(result);
			break;
		case "Kleinbuchstaben":
			result = result.toLowerCase();
			break;
	}
	_('result').innerHTML = result;
}