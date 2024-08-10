function calculate() {
    const numbers = input.get('data_set').split(/[ ,]+/).numbers().vals();
    if(!Array.isArray(numbers) || numbers.length < 2)
        input.error('data_set', 'Please provide at least two numbers.');
    if(!input.valid()) return;

    const sum = numbers.reduce((partialSum, a) => partialSum + a, 0);
    const length = numbers.length;

    _('count').innerHTML = roundTo(length);
    _('sum').innerHTML = roundTo(sum);
    _('result').innerHTML = roundTo(sum / length);
}