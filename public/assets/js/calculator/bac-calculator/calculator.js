function calculate() {
	const weight = input.get('weight').gte(0).val();
	const gender = input.get('gender').raw();
	const hours = input.get('hours').optional().integer().val();
	const minutes = input.get('minutes').optional().integer().val();

	const alcohols = ['beer', 'wine', 'liquor', 'other'];
	let drinks = [];

	alcohols.map(alcohol => {
		let alcoholAmount = input.get(`${alcohol}_amount`).optional().integer().val();
		let alcoholSize = input.get(`${alcohol}_size`).integer().val();
		let alcoholAbv = input.get(`${alcohol}_abv`).optional().replace(/%/, '').val();

		if (alcoholAmount && !alcoholAbv) {
			input.error(`${alcohol}_abv`, 'Please enter the ABV of the alcohol.');
		}

		if (!alcoholAmount && alcoholAbv) {
			input.error(`${alcohol}_amount`, 'Please enter the amount of the alcohol.');
		}

		if (alcoholAmount && alcoholSize && alcoholAbv) {
			drinks.push({
				amount: alcoholAmount * alcoholSize,
				abv: parseFloat(alcoholAbv)
			});
		}
	});

	if (!drinks.length) input.error('beer_amount', 'Please enter the amount of alcohol you have consumed.');

	if (!input.valid()) return;

	const result = calculateBAC(gender, weight, drinks, hours + (minutes / 60));

	_('bac_result').innerHTML = result.bac;
	_('time_result').innerHTML = result.timeToZero;

}

function calculateBAC(gender, weightKg, drinks, time) {
	const r = gender === 'male' ? 0.68 : 0.55;
	let totalAlcohol = 0;

	// calculate total alcohol consumed in grams
	for (const drink of drinks) {
		const amount = drink.amount / 1000;
		const abv = drink.abv / 100;
		totalAlcohol += amount * abv * 789;
	}

	// calculate BAC using Widmark's formula
	const bac = ((totalAlcohol / (r * weightKg)) / 10 - (0.015 * time));

	// calculate time to 0% BAC
	const timeToZero = bac / 0.015;

	return {
		bac: bac.toFixed(3),
		timeToZero: timeToZero.toFixed(1)
	};
}
