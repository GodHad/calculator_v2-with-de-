function calculate(){
	const activity = input.get('activity_1').index().val();
	const weight = input.get('weight').gt(0).val();
	const minutes = +input.get('duration_minutes').val();
	const hours = +input.get('duration_hours').val();
	if(!input.valid()) return;
	const duration = minutes + (hours * 60);
	let caloriesPerMinute = 0;
	switch (activity) {
		case 0:
			caloriesPerMinute = 0.044875 * weight;
			break;
		case 1:
			caloriesPerMinute = 0.172125 * weight;
			break;
		case 2:
			caloriesPerMinute = 0.168 * weight;
			break;
	}

	let caloriesBurned = caloriesPerMinute * duration;
	output.val(caloriesBurned.toFixed(0) + ' calories').set('result');
}

function calculateByDistance() {
	const activity = input.get('activity_2').index().val();
	const weight = input.get('weight_2').gt(0).val();
	let speed = input.get('speed').index().val();
	const distance = input.get('distance').gt(0).val();
	if(!input.valid()) return;
	let walkingSlow = 0.0344875;
	let walkingModerate = 0.044875;
	let walkingFast = 0.063125;
	let walkingVeryFast = 0.07735;

	let runningSlow = 0.13435;
	let runningModerate = 0.172125;
	let runningFast = 0.209925;
	let runningVeryFast = 0.2665125;

	let cyclingSlow = 0.13435;
	let cyclingModerate = 0.168;
	let cyclingFast = 0.201525;
	let cyclingVeryFast = 0.2771;
	let caloriesPerMinute = 0;
	let speedMPH = 0;
	switch(activity) {
		case 0:
			if(speed === 0){
				caloriesPerMinute = walkingSlow * weight;
				speedMPH = 2;
			}
			else if(speed === 1){
				caloriesPerMinute = walkingModerate * weight;
				speedMPH = 2.8;
			}
			else if(speed === 2){
				caloriesPerMinute = walkingFast * weight;
				speedMPH = 3.5;
			}
			else if(speed === 3){
				caloriesPerMinute = walkingVeryFast * weight;
				speedMPH = 4;
			}
			break;
		case 1:
			if(speed === 0){
				caloriesPerMinute = runningSlow * weight;
				speedMPH = 5;
			}
			else if(speed === 1){
				caloriesPerMinute = runningModerate * weight;
				speedMPH = 6;
			}
			else if(speed === 2){
				caloriesPerMinute = runningFast * weight;
				speedMPH = 7.5;
			}
			else if(speed === 3){
				caloriesPerMinute = runningVeryFast * weight;
				speedMPH = 10;
			}
			break;
		case 2:
			if(speed === 0){
				caloriesPerMinute = cyclingSlow * weight;
				speedMPH = 13;
			}
			else if(speed === 1){
				caloriesPerMinute = cyclingModerate * weight;
				speedMPH = 15;
			}
			else if(speed === 2){
				caloriesPerMinute = cyclingFast * weight;
				speedMPH = 17.5;
			}
			else if(speed === 3){
				caloriesPerMinute = cyclingVeryFast * weight;
				speedMPH = 21;
			}
			break;
	}
	const duration = distance / speedMPH * 60;

	let caloriesBurned = caloriesPerMinute * duration;
	output.val(caloriesBurned.toFixed(0) + ' calories').set('result');
}
