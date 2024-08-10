function calculate() {
	let numbers = input.get('number').raw();

	let number = numbers;
	let roman = numbers;
	if(isNaN(numbers)){
		numbers = numbers.toUpperCase();
		let result = fromRoman(numbers);
		for (let i = 0; i < numbers.length; i++) {
			if(numbers[i] !== '_' && numbers[i] !== 'I' && numbers[i] !== 'V' && numbers[i] !== 'X' && numbers[i] !== 'L' && numbers[i] !== 'C' && numbers[i] !== 'D' && numbers[i] !== 'M'){
				result = false;
			}
		}
		if(!result){
			return input.error(['number'], 'Enter a valid Roman Numeral or Integer from 1 to 3,999,999', true);
		}
		number = result;
	}
	else {
		const result = toRoman(numbers);

		if(!numbers || !result || numbers >= 4000000){
			return input.error(['number'], 'Enter a valid Roman Numeral or Integer from 1 to 3,999,999', true);
		}
		roman = result.join('').toString();
	}

	_('result-int').innerHTML = formatedResult(number);
	_('result-roman').innerHTML = formatedResult(roman);
}

function fromRoman(str) {
	str = str.toUpperCase();
	const romanToDecimal = {
		Y: 1000000,
		SY: 900000,
		T: 500000,
		ST: 400000,
		S: 100000,
		QS: 90000,
		R: 50000,
		QR: 40000,
		Q: 10000,
		OQ: 9000,
		P: 5000,
		OP: 4000,
		O: 1000,
		M: 1000,
		CM: 900,
		D: 500,
		CD: 400,
		C: 100,
		XC: 90,
		L: 50,
		XL: 40,
		X: 10,
		IX: 9,
		V: 5,
		IV: 4,
		I: 1
	};
	const mapObj = {
		_I: 'O',
		_I_V: 'OP',
		_V: 'P',
		_I_X: 'OQ',
		_X: 'Q',
		_X_L: 'QR',
		_L: 'R',
		_X_C: 'QS',
		_C: 'S',
		_C_D: 'ST',
		_D: 'T',
		_C_M: 'SY',
		_M: 'Y',
	};

	str = str.replace(/_I|_I_V|_V|_I_X|_X|_X_L|_L|_X_C|_C|_C_D|_D|_C_M|_M/gi, matched => mapObj[matched]);
	let result = 0;

	for (let i = 0; i < str.length; i++) {
		let current = str[i];

		let next = str[i+1];
		if (romanToDecimal[current] < romanToDecimal[next]) {
			if((romanToDecimal[current] * 5) !== romanToDecimal[next] && (romanToDecimal[current] * 10) !== romanToDecimal[next]){
				return false;
			}
			result += romanToDecimal[next] - romanToDecimal[current];
			i++;
		}
		else {
			result += romanToDecimal[current];
		}
	}

	return result;
}

function toRoman(num) {
	let result = [];

	for (let i = 0; i < decimal.length; i++) {

		while (decimal[i] <= num) {
			result.push(roman[i]);
			num -= decimal[i];
		}
	}
	return result;
}

function formatedResult(str) {
	if(isNaN(str)){
		str = str.toString();
		const mapObj = {
			_I: '<span class="overline">I</span>',
			_V: '<span class="overline">V</span>',
			_X: '<span class="overline">X</span>',
			_L: '<span class="overline">L</span>',
			_C: '<span class="overline">C</span>',
			_D: '<span class="overline">D</span>',
			_M: '<span class="overline">M</span>',
		};
		return str.replace(/_I|_V|_X|_L|_C|_D|_M/gi, matched => mapObj[matched]);
	}
	else {
		return numberWithCommas(str);
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const roman = ['_M', '_C_M', '_D', '_C_D', '_C', '_X_C', '_L', '_X_L', '_X', '_I_X', '_V', '_I_V', 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
const decimal = [1000000, 900000, 500000, 400000, 100000, 90000, 50000, 40000, 10000, 9000, 5000, 4000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
