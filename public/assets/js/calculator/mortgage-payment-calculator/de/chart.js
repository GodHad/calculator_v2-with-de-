// CHART_LOAN
'use strict'

let switchTheme = null;
let theme = 'light';
if (localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) theme = 'dark';

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
		textColor: '#fff',
		yellowGradientStart: 'rgba(146, 123, 67, 0.23)',
		purpleGradientStart: 'rgba(78, 55, 144, 0.11)',
		skyGradientStart: 'rgba(56, 187, 248, 0.16)',
		tealGradientStart: 'rgba(56, 248, 222, 0.16)',
		yellowGradientStop: 'rgba(250, 219, 139, 0)',
		skyGradientStop: 'rgba(56, 248, 222, 0.16)',
		purpleGradientStop: 'rgba(104, 56, 248, 0)',
		gridColor: '#162B64',
		tooltipBackground: '#1C3782',
		fractionColor: '#41467D',
	},
};

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
	external: function(context){
		let tooltipEl = document.getElementById('chartjs-tooltip');

		// Create element on first render
		if(!tooltipEl){
			tooltipEl = document.createElement('div');
			tooltipEl.id = 'chartjs-tooltip';
			tooltipEl.innerHTML = '<table></table>';
			document.body.appendChild(tooltipEl);
		}

		// Hide if no tooltip
		const tooltipModel = context.tooltip;
		if(tooltipModel.opacity === 0){
			tooltipEl.style.opacity = 0;
			return;
		}

		// Set caret Position
		tooltipEl.classList.remove('above', 'below', 'no-transform');
		if(tooltipModel.yAlign){
			tooltipEl.classList.add(tooltipModel.yAlign);
		}
		else {
			tooltipEl.classList.add('no-transform');
		}

		function getBody(bodyItem){
			return bodyItem.lines;
		}

		if(tooltipModel.body){
			const bodyLines = tooltipModel.body.map(getBody);

			let innerHtml = '<thead>';

			let year = +(Number(tooltipModel.title) * 12).toFixed(0);
			let months = +(year % 12).toFixed(0);
			let yearText = `Jahr ${(year - months) / 12}`;
			let monthText = months === 0 ? '' : `, Monat ${months}`;
			innerHtml += '<tr><th class="loan-chart__title">' + yearText + monthText + '</th></tr>';

			innerHtml += '</thead><tbody>';
			bodyLines.forEach(function(body, i){
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
	labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
	datasets: [
		{
			data: [277151, 272362.88, 267241.37, 261763.27, 255903.73, 249636.21, 242932.29, 235761.59, 228091.61, 219887.59, 211112.33, 201726.08, 191686.28, 180947.42, 169460.85, 157174.49, 144032.65, 129975.77, 114940.15, 98857.62, 81655.3, 63255.22, 43573.97, 22522.37, 4.98],
			type: 'line',
			order: 1,
			label: 'Kontostand',
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
			label: 'Zinsen',
			data: [
				18873.05,
				37434.41,
				55662.38,
				73533.75,
				91023.7,
				108105.65,
				124751.21,
				140930,
				156609.5,
				171754.95,
				186329.18,
				200292.4,
				213602.08,
				226212.71,
				238075.61,
				249138.73,
				259346.37,
				268638.98,
				276952.83,
				284219.78,
				290366.94,
				295316.34,
				298984.58,
				301282.45,
				302114.55
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
			data: [
				4476.43,
				9264.55,
				14386.06,
				19864.17,
				25723.7,
				31991.23,
				38695.15,
				45865.84,
				53535.82,
				61739.85,
				70515.1,
				79901.36,
				89941.16,
				100680.01,
				112166.59,
				124452.95,
				137594.79,
				151651.66,
				166687.29,
				182769.82,
				199972.14,
				218372.22,
				238053.46,
				259105.07,
				281622.45
			],
			type: 'line',
			order: 1,
			label: 'Darlehensbetrag',
			pointHoverBackgroundColor: '#FFFFFF',
			pointHoverBorderWidth: 2,
			pointHoverRadius: 6,
			pointHoverBorderColor: '#5045E5',
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
					autoSkip: false
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

switchTheme = function(theme){
	yellowGradient.addColorStop(0, colors[theme].yellowGradientStart);
	yellowGradient.addColorStop(1, colors[theme].yellowGradientStop);
	purpleGradient.addColorStop(0, colors[theme].purpleGradientStart);
	purpleGradient.addColorStop(1, colors[theme].purpleGradientStop);
	chartLoan.data.datasets[0].backgroundColor = yellowGradient;
	chartLoan.data.datasets[0].borderColor = colors[theme].yellow;
	chartLoan.data.datasets[1].backgroundColor = purpleGradient;
	chartLoan.data.datasets[1].borderColor = colors[theme].purple;
	chartLoan.data.datasets[2].borderColor = colors[theme].sky;
	chartLoan.data.datasets[2].backgroundColor = skyGradient;
	chartLoan.options.scales.y.grid.color = colors[theme].gridColor;
	chartLoan.options.scales.x.grid.color = colors[theme].gridColor;
	chartLoan.options.scales.y.ticks.color = colors[theme].gridColor;
	chartLoan.options.scales.x.ticks.color = colors[theme].gridColor;
	chartLoan.options.scales.y.border.color = colors[theme].gridColor;
	chartLoan.options.scales.x.border.color = colors[theme].gridColor;
	chartLoan.update()
}

window.changeChartData = function(values){
	chartLoan.data.labels = values[0]
	chartLoan.data.datasets[0].data = values[1]
	chartLoan.data.datasets[1].data = values[2]
	chartLoan.data.datasets[2].data = values[3]
	chartLoan.update()
}
