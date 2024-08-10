const OPTION_COUNT_HOLIDAYS = document.querySelector('#option_count_holidays')
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

let countFields = [
	{
		exam: document.querySelector('#exam_a'),
		grade: document.querySelector('#grade_a'),
		weight: document.querySelector('#weight_a'),
		clear: document.querySelector('#clear_a'),
	},
	{
		exam: document.querySelector('#exam_b'),
		grade: document.querySelector('#grade_b'),
		weight: document.querySelector('#weight_b'),
		clear: document.querySelector('#clear_b'),
	},
	{
		exam: document.querySelector('#exam_c'),
		grade: document.querySelector('#grade_c'),
		weight: document.querySelector('#weight_c'),
		clear: document.querySelector('#clear_c'),
	},
	{
		exam: document.querySelector('#exam_d'),
		grade: document.querySelector('#grade_d'),
		weight: document.querySelector('#weight_d'),
		clear: document.querySelector('#clear_d'),
	},
]

function initCountField() {
	for (let i = 0; i < countFields.length; i++){
		let letter = countFields[i].exam.getAttribute('id').replace('exam_', '');
		countFields[i].exam.addEventListener('change', () => addNewCountField(i))
		countFields[i].grade.addEventListener('change', () => addNewCountField(i))
		countFields[i].weight.addEventListener('change', () => addNewCountField(i))
		countFields[i].clear.addEventListener('click', () => deleteCountField(letter))
	}
}

function addNewCountField(key) {
	if(getFilledRows() < countFields.length) return;
	let letter = findEmptyLetter();

	if(!countFields[key + 1]) {
		countFields[key].clear.disabled = false

		const HOLIDAYS = document.createElement('div')
		HOLIDAYS.classList.add('input-wrapper','input-wrapper--grade','row')
		HOLIDAYS.id = `field_${letter}`

		HOLIDAYS.innerHTML = `
			<label class="input col">
				<div class="input-field row">
					<input type="text" class="input-field__input" placeholder="" id="exam_${letter}">
				</div>
			</label>
			<label class="input col">
				<div class="input-field row">
					<input type="text" class="input-field__input" id="grade_${letter}" value="">
				</div>
			</label>
			<label class="input col">
				<div class="input-field row">
					<input type="number" class="input-field__input" id="weight_${letter}" value="">
					<span class="input-field__hint">%</span>
				</div>
			</label>
			<label class="input col">
				<button class="input-field input-field--clear row" id="clear_${letter}" disabled="">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#9CA3AF"></path>
					</svg>
				</button>
			</label>
		`

		OPTION_COUNT_HOLIDAYS.append(HOLIDAYS)

		countFields.push({
			exam: document.querySelector(`#exam_${letter}`),
			grade: document.querySelector(`#grade_${letter}`),
			weight: document.querySelector(`#weight_${letter}`),
			clear: document.querySelector(`#clear_${letter}`),
		})

		initCountField()
	}
}

function deleteCountField(letter) {
	if(countFields.length === 1) return;

	let running_array = countFields.filter(function(obj, index) {
		return obj.exam.getAttribute('id') !== `exam_${letter}`;
	});
	document.querySelector(`#field_${letter}`).remove()

	countFields = running_array;
	initCountField();
}

function findEmptyLetter(){
	for(let i = 0; i < LETTERS.length; i++){
		if(!document.getElementById(`field_${LETTERS[i]}`)){
			return LETTERS[i];
		}
	}
}

function getFilledRows(){
	let filledRows = 0;
	for(let i = 0; i < LETTERS.length; i++){
		if(document.getElementById(`field_${LETTERS[i]}`) && (document.getElementById(`exam_${LETTERS[i]}`).value || document.getElementById(`grade_${LETTERS[i]}`).value || document.getElementById(`weight_${LETTERS[i]}`).value)){
			filledRows++;
		}
	}
	return filledRows;
}

initCountField()
