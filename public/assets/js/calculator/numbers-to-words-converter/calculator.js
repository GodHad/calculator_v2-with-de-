function convert(){
	const format = input.get('format').raw();
	const letter_case = input.get('letter_case').raw();
	let number = input.get('number').gt(0).val();
	if(!input.valid()) return;

	let result = '';
	const dollarsLabel = number > 1 ? 'dollars' : 'dollar';
	number = number.toString();
	const pointIndex = number.indexOf('.');

	if(format === 'words') {
		result = toWords(number);
	}
	else if(format === 'currency') {
		if(pointIndex === -1) {
			result = toWords(number) + ' ' + dollarsLabel;
		}
		else {
			const cents = Number(number).toFixed(2).substr(pointIndex + 1);
			const centsLabel = Number(cents) === 1 ? 'cent' : 'cents';
			result = toWords(number.substr(0, pointIndex)) + ' ' + dollarsLabel + ' and ' + toWords(cents) + ' ' + centsLabel;
		}
	}
	else if(format === 'check') {
		if(pointIndex === -1) {
			result = toWords(number) + ' and 00/100 dollars';
		}
		else {
			result = toWords(number.substr(0, pointIndex)) + ' and ' + Number(number).toFixed(2).substr(pointIndex + 1) + '/100' + ' ' + 'dollars';
		}
	}
	switch(letter_case) {
		case "UPPERCASE":
			result = result.toUpperCase();
			break;
		case "Title Case":
			result = toCapitalize(result);
			break;
		case "Sentence case":
			result = toSentenceCase(result);
			break;
	}
	_('result').innerHTML = result;
}

function toSentenceCase(str){
	const firstLetter = str.substr(0, 1);
	return firstLetter.toUpperCase() + str.substr(1);
}

function toCapitalize(str){
	const arr = str.split(" ");
	for(let i = 0; i < arr.length; i++){
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

	}
	return arr.join(" ");
}

function toWords(s){
	var th = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'];
	var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
	var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	s = s.toString();
	s = s.replace(/[\, ]/g, '');
	if(s != parseFloat(s)) {return 'not a number';}
	var x = s.indexOf('.');
	if(x == -1)
		x = s.length;
	if(x > (th.length * 3))
		return 'too big';
	var n = s.split('');
	var str = '';
	var sk = 0;
	for(var i = 0; i < x; i++){
		if((x - i) % 3 == 2){
			if(n[i] == '1'){
				str += tn[Number(n[i + 1])] + ' ';
				i++;
				sk = 1;
			}
			else if(n[i] != 0){
				if(n[i + 1] && n[i + 1] != 0){
					str += tw[n[i] - 2] + '-';
				}
				else {
					str += tw[n[i] - 2] + ' ';
				}
				sk = 1;
			}
		}
		else if(n[i] != 0){
			str += dg[n[i]] + ' ';
			if((x - i) % 3 == 0) str += 'hundred ';
			sk = 1;
		}
		if((x - i) % 3 == 1){
			if(sk)
				str += th[(x - i - 1) / 3] + ' ';
			sk = 0;
		}
	}

	if(x != s.length){
		s = Number(s).toString();
		str += ' and ' + toWords(s.substr(x + 1)) + ' ' + toWords(Math.pow(10, s.substr(x + 1).length)).replace(/\s+/g, ' ').trim().replace(/(one)|(g)/, '') + 'ths';
	}
	return str.replace(/\s+/g, ' ');
}
