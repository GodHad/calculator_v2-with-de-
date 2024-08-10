function calculate() {
    const startingPrincipal = input.get('starting_principal').positive().val();
    const annualAddition = input.get('annual_addition').positive().val();
    const monthlyAddition = input.get('monthly_addition').positive().val();
    const addAtEachPeriod = input.get('periods').raw();
    const interestRate = input.get('annual_interest').positive().val();
    const years = input.get('years').positive().val();

    const {endBalance, totalInterest, totalPrincipal, yearly, monthly} = calculateAnnuity({
            startingPrincipal,
            annualAddition,
            monthlyAddition,
            addAtEachPeriod,
            interestRate,
            years
        }
    );

    _('end_balance').innerHTML = currencyFormat(endBalance);
    _('total_principal').innerHTML = currencyFormat(totalPrincipal);
    _('total_interest').innerHTML = currencyFormat(totalInterest);

    const chart1Data = [
        Math.round(startingPrincipal / endBalance * 100),
        Math.round((totalPrincipal - startingPrincipal) / endBalance * 100),
        Math.round(totalInterest / endBalance * 100),
    ];

    const chart2Data1 = [];
    const chart2Data2 = [];
    const chart2Data3 = [];
    const yearsLine = [];
    for (let i = 0; i < yearly.length; i++) {
        chart2Data1.push((yearly[i].endBalance));
        chart2Data2.push((yearly[i].totalInterest));
        chart2Data3.push((yearly[i].totalPrincipal));
        yearsLine.push(i + 1);
    }

    changeChartData(chart1Data, [chart2Data1, chart2Data2, chart2Data3], yearsLine);
    drawYearLabels(yearsLine[0], yearsLine.length);
    drawAnnualSchedule(yearly, 'annual');
    drawAnnualSchedule(monthly, 'monthly', true);
}

function calculateAnnuity(params) {
    const {
        startingPrincipal,
        annualAddition,
        monthlyAddition,
        addAtEachPeriod,
        interestRate,
        years,
    } = params;

    let months = years * 12;
    let endBalance = startingPrincipal;
    let beginBalance = startingPrincipal;
    let totalPrincipal = startingPrincipal;
    let totalInterest = 0;
    let monthly = [];
    let yearly = [];

    const monthlyInterestRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;

    for (let i = 1; i <= months; i++) {

        if (addAtEachPeriod === "End") {
            endBalance *= 1 + monthlyInterestRate;
        }

        const principal = annualAddition / 12 + monthlyAddition;

        beginBalance = endBalance;
        endBalance += principal;
        totalPrincipal += principal;

        if (addAtEachPeriod === "Beginning") {
            endBalance *= 1 + monthlyInterestRate;
        }

        const currentStatistics = {
            beginBalance: roundTo(beginBalance, 2),
            endBalance: roundTo(endBalance, 2),
            totalPrincipal: roundTo(totalPrincipal, 2),
            totalInterest: roundTo(endBalance - totalPrincipal, 2),
        };

        monthly.push(currentStatistics);

        if (i % 12 === 0 || (i % 12 !== 0 && i === months)) {
            yearly.push(currentStatistics);
        }
    }

    totalInterest = endBalance - totalPrincipal;

    return {
        endBalance: roundTo(endBalance, 2),
        totalPrincipal: roundTo(totalPrincipal, 2),
        totalInterest: roundTo(totalInterest, 2),
        monthly: monthly,
        yearly: yearly,
    };
}

function drawYearLabels(first, yearsLine) {
    const years = createChunks(yearsLine);

    clearContainer('chart__legend');

    for (let i = 0; i < years.length; i++) {
        _('chart__legend').insertAdjacentHTML(
            'beforeEnd',
            '<p class="result-text result-text--small">' + years[i] + ' yr</p>'
        );
    }
}

function createChunks(number, maxChunks = 6) {
    const chunks = [0];
    const chunkSize = Math.ceil(number / maxChunks);

    for (let i = 0; i < maxChunks; i++) {
        const chunk = Math.min((i + 1) * chunkSize, number);
        if (!chunks.includes(chunk)) chunks.push(chunk);
    }

    return chunks;
}

function currencyFormat(price) {
    return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function drawAnnualSchedule(data, dataKey, separator = false) {
    const containerName = dataKey + '_result_table';
    clearContainer(containerName);

    for (let i = 0; i < data.length; i++) {
        const currentMonth = i + 1;

        const {beginBalance, endBalance, totalInterest, totalPrincipal} = data[i];
        let lineHtml = '<tr>';
        lineHtml += '<td class="text-center">' + (currentMonth) + '</td>';
        lineHtml += '<td>$' + beginBalance + '</td>';
        lineHtml += '<td>$' + totalInterest + '</td>';
        lineHtml += '<td>$' + totalPrincipal + '</td>';
        lineHtml += '<td>$' + endBalance + '</td>';
        lineHtml += '</tr>';

        if (currentMonth && separator && currentMonth % 12 === 0) {
            lineHtml += '<th class="indigo text-center" colspan="5">Year #' + currentMonth / 12 + ' End</th>';
        }

        _(containerName).insertAdjacentHTML('beforeEnd', lineHtml);
    }
}

function clearContainer(name) {
    const container = _(name);

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}