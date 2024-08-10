function calculate() {
    const v1 = input.get('v1').nonZero().val();
    const v2 = input.get('v2').nonZero().val();

    if (!input.valid()) return;

    const change = v2 - v1;
    const percentageChange = roundTo((change / Math.abs(v1)) * 100, 2);

    _('result').innerHTML = percentageChange + "% Zunahme";
}