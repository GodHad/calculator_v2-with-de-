// CHART_DONUT_SMALL CHART_LOAN
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

	// DONUT CHART

	let data = [
		{
			data: [28, 72],
			labels: ['28%', '72%'],
			backgroundColor: [colors[theme].purple, colors[theme].yellow],
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

	let donutSmall = new Chart(document.getElementById('chartDonutSmall'), {
		type: 'doughnut',
		data: {
			datasets: data,
		},
		options: options,
		plugins: [customDataLabels],
	});

	let switchThemeDonut = function(theme) {
		donutSmall.destroy()

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

		donutSmall = new Chart(document.getElementById('chartDonutSmall'), {
			type: 'doughnut',
			data: {
				datasets: data,
			},
			options: options,
			plugins: [customDataLabels],
		});

		donutSmall.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].yellow, colors[theme].sky];
		donutSmall.update()
	}

	// LOAN CHART
	let ctx = document.getElementById('chartLoanCard').getContext('2d');

	let yellowGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);

	let purpleGradient = ctx.createLinearGradient(0, 0, 0, 1024);
	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

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
				innerHtml += '<tr><th class="loan-chart__title loan-chart__title--center">' + yearText + monthText + '</th></tr>';

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
		labels: [
			0.08333333333333333,
			0.16666666666666666,
			0.25,
			0.3333333333333333,
			0.4166666666666667,
			0.5,
			0.5833333333333334,
			0.6666666666666666,
			0.75,
			0.8333333333333334,
			0.9166666666666666,
			1,
			1.0833333333333333,
			1.1666666666666667,
			1.25,
			1.3333333333333333,
			1.4166666666666667,
			1.5,
			1.5833333333333333,
			1.6666666666666667,
			1.75,
			1.8333333333333333,
			1.9166666666666667,
			2,
			2.0833333333333335,
			2.1666666666666665,
			2.25,
			2.3333333333333335,
			2.4166666666666665,
			2.5,
			2.5833333333333335,
			2.6666666666666665,
			2.75,
			2.8333333333333335,
			2.9166666666666665,
			3,
			3.0833333333333335,
			3.1666666666666665,
			3.25,
			3.3333333333333335,
			3.4166666666666665,
			3.5,
			3.5833333333333335,
			3.6666666666666665,
			3.75,
			3.8333333333333335,
			3.9166666666666665
		],
		datasets: [
			{
				data: [
					9850,
					9697.75,
					9543.22,
					9386.36,
					9227.16,
					9065.57,
					8901.55,
					8735.07,
					8566.1,
					8394.59,
					8220.51,
					8043.82,
					7864.48,
					7682.44,
					7497.68,
					7310.14,
					7119.8,
					6926.59,
					6730.49,
					6531.45,
					6329.42,
					6124.36,
					5916.23,
					5704.97,
					5490.55,
					5272.9,
					5052,
					4827.78,
					4600.19,
					4369.2,
					4134.74,
					3896.76,
					3655.21,
					3410.04,
					3161.19,
					2908.6,
					2652.23,
					2392.02,
					2127.9,
					1859.82,
					1587.71,
					1311.53,
					1031.2,
					746.67,
					457.87,
					164.74,
					0
				],
				type: 'line',
				order: 1,
				label: 'Balance',
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stacked: true,
				borderColor: colors[theme].sky,
				backgroundColor: yellowGradient,
				fill: true,
			},
			{
				label: 'interest',
				data: [
					150,
					297.75,
					443.22,
					586.36,
					727.16,
					865.57,
					1001.55,
					1135.07,
					1266.1,
					1394.59,
					1520.51,
					1643.82,
					1764.48,
					1882.44,
					1997.68,
					2110.14,
					2219.8,
					2326.59,
					2430.49,
					2531.45,
					2629.42,
					2724.36,
					2816.23,
					2904.97,
					2990.55,
					3072.9,
					3152,
					3227.78,
					3300.19,
					3369.2,
					3434.74,
					3496.76,
					3555.21,
					3610.04,
					3661.19,
					3708.6,
					3752.23,
					3792.02,
					3827.9,
					3859.82,
					3887.71,
					3911.53,
					3931.2,
					3946.67,
					3957.87,
					3964.74,
					3967.21
				],
				type: 'line',
				order: 1,
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				stack: 'combined',
				stacked: true,
				borderColor: colors[theme].purple,
				backgroundColor: purpleGradient,
				fill: true,
			},
		],
	};

	let chartLoanCard = new Chart(document.getElementById('chartLoanCard'), {
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
						stepSize: 1000,
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

	let switchThemeLoanCard = function(theme) {
		yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
		yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
		purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
		purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);

		chartLoanCard.data.datasets[0].backgroundColor = yellowGradient;
		chartLoanCard.data.datasets[1].backgroundColor = purpleGradient;
		chartLoanCard.data.datasets[0].borderColor = colors[theme].sky;
		chartLoanCard.data.datasets[1].borderColor = colors[theme].purple;
		chartLoanCard.options.scales.y.grid.color = colors[theme].gridColor;
		chartLoanCard.options.scales.x.grid.color = colors[theme].gridColor;
		chartLoanCard.options.scales.y.ticks.color = colors[theme].gridColor;
		chartLoanCard.options.scales.x.ticks.color = colors[theme].gridColor;
		chartLoanCard.options.scales.y.border.color = colors[theme].gridColor;
		chartLoanCard.options.scales.x.border.color = colors[theme].gridColor;
		chartLoanCard.update()
	}

	window.changeChartData = function(values, values_two) {
		donutSmall.data.datasets[0].data = values
		donutSmall.data.datasets[0].labels = values.map(value => `${value}%`)
		donutSmall.update()

		chartLoanCard.data.labels = values_two[0]
		chartLoanCard.data.datasets[0].data = values_two[1]
		chartLoanCard.data.datasets[1].data = values_two[2]
		chartLoanCard.update()
	}

	switchTheme = [switchThemeLoanCard, switchThemeDonut]
})
