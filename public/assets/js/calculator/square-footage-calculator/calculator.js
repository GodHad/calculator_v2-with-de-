function calculateSquare() {
	const length_a = input.get('length_a').number().val();
	const width_a = input.get('width_a').number().val();

	if (!input.valid()) return;

	fillResults(convertSquareMeters(length_a * width_a));
}

function calculateSquareWithBorders() {
	const length = input.get('length_b').number().val();
	const width = input.get('width_b').number().val();
	const borderWidth = input.get('border_b').number().lt('length_b').lt('width_b').val();

	if (!input.valid()) return;

	const totalArea = length * width;
	const innerArea = (length - borderWidth) * (width - borderWidth);

	const squareFootage = totalArea - innerArea;

	fillResults(convertSquareMeters(squareFootage));
}

function calculateRoundFootage() {
	const diameter = input.get('diameter_c').number().val();

	if (!input.valid()) return;

	const radius = diameter / 2;
	const area = Math.PI * Math.pow(radius, 2);

	fillResults(convertSquareMeters(area));
}

function calculateRoundFootageWithBorders() {
	const diameter = input.get('diameter_d').number().val();
	const border = input.get('border_d').number().lt('diameter_d').val();

	if (!input.valid()) return;

	const radius = diameter / 2;
	const innerRadius = radius - border;
	const totalArea = Math.PI * Math.pow(radius, 2);
	const innerArea = Math.PI * Math.pow(innerRadius, 2);

	fillResults(convertSquareMeters(totalArea - innerArea));
}

function calculateTriangleFootage() {
	const a = input.get('a').number().val();
	const b = input.get('b').number().val();
	const c = input.get('c').number().val();

	if (b + c <= a) {
		input.error('a', 'Sum of two sides must be more than the third side');
	}

	if (a + c <= b) {
		input.error('b', 'Sum of two sides must be more than the third side');
	}

	if (a + b <= c) {
		input.error('c', 'Sum of two sides must be more than the third side');
	}

	if(!input.valid()) return;

	const semiPerimeter = (a + b + c) / 2;
	const area = Math.sqrt(
		semiPerimeter *
		(semiPerimeter - a) *
		(semiPerimeter - b) *
		(semiPerimeter - c)
	);

	fillResults(convertSquareMeters(area));
}

function calculateTrapezoidFootage() {
	const a = input.get('trapezoid_a').number().val();
	const b = input.get('trapezoid_b').number().val();
	const h = input.get('trapezoid_h').number().val();

	if (!input.valid()) return;

	fillResults(convertSquareMeters((a + b) / 2 * h));
}

function fillResults(results) {
	const {
		squareMetres,
		squareFeet,
		squareInches,
		squareYards,
		acres,
		hectares,
	} = results;

	const price = calculatePrice(
		{
			squareMetres,
			squareFeet,
			squareInches,
			squareYards,
		}
	);

	_('result_m').innerHTML = squareMetres;
	_('result_ft').innerHTML = squareFeet;
	_('result_acre').innerHTML = acres;
	_('result_in').innerHTML = squareInches;
	_('result_yd').innerHTML = squareYards;
	_('result_ha').innerHTML = hectares;
	_('result_price').innerHTML = price;
}

function convertSquareMeters(areaInSquareCm) {

	const areaInSquareMeters = areaInSquareCm / 10000;

	const squareMetersToSquareFeet = 10.7639;
	const squareMetersToSquareInches = 1550.0031;
	const squareMetersToSquareYards = 1.19599;
	const squareMetersToAcres = 0.000247105;
	const squareMetersToHectares = 0.0001;

	const areaInSquareFeet = areaInSquareMeters * squareMetersToSquareFeet;
	const areaInSquareInches = areaInSquareMeters * squareMetersToSquareInches;
	const areaInSquareYards = areaInSquareMeters * squareMetersToSquareYards;
	const areaInAcres = areaInSquareMeters * squareMetersToAcres;
	const areaInHectares = areaInSquareMeters * squareMetersToHectares;

	return {
		squareMetres: roundTo(areaInSquareMeters),
		squareFeet: roundTo(areaInSquareFeet),
		squareInches: roundTo(areaInSquareInches),
		squareYards: roundTo(areaInSquareYards),
		acres: roundTo(areaInAcres),
		hectares: roundTo(areaInHectares),
	};
}

function calculatePrice(area) {
	const q = input.get('quantity').optional().natural().val();
	const units = input.get('units').raw();
	const price = input.get('price').optional().number().val();
	const price_per = input.get('price_per').raw();

	if (!q || !price) return 0;


	switch (price_per) {
		case 'per square inch':
			area = area.squareInches;
			break;
		case 'per square foot':
			area = area.squareFeet;
			break;
		case 'per square yard':
			area = area.squareYards;
			break;
		default:
			area = area.squareMetres;
	}

	return roundTo(q * price * area);
}
