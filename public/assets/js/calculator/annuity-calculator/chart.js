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
			purple: '#336BFF',
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
			data: [64, 22, 14],
			labels: ['64%', '22%', '14%'],
			backgroundColor: [colors[theme].purple, colors[theme].sky, colors[theme].yellow],
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

		donutBig.data.datasets[0].backgroundColor = [colors[theme].purple, colors[theme].sky, colors[theme].yellow];
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

				let year = Number(tooltipModel.title) * 12;
				let months = year % 12;
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
		labels: [1, 2, 3, 4, 5],
		datasets: [
			{
				data: [110632.01, 121636.14, 133025.42, 144813.32, 157013.8],
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
				label: 'interest',
				data: [3632.01, 7636.14, 12025.42, 16813.32, 22013.8],
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
			{
				label: 'Principal',
				data: [107000, 114000, 121000, 128000, 135000],
				barThickness: window.innerWidth < 1024 ? 14 : 20,
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
				backgroundColor: colors[theme].sky,
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
			chartLoan.data.datasets[2].backgroundColor = colors[theme].sky;
			chartLoan.options.scales.y.grid.color = colors[theme].gridColor;
			chartLoan.options.scales.x.grid.color = colors[theme].gridColor;
			chartLoan.options.scales.y.ticks.color = colors[theme].gridColor;
			chartLoan.options.scales.x.ticks.color = colors[theme].gridColor;
			chartLoan.options.scales.y.border.color = colors[theme].gridColor;
			chartLoan.options.scales.x.border.color = colors[theme].gridColor;
			chartLoan.update()
	}

	window.changeChartData = function(values, values_two, years) {
		donutBig.data.datasets[0].data = values
		donutBig.data.datasets[0].labels = values.map(value => `${value}%`)
		donutBig.update();

		chartLoan.data.labels = years;
		for (let i = 0; i < values_two.length; i++) {
			chartLoan.data.datasets[i].data = values_two[i]
		}

		chartLoan.update()
	}

	switchTheme = [switchThemeLoan, switchThemeDonut]
})