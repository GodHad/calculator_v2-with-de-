// CHART_DONUT_BIG
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

	let data = [
		{
			data: [30, 70],
			labels: ['30%', '70%'],
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
				data
			} = chart;
			ctx.save();

			data.datasets[0].data.forEach((datapoint, index) => {
				const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

				let textXPosition = x >= 110 ? 'left' : 'right';

				let xLine = x >= 110 ? x + 30 : x - 30;
				let yLine = y >= 110 ? y + 30 : y - 30;

				ctx.font = '14px Inter';
				ctx.textAlign = textXPosition;
				ctx.fillStyle = colors[theme].textColor;
				ctx.textBaseline = 'middle';

				ctx.fillText(`${datapoint}%`, xLine, yLine);
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

					let textXPosition = x >= 110 ? 'left' : 'right';

					let xLine = x >= 110 ? x + 30 : x - 30;
					let yLine = y >= 110 ? y + 30 : y - 30;

					ctx.font = '14px Inter';
					ctx.textAlign = textXPosition;
					ctx.fillStyle = colors[theme].textColor;
					ctx.textBaseline = 'middle';

					ctx.fillText(`${datapoint}%`, xLine, yLine);
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

		donutBig.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].yellow];
		donutBig.update()
	}

	// CHART LOAN SIMPLE

	let ctx = document.getElementById('chartLoanSimple').getContext('2d');

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

			// Set Text
			if (tooltipModel.body) {
				let innerHtml = '<tbody>';

				const bodyLines = tooltipModel.body.map(getBody);

				let year = tooltipModel.title;

				innerHtml += '<tr><th class="chart-tooltip__text chart-tooltip__text--gray">' + year + '</th></tr>';
				// innerHtml += '<tr><td class="chart-tooltip__text"> $' + bodyLines + '</td></tr>';
				innerHtml += '</tbody>';

				let tableRoot = tooltipEl.querySelector('table');
				tableRoot.innerHTML = innerHtml;
			}

			const position = context.chart.canvas.getBoundingClientRect();

			// Display, position, and set styles for font
			tooltipEl.style.opacity = 1;
			tooltipEl.style.position = 'absolute';
			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight / 11 + 'px';
			// tooltipEl.style.font = bodyFont.string;
			tooltipEl.classList.add('loan-chart');
		},
	};

	const dataCharts = {
		labels: ['$553,407', '$1,516,653'],
		datasets: [
			{
				data: [13, 37],
				barThickness: 56,
				max: 2000000,
				type: 'bar',
				order: 1,
				pointHoverBackgroundColor: '#FFFFFF',
				pointHoverBorderWidth: 2,
				pointHoverRadius: 6,
				pointHoverBorderColor: '#5045E5',
				borderRadius: {
					topLeft: 4,
					topRight: 4,
				},
				stacked: true,
				backgroundColor: [colors[theme].yellow, colors[theme].purple],
			},
		],
	};

	let chartLoanSimple = new Chart(document.getElementById('chartLoanSimple'), {
		data: dataCharts,
		options: {
			maintainAspectRatio: false,
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
					max: 50,
					grid: {
						tickLength: 0,
						color: colors[theme].gridColor,
					},
					ticks: {
						display: false,
						stepSize: 10,
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

	switchTheme = function(theme) {
		chartLoanSimple.data.datasets[0].backgroundColor = [colors[theme].yellow, colors[theme].purple];
		chartLoanSimple.options.scales.y.grid.color = colors[theme].gridColor;
		chartLoanSimple.options.scales.x.grid.color = colors[theme].gridColor;
		chartLoanSimple.options.scales.y.ticks.color = colors[theme].gridColor;
		chartLoanSimple.options.scales.x.ticks.color = colors[theme].gridColor;
		chartLoanSimple.options.scales.y.border.color = colors[theme].gridColor;
		chartLoanSimple.options.scales.x.border.color = colors[theme].gridColor;
		chartLoanSimple.update()
	}

	// switchTheme = [switchThemeLoanSimple]

	window.changeChartData = function(values, labels) {
		// donutBig.data.datasets[0].data = values
		// donutBig.data.datasets[0].labels = values.map(value => `${value}%`)
		// donutBig.update()
		chartLoanSimple.data.datasets[0].data = values
		chartLoanSimple.data.labels = labels
		chartLoanSimple.update()
	}

})
