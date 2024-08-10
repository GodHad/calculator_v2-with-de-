'use strict'

let switchTheme = null;

import("/assets/js/lib/chartjs/chart.js").then((e) => {
	let Chart = e.Chart
	let registerables = e.registerables
	Chart.register(...registerables)
	const weightUnit = isMetricSystem() ? 'kg' : 'lbs';
	const theme = localStorage.getItem('theme') !== 'system' ? localStorage.getItem('theme') : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	const colors = {
		light: {
			purple: '#A78BFA',
			yellow: '#FBBF24',
			sky: '#7DD3FC',
			blue: '#1D4ED8',
			textColor: '#6B7280',
			yellowGradientStart: 'rgba(250, 219, 139, 0.33)',
			purpleGradientStart: 'rgba(104, 56, 248, 0.16)',
			skyGradientStart: 'rgba(56, 187, 248, 0.16)',
			tealGradientStart: 'rgba(56, 248, 222, 0.16)',
			yellowGradientStop: 'rgba(250, 219, 139, 0)',
			purpleGradientStop: 'rgba(104, 56, 248, 0)',
			gridColor: '#DBEAFE',
			tooltipBackground: '#fff',
			fractionColor: '#EDE9FE',
		},
		dark: {
			purple: '#7C3AED',
			yellow: '#D97706',
			sky: '#0284C7',
			blue: '#101E47',
			textColor: '#fff',
			yellowGradientStart: 'rgba(146, 123, 67, 0.23)',
			purpleGradientStart: 'rgba(78, 55, 144, 0.11)',
			skyGradientStart: 'rgba(56, 187, 248, 0.16)',
			tealGradientStart: 'rgba(56, 248, 222, 0.16)',
			yellowGradientStop: 'rgba(250, 219, 139, 0)',
			purpleGradientStop: 'rgba(104, 56, 248, 0)',
			gridColor: '#162B64',
			tooltipBackground: '#1C3782',
			fractionColor: '#41467D',
		},
	};

	let ctx = document.getElementById('chartC150').getContext('2d');

	let purpleGradient = ctx.createLinearGradient(0, 0, 2048, 0);
	purpleGradient.addColorStop(0, 'rgba(152, 96, 250, 0)');
	purpleGradient.addColorStop(1, 'rgba(152, 96, 250, .8)');
	const labels = Array.from(Array(40).keys());
	const dataCharts = {
		labels: labels,
		datasets: [
			{
				label: 'Current Weight',
				data: [{ x: 20, y: 80 }],
				backgroundColor: '#7C3AED',
				borderWidth: 0,
				radius: 6,
				hoverRadius: 8,
				type: 'scatter',
				stacked: true,
				order: 0,
			},
			{
				label: 'Max',
				data: [75,75.1814368,75.3175144,75.4989512,75.680388,75.8164656,75.9979024,76.1793392,76.3154168,76.4968536,76.6782904,76.814368,76.9958048,77.50836376,78.02092272,78.53348168,79.04604064,79.5585996,80.07115856,80.58371752,81.09627648,81.60883544,82.1213944,82.63395335999999,83.14651232,83.65907127999999,84.17163024,84.6841892,85.19674816,85.70930712,86.22186608,86.73442503999999,87.246984,87.75954296,88.27210192,88.78466088,89.29721984,89.8097788,90.32233776,90.83489672],
				borderColor: colors[theme].purple,
				type: 'line',
				fill: '-1',
				order: 1,
				pointHoverRadius: 0,
			},
			{
				label: 'Min',
				data: [75,75.04082328,75.0907184,75.1360776,75.1814368,75.226796,75.2721552,75.2721552,75.3175144,75.3628736,75.4082328,75.453592,75.4989512,75.90264808,76.30634496,76.71004184,77.11373872,77.5174356,77.92113248,78.32482936,78.72852624,79.13222312,79.53592,79.93961688,80.34331376,80.74701064,81.15070752,81.5544044,81.95810128,82.36179816,82.76549504,83.16919192,83.5728888,83.97658568,84.38028256,84.78397944,85.18767632,85.5913732,85.99507008,86.39876696],
				borderColor: colors[theme].purple,
				backgroundColor: purpleGradient,
				type: 'line',
				fill: '-1',
				order: 1,
				pointHoverRadius: 0,
			},
		],
	};

	let chart = new Chart(document.getElementById('chartC150'), {
		data: dataCharts,
		options: {
			stepSize: 1,
			response: true,
			elements: {
				point: {
					radius: 0,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: false,
			},
			interaction: {
				mode: 'index',
				intersect: false,
			},
			scales: {
				y: {
					grid: {
						tickLength: 0,
						color: colors[theme].gridColor,
					},
					ticks: {
						display: false,
						stepSize: 0.5,
					},
					border: {
						color: colors[theme].gridColor,
					},
				},
				x: {
					stacked: false,
					border: {
						color: colors[theme].gridColor,
					},
					ticks: {
						display: false,
						color: colors[theme].gridColor,
						stepSize: 1,
					},
					grid: {
						tickLength: 0,
						color: colors[theme].gridColor,
					},
				},
			},
		},
	});

	switchTheme = function(theme) {
		let y = chart.config.options.scales.y
		let x = chart.config.options.scales.x
		let data = chart.config.data
		y.grid.color = colors[theme].gridColor;
		y.border.color = colors[theme].gridColor;
		x.border.color = colors[theme].gridColor;
		x.grid.color = colors[theme].gridColor;
		x.ticks.color = colors[theme].gridColor;
		data.datasets[1].borderColor = colors[theme].purple;
		data.datasets[2].borderColor = colors[theme].purple;
		chart.update()
	}

	window.changeChartData = function(values) {
		chart.data.datasets[0].data = values[0]
		chart.data.datasets[1].data = values[1]
		chart.data.datasets[2].data = values[2]
		chart.update()
	}

})
