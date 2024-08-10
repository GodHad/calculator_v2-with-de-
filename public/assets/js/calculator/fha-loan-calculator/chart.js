// CHART_DONUT_BIG CHART_LOAN
'use strict'
let switchTheme = null;

import("/assets/js/lib/chartjs/chart.js").then((e) => {
	let Chart = e.Chart
	let registerables = e.registerables
	Chart.register(...registerables)

	const theme = localStorage.getItem('theme') !== 'system' ? localStorage.getItem('theme') : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	const colors = {
		light: {
			purple: '#A78BFA',
			yellow: '#FBBF24',
			sky: '#7DD3FC',
			blue: '#1D4ED8',
			red: '#F87171',
			green: '#34D399',
			pink: '#F472B6',
			textColor: '#6B7280',
			yellowGradientStart: 'rgba(250, 219, 139, 0.33)',
			purpleGradientStart: 'rgba(104, 56, 248, 0.16)',
			skyGradientStart: 'rgba(56, 187, 248, 0.16)',
			tealGradientStart: 'rgba(56, 248, 222, 0.16)',
			yellowGradientStop: 'rgba(250, 219, 139, 0)',
			purpleGradientStop: 'rgba(104, 56, 248, 0)',
			skyGradientStop: 'rgba(56, 248, 222, 0.16)',
			gridColor: '#DBEAFE',
			tooltipBackground: '#fff',
			fractionColor: '#EDE9FE',
		},
		dark: {
			purple: '#7C3AED',
			yellow: '#D97706',
			sky: '#0284C7',
			blue: '#101E47',
			red: '#F87171',
			green: '#34D399',
			pink: '#F472B6',
			textColor: '#fff',
			yellowGradientStart: 'rgba(146, 123, 67, 0.23)',
			purpleGradientStart: 'rgba(78, 55, 144, 0.11)',
			skyGradientStart: 'rgba(56, 187, 248, 0.16)',
			tealGradientStart: 'rgba(56, 248, 222, 0.16)',
			yellowGradientStop: 'rgba(250, 219, 139, 0)',
			purpleGradientStop: 'rgba(104, 56, 248, 0)',
			skyGradientStop: 'rgba(56, 248, 222, 0.16)',
			gridColor: '#162B64',
			tooltipBackground: '#1C3782',
			fractionColor: '#41467D',
		},
	};

	let data = [
		{
			data: [34, 36, 2, 16, 7, 5],
			labels: ['34%', '36%', '2%', '16%', '7%', '5%'],
			backgroundColor: [colors[theme].yellow, colors[theme].purple, colors[theme].green, colors[theme].sky, colors[theme].red, colors[theme].pink],
			borderColor: '#DDD6FE',
			borderWidth: 0,
		},
	];

	let options = {
		rotation: 0,
		cutout: '37%',
		hover: {mode: null},
		responsive: false,
		layout: {
			padding: 30,
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
			legend: {
				display: false,
			},
		},
	};

	const customDataLabels = {
		id: 'customDataLabel',
		afterDatasetDraw(chart, args, pluginOptions) {
			const {
				ctx,
				data
			} = chart;
			ctx.save();

			data.datasets[0].data.forEach((datapoint, index) => {
				const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
				ctx.textAlign = 'center';
				ctx.font = '14px Inter';
				ctx.fillStyle = '#fff';
				ctx.textBaseline = 'middle';
				let toolTipText = datapoint != '0' ? datapoint + '%' : '';
				ctx.fillText(toolTipText, x, y);
			});
		},
	};

	let donutBig = new Chart(document.getElementById('chartDonutBig'), {
		type: 'doughnut',
		data: {
			datasets: data,
		},
		options: options,
		plugins: [customDataLabels],
	});

	let switchThemeDonut = function(theme) {
		donutBig.destroy()

		const customDataLabels = {
			id: 'customDataLabel',
			afterDatasetDraw(chart, args, pluginOptions) {
				const {
					ctx,
					data,
					chartArea: { top, bottom, left, right, width, height },
				} = chart;
				ctx.save();

				data.datasets[0].data.forEach((datapoint, index) => {
					const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();
					ctx.textAlign = 'center';
					ctx.font = '14px Inter';
					ctx.fillStyle = '#fff';
					ctx.textBaseline = 'middle';
					let toolTipText = datapoint != '0' ? datapoint + '%' : '';
					ctx.fillText(toolTipText, x, y);
				});
			},
		};

		donutBig = new Chart(document.getElementById('chartDonutBig'), {
			type: 'doughnut',
			data: {
				datasets: data,
			},
			options: options,
			plugins: [customDataLabels],
		});

		donutBig.data.datasets[0].backgroundColor = [colors[theme].yellow, colors[theme].purple, colors[theme].green, colors[theme].sky, colors[theme].red, colors[theme].pink];
		donutBig.update()
	}

	// LOAN CHART

	let ctx = document.getElementById('chartLoan').getContext('2d');

	let yellowGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);

	let purpleGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

	let skyGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	skyGradient.addColorStop(0, colors[theme].skyGradientStart);
	skyGradient.addColorStop(1, colors[theme].skyGradientStop);

	let tooltip = {
		enabled: false,
		external: function (context) {
			let tooltipEl = document.getElementById('chartjs-tooltip');

			// Create element on first render
			if (!tooltipEl) {
				tooltipEl = document.createElement('div');
				tooltipEl.id = 'chartjs-tooltip';
				tooltipEl.innerHTML = '<table></table>';
				document.body.appendChild(tooltipEl);
			}

			// Hide if no tooltip
			const tooltipModel = context.tooltip;
			if (tooltipModel.opacity === 0) {
				tooltipEl.style.opacity = 0;
				return;
			}

			// Set caret Position
			tooltipEl.classList.remove('above', 'below', 'no-transform');
			if (tooltipModel.yAlign) {
				tooltipEl.classList.add(tooltipModel.yAlign);
			} else {
				tooltipEl.classList.add('no-transform');
			}

			function getBody(bodyItem) {
				return bodyItem.lines;
			}

			if (tooltipModel.body) {
				const bodyLines = tooltipModel.body.map(getBody);

				let innerHtml = '<thead>';

				let year = +(Number(tooltipModel.title) * 12).toFixed(0);
				let months = +(year % 12).toFixed(0);
				let yearText = `Year ${(year - months) / 12}`;
				let monthText = months === 0 ? '' : `, Month ${months}`;
				innerHtml += '<tr><th class="loan-chart__title">' + yearText + monthText + '</th></tr>';

				innerHtml += '</thead><tbody>';
				bodyLines.forEach(function (body, i) {
					innerHtml += '<tr><td class="loan-chart__text">' + body + '</td></tr>';
				});
				innerHtml += '</tbody>';

				let tableRoot = tooltipEl.querySelector('table');
				tableRoot.innerHTML = innerHtml;
			}

			const position = context.chart.canvas.getBoundingClientRect();

			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 2 + 'px';
			// tooltipEl.style.font = bodyFont.string;
			tooltipEl.classList.add('loan-chart');
		},
	};

	const dataCharts = {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
		datasets: [
			{
				data: [
					289884.12,
					285702.46,
					281284.92,
					276618.2,
					271688.23,
					266480.18,
					260978.35,
					255166.18,
					249026.15,
					242539.78,
					235687.52,
					228448.75,
					220801.65,
					212723.19,
					204189.05,
					195173.51,
					185649.42,
					175588.11,
					164959.25,
					153730.84,
					141869.07,
					129338.19,
					116100.48,
					102116.05,
					87342.8,
					71736.21,
					55249.29,
					37832.38,
					19433.02,
					-4.21
				],
				type: 'line',
				order: 1,
				label: 'Balance',
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stacked: true,
				borderColor: colors[theme].yellow,
				backgroundColor: yellowGradient,
				fill: true,
			},
			{
				label: 'Interest',
				data: [
					16062.54,
					31901.8,
					47505.18,
					62859.38,
					77950.33,
					92763.2,
					107282.29,
					121491.04,
					135371.93,
					148906.48,
					162075.14,
					174857.29,
					187231.11,
					199173.57,
					210660.35,
					221665.73,
					232162.56,
					242122.17,
					251514.23,
					260306.74,
					268465.89,
					275955.93,
					282739.14,
					288775.63,
					294023.3,
					298437.63,
					301971.63,
					304575.64,
					306197.2,
					306780.89
				],
				type: 'line',
				order: 1,
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stacked: true,
				borderColor: colors[theme].purple,
				backgroundColor: purpleGradient,
				fill: true,
			},
			{
				label: 'Principal',
				data: [
					3958.38,
					8140.04,
					12557.58,
					17224.3,
					22154.27,
					27362.32,
					32864.15,
					38676.32,
					44816.35,
					51302.72,
					58154.98,
					65393.75,
					73040.85,
					81119.31,
					89653.45,
					98668.99,
					108193.08,
					118254.39,
					128883.25,
					140111.66,
					151973.43,
					164504.31,
					177742.02,
					191726.45,
					206499.7,
					222106.29,
					238593.21,
					256010.12,
					274409.48,
					293846.71
				],
				type: 'line',
				order: 1,
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stack: 'combined',
				stacked: true,
				borderColor: colors[theme].sky,
				backgroundColor: skyGradient,
				fill: true,
			},
		],
	};

	let chartLoan = new Chart(document.getElementById('chartLoan'), {
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
				tooltip: tooltip,
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
						stepSize: 1,
					},
					border: {
						color: colors[theme].gridColor,
					},
				},
				x: {
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

	let switchThemeLoan = function(theme) {
		yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
		yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
		purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
		purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);
		chartLoan.data.datasets[0].backgroundColor = yellowGradient;
		chartLoan.data.datasets[0].borderColor = colors[theme].yellow;
		chartLoan.data.datasets[1].backgroundColor = purpleGradient;
		chartLoan.data.datasets[1].borderColor = colors[theme].purple;
		chartLoan.data.datasets[2].backgroundColor = skyGradient;
		chartLoan.options.scales.y.grid.color = colors[theme].gridColor;
		chartLoan.options.scales.x.grid.color = colors[theme].gridColor;
		chartLoan.options.scales.y.ticks.color = colors[theme].gridColor;
		chartLoan.options.scales.x.ticks.color = colors[theme].gridColor;
		chartLoan.options.scales.y.border.color = colors[theme].gridColor;
		chartLoan.options.scales.x.border.color = colors[theme].gridColor;
		chartLoan.update()
	}

	window.changeChartData = function(values, values_two) {
		donutBig.data.datasets[0].data = values
		donutBig.data.datasets[0].labels = values.map(value => `${value}%`)
		donutBig.update()

		chartLoan.data.labels = values_two[0]
		chartLoan.data.datasets[0].data = values_two[1]
		chartLoan.data.datasets[1].data = values_two[2]
		chartLoan.data.datasets[2].data = values_two[3]
		chartLoan.update()
	}


	switchTheme = [switchThemeLoan, switchThemeDonut]

})
