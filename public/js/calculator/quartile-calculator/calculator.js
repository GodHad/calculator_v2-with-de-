function calculate() {
    const numbers = input.get('data_set').split(/[ ,]+/).numbers().vals();

    if (!input.valid()) return;

    const {q1, q2, q3, iqr, median, minimum, maximum, range} = quartileCalculator(numbers);

    _('q1').innerHTML = q1;
    _('q2').innerHTML = q2;
    _('q3').innerHTML = q3;
    _('iqr').innerHTML = iqr;
    _('median').innerHTML = median;
    _('min').innerHTML = minimum;
    _('max').innerHTML = maximum;
    _('range').innerHTML = range;
}

function quartileCalculator(numbers) {
    // Sort the array in ascending order
    numbers.sort(function (a, b) {
        return a - b;
    });

    const n = numbers.length;
    const q1Index = Math.floor(n / 4);
    const q2Index = Math.floor(n / 2);
    const q3Index = Math.floor((3 * n) / 4);

    const q1 = n % 2 === 0 ? (numbers[q1Index - 1] + numbers[q1Index]) / 2 : numbers[q1Index];
    const q2 = n % 2 === 0 ? (numbers[q2Index - 1] + numbers[q2Index]) / 2 : numbers[q2Index];
    const q3 = n % 2 === 0 ? (numbers[q3Index - 1] + numbers[q3Index]) / 2 : numbers[q3Index];

    // Calculate additional statistics
    const iqr = q3 - q1;
    const median = q2;
    const minimum = numbers[0];
    const maximum = numbers[numbers.length - 1];
    const range = maximum - minimum;

    return {
        q1: roundTo(q1, 2),
        q2: roundTo(q2, 2),
        q3: roundTo(q3, 2),
        iqr: roundTo(iqr, 2),
        median: roundTo(median, 2),
        minimum: roundTo(minimum, 2),
        maximum: roundTo(maximum, 2),
        range: roundTo(range, 2)
    };
}
