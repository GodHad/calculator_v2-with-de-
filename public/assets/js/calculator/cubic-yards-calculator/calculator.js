//We are getting all inputs in cm, so we are calculating them in cubic cm and then converting to desired unit
const units = {
	'meters (m)': 1e-6,
	'inches (in)': 0.0610237,
	'feet\'s (ft)': 3.53147e-5,
	'yards (yd)': 1.30795e-6,
	'millimeters (mm)': 1000,
	'centimeters (cm)': 1,
};

function calculateSquare() {
	const length = input.get('length_a').positive().val();
	const depth = input.get('depth_a').positive().val();
	if (!input.valid()) return;

	const area = length * length;
	const volume = area * depth;

	drawResult(volume);
}

function calculateRectangle() {
	const length = input.get('length_b').positive().val();
	const width = input.get('width_b').positive().val();
	const depth = input.get('depth_b').positive().val();
	if (!input.valid()) return;

	const area = length * width;
	const volume = area * depth;

	drawResult(volume);
}

function calculateRectangleWithBorders() {
	const inner_length = input.get('inner_length_c').positive().val();
	const inner_width = input.get('inner_width_c').positive().val();
	const depth = input.get('depth_c').positive().val();
	const border = input.get('border_c').positive().val();
	if (!input.valid()) return;

	const inner_area = inner_length * inner_width;
	const total_area = (inner_length + 2 * border) * (inner_width + 2 * border);
	const area = total_area - inner_area;
	const volume = area * depth;

	drawResult(volume);
}

function calculateRoundFootage() {
	let diameter = input.get('diameter_d').positive().val();
	const depth = input.get('depth_d').positive().val();
	const depth_d_2 = input.get('depth_d_2').positive().val();

	const inner_diameter = input.get('inner_diameter_d').positive().val();
	const border_d = input.get('border_d').positive().lt('inner_diameter_d').val();

	const area_shape = input.get('area-shape').raw();
	if (!input.valid()) return;

	if (area_shape === 'Circle') {
		const area = Math.PI * Math.pow(diameter / 2, 2);
		const volume = area * depth;
		drawResult(volume);
	} else {
		diameter = inner_diameter + 2 * border_d;
		const inner_area = Math.PI * Math.pow(inner_diameter / 2, 2);
		const total_area = Math.PI * Math.pow(diameter / 2, 2);
		const area = total_area - inner_area;
		const volume = area * depth_d_2;
		drawResult(volume);
	}
}

function calculateRoundFootageWithBorders() {
	let outer_diameter = input.get('outer_diameter_e').positive().val();
	let inner_diameter = input.get('inner_diameter_e').positive().lt('outer_diameter_e').val();
	const depth = input.get('depth_e').positive().val();
	if (!input.valid()) return;

	const inner_area = Math.PI * Math.pow(inner_diameter / 2, 2);
	const total_area = Math.PI * Math.pow(outer_diameter / 2, 2);
	const area = total_area - inner_area;
	const volume = area * depth;
	drawResult(volume);
}

function calculateTriangleFootage() {
	let a = input.get('a').positive().val();
	let b = input.get('b').positive().val();
	let c = input.get('c').positive().val();
	const depth = input.get('depth_f').positive().val();

	if (a >= b + c) {
		input.exception('a', 'Can not be more than sum of two other sides');
		return;
	}
	if (b >= a + c) {
		input.exception('b', 'Can not be more than sum of two other sides');
		return;
	}
	if (c >= a + b) {
		input.exception('c', 'Can not be more than sum of two other sides');
		return;
	}

	if (!input.valid()) return;

	const s = (a + b + c) / 2;
	const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
	const volume = area * depth;
	drawResult(volume);
}

function calculateTrapezoidFootage() {
	let a = input.get('trapezoid_a').positive().val();
	let b = input.get('trapezoid_b').positive().val();
	let h = input.get('trapezoid_h').positive().val();
	const depth = input.get('depth_g').positive().val();
	if (!input.valid()) return;

	const area = (a + b) / 2 * h;
	const volume = area * depth;
	drawResult(volume);
}

function drawResult(volume) {
	const volumes = {
		meter: volume * units['meters (m)'],
		foot: volume * units['feet\'s (ft)'],
		yard: volume * units['yards (yd)'],
	}

	_('result_m').innerHTML = roundTo(volumes.meter);
	_('result_yd').innerHTML = roundTo(volumes.yard);
	_('result_ft').innerHTML = roundTo(volumes.foot);

	calculatePrice(volumes);
}

function calculatePrice(volumes) {
	const quantity = input.get('quantity').positive().val();
	const price = input.get('price').positive().val();
	let price_per = input.get('price_per').raw();
	if (!input.valid()) return;

	price_per = price_per.replace('per cubic ', '');
	const total = price * quantity * volumes[price_per];

	_('result_price').innerHTML = roundTo(total);
}
