const OPTION_COUNT_HOLIDAYS = document.querySelector('#option_count_holidays > .calculator-content-body')
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

let countFields = [
	{
		holiday: document.querySelector('#count_holiday_a'),
		month: document.querySelector('#count_month_a'),
		day: document.querySelector('#count_day_a'),
		clear: document.querySelector('#count_clear_a'),
	}
]

function initCountField() {
	let letter = LETTERS[countFields.length - 1]
	let key = LETTERS.indexOf(letter)
	countFields[key].holiday.addEventListener('input', () => addNewCountField(key))
	countFields[key].month.addEventListener('input', () => addNewCountField(key))
	countFields[key].day.addEventListener('input', () => addNewCountField(key))
	countFields[key].clear.addEventListener('click', () => deleteCountField(key))
}

function addNewCountField(key) {
	let letter = LETTERS[key + 1]
	if(!countFields[key + 1]) {
		countFields[key].clear.disabled = false

		const HOLIDAYS = document.createElement('div')
		HOLIDAYS.classList.add('input-wrapper','input-wrapper--holidays','row')
		HOLIDAYS.id = `count_field_${letter}`
		
		HOLIDAYS.innerHTML = `
			<label class="input col">
				<div class="input-field row">
					<input type="text" class="input-field__input" placeholder="" id="count_holiday_${letter}">
				</div>
			</label>
			<label class="input col">
				<div class="input-field row">
					<input type="number" class="input-field__input" id="count_month_${letter}" value="">
				</div>
			</label>
			<label class="input col">
				<div class="input-field row">
					<input type="number" class="input-field__input" id="count_day_${letter}" value="">
				</div>
			</label>
			<label class="input col">
				<button class="input-field input-field--clear row" id="count_clear_${letter}" disabled="">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#9CA3AF"></path>
					</svg>
				</button>
			</label>
		`
		
		OPTION_COUNT_HOLIDAYS.append(HOLIDAYS)

		countFields.push({
			holiday: document.querySelector(`#count_holiday_${letter}`),
			month: document.querySelector(`#count_month_${letter}`),
			day: document.querySelector(`#count_day_${letter}`),
			clear: document.querySelector(`#count_clear_${letter}`),
		})

		initCountField()
	}
}

function deleteCountField(key) {
	countFields[countFields.length - 2].clear.disabled = true
	let running_array = [...countFields].splice(key + 1, countFields.length - key - 1)

	running_array.forEach(field => {
		countFields[countFields.indexOf(field) - 1].holiday.value = field.holiday.value
		countFields[countFields.indexOf(field) - 1].month.value = field.month.value
		countFields[countFields.indexOf(field) - 1].day.value = field.day.value
	})

	document.querySelector(`#count_field_${LETTERS[countFields.length - 1]}`).remove()
	countFields.splice(countFields.length - 1, 1)
	
}

initCountField()

const OPTION_EXCLUDE_HOLIDAYS = document.querySelector('#option_exclude_holidays > .calculator-content-body')

let excludeFields = [
	{
		holiday: document.querySelector('#exclude_holiday_a'),
		month: document.querySelector('#exclude_month_a'),
		day: document.querySelector('#exclude_day_a'),
		clear: document.querySelector('#exclude_clear_a'),
	}
]

function initExcludeField() {
	let letter = LETTERS[excludeFields.length - 1]
	let key = LETTERS.indexOf(letter)
	excludeFields[key].holiday.addEventListener('input', () => addNewExcludeField(key))
	excludeFields[key].month.addEventListener('input', () => addNewExcludeField(key))
	excludeFields[key].day.addEventListener('input', () => addNewExcludeField(key))
	excludeFields[key].clear.addEventListener('click', () => deleteExcludeField(key))
}

function addNewExcludeField(key) {
	let letter = LETTERS[key + 1]
	if(!excludeFields[key + 1]) {
		excludeFields[key].clear.disabled = false

		const HOLIDAYS = document.createElement('div')
		HOLIDAYS.classList.add('input-wrapper','input-wrapper--holidays','row')
		HOLIDAYS.id = `exclude_field_${letter}`
		
		HOLIDAYS.innerHTML = `
			<label class="input col">
				<div class="input-field row">
					<input type="text" class="input-field__input" placeholder="" id="exclude_holiday_${letter}">
				</div>
			</label>
			<label class="input col">
				<div class="input-field row">
					<input type="number" class="input-field__input" id="exclude_month_${letter}" value="">
				</div>
			</label>
			<label class="input col">
				<div class="input-field row">
					<input type="number" class="input-field__input" id="exclude_day_${letter}" value="">
				</div>
			</label>
			<label class="input col">
				<button class="input-field input-field--clear row" id="exclude_clear_${letter}" disabled="">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#9CA3AF"></path>
					</svg>
				</button>
			</label>
		`
		
		OPTION_EXCLUDE_HOLIDAYS.append(HOLIDAYS)

		excludeFields.push({
			holiday: document.querySelector(`#exclude_holiday_${letter}`),
			month: document.querySelector(`#exclude_month_${letter}`),
			day: document.querySelector(`#exclude_day_${letter}`),
			clear: document.querySelector(`#exclude_clear_${letter}`),
		})

		initExcludeField()
	}
}

function deleteExcludeField(key) {
	excludeFields[excludeFields.length - 2].clear.disabled = true
	let running_array = [...excludeFields].splice(key + 1, excludeFields.length - key - 1)

	running_array.forEach(field => {
		excludeFields[excludeFields.indexOf(field) - 1].holiday.value = field.holiday.value
		excludeFields[excludeFields.indexOf(field) - 1].month.value = field.month.value
		excludeFields[excludeFields.indexOf(field) - 1].day.value = field.day.value
	})

	document.querySelector(`#exclude_field_${LETTERS[excludeFields.length - 1]}`).remove()
	excludeFields.splice(excludeFields.length - 1, 1)
	
}

initExcludeField()