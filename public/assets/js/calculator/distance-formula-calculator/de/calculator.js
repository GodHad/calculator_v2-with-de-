function calculate(){
	const x1 = input.get('x_1').number().val();
	const x2 = input.get('x_2').number().val();
	const y1 = input.get('y_1').number().val();
	const y2 = input.get('y_2').number().val();
	if(!input.valid()) return;

	const d = math.distance([x1, y1], [x2, y2]);
	output.val('d = ' + d).set('result');
}
