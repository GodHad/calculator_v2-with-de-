function calculate(){
	let exams = [];
	let totalWeight = 0;
	for(let i = 0; i < letters.length; i++) {
		const letter = letters[i];
		if( _(`field_${letter}`)) {
			let name = input.get(`exam_${letter}`).optional().raw()
			let grade = input.get(`grade_${letter}`).optional().raw();
			let weight = input.get(`weight_${letter}`).optional().lte(100).val();
			if((isNaN(parseInt(grade)) && !gradeList.includes(grade.toUpperCase())) || grade > 100){
				input.error([`grade_${letter}`], 'Enter valid grade');
			}
			if(grade && weight && (gradeList.includes(grade.toUpperCase())) || !isNaN(parseInt(grade))) {
				totalWeight += Number(weight);
				exams.push({
					name,
					grade,
					weight
				});
			}
			if(totalWeight > 100){
				input.error([`weight_${letter}`], 'Please make sure that the weight inputs are correct.');
			}
		}
	}
	if(!input.valid()) return;
	const isMix = exams.find(x => {
		return isNaN(parseInt(x.grade));
	})
	let numerator = 0;
	let denominator = 0;
	let resultTableHtml = '';
	exams.forEach((x) => {
		let grade = isMix ? convertToGpa(x.grade) : Number(x.grade);
		numerator += (Number(grade) * Number(x.weight));
		denominator += Number(x.weight);
		resultTableHtml += `<tr><td>${x.name}</td><td>${x.grade}</td><td>${x.weight}%</td></tr>`;
	});
	let resultValue = Number((numerator / denominator).toFixed(2));
	let resultLetter = gpaTable.find(x => { return resultValue >= x.gpa; }).letter;
	resultTableHtml += `<tr><td></td><td class="semibold">${resultLetter} (${resultValue})</td><td class="semibold">${totalWeight}%</td></tr>`;
	output.val(resultTableHtml).set('result-table');
}
const gradeList = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
const gpaTable = [
	{
		letter: 'A+',
		points: '100-97',
		gpa: '4.3',
	},
	{
		letter: 'A',
		points: '96-93',
		gpa: '4',
	},
	{
		letter: 'A-',
		points: '92-90',
		gpa: '3.7',
	},
	{
		letter: 'B+',
		points: '89-87',
		gpa: '3.3',
	},
	{
		letter: 'B',
		points: '86-83',
		gpa: '3',
	},
	{
		letter: 'B-',
		points: '82-80',
		gpa: '2.7',
	},			{
		letter: 'C+',
		points: '79-77',
		gpa: '2.3',
	},
	{
		letter: 'C',
		points: '76-73',
		gpa: '2',
	},
	{
		letter: 'C-',
		points: '72-70',
		gpa: '1.7',
	},
	{
		letter: 'D+',
		points: '69-67',
		gpa: '1.3',
	},
	{
		letter: 'D',
		points: '66-63',
		gpa: '1',
	},
	{
		letter: 'D-',
		points: '62-60',
		gpa: '0.7',
	},
	{
		letter: 'F',
		points: '59-0',
		gpa: '0',
	},
];

function convertToGpa(value){
	if(!value) return;
	if(!isNaN(parseInt(value))) {
		value = Number(value).toFixed();
		const result = gpaTable.find((x) => {
			let range = x.points.split('-');
			return (value <= parseFloat(range[0]) && value >= parseFloat(range[1]));
		});
		if(!result) {
			return;
		}
		return result.gpa;
	}
	else {
		if(!gradeList.includes(value.toUpperCase())){
			return;
		}
		return gpaTable.find((x) => {
			return x.letter === value.toUpperCase();
		}).gpa;
	}
}

function calculateFinalGradeFunction() {
	let currentGrade = input.get('current_grade').raw();
	const wantGrade = input.get('want_grade').raw();
	const finalWorth = input.get('final_worth').lte(100).val();
	if(!input.valid()) return;
	if((isNaN(parseInt(currentGrade)) && !gradeList.includes(currentGrade.toUpperCase())) || currentGrade > 100){
		input.error(['current_grade'], 'Enter valid grade');
	}
	if((isNaN(parseInt(wantGrade)) && !gradeList.includes(wantGrade.toUpperCase())) || wantGrade > 100){
		input.error(['want_grade'], 'Enter valid grade');
	}
	const isMix = isNaN(parseInt(currentGrade)) || isNaN(parseInt(wantGrade));
	currentGrade = isMix ? convertToGpa(currentGrade) : currentGrade;
	const diff = calculateFinalGrade(wantGrade, currentGrade, (100 - finalWorth), isMix);

	if(diff){
		let zeroText = isNaN(parseInt(diff)) ? 'F' : 0;
		let hundredText = isNaN(parseInt(diff)) ? 'A+' : 100;
		if(diff === '>100') {
			output.val('It is not possible to ensure a final <b>grade of {A}</b> even if a {A+} is attained for the remaining {99}% of tasks.').replace('{A}', wantGrade.toUpperCase()).replace('{A+}', hundredText).replace('{99}', finalWorth).set('final-grade-result');
		}
		else if(diff === '<0' || diff === 'F') {
			output.val('A final grade of {A} will be obtained even if {F} is attained for the remaining {99}% of tasks.').replace('{A}', wantGrade.toUpperCase()).replace('{F}', zeroText).replace('{99}', finalWorth).set('final-grade-result');
		}
		else {
			output.val('A <b>grade of {71}</b> or higher is needed for the remaining {99}% of tasks to ensure a final grade of {A}.').replace('{71}', diff).replace('{A}', wantGrade.toUpperCase()).replace('{99}', finalWorth).set('final-grade-result');
		}
	}
}

function getLetterFromGpa(gpa){
	const result = gpaTable.find(x => { return gpa >= x.gpa; });
	if(!result) {
		return;
	}
	return result.letter;
}

function calculateFinalGrade(required, current, weight, isMix = false){
	const requiredIsLetter = isNaN(parseInt(required));
	if(isNaN(parseInt(required)) || isMix){
		required = convertToGpa(required);
		if(!isMix) {
			current = convertToGpa(current);
		}
	}

	const result = (required - current * (weight) / 100) / ((100 - weight) / 100).toFixed(2);
	if(requiredIsLetter || isMix) {
		if(result > 4.3) {
			return '>100';
		}
	}
	else {
		if(result > 100) {
			return '>100';
		}
	}
	if(result < 0) {
		return '<0';
	}
	return (isMix || isNaN(parseInt(required))) ? getLetterFromGpa(result) : Number(result.toFixed(2));
}
