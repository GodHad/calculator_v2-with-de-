function calculate() {
    const v1 = input.get('v1').nonZero().val();
    const v2 = input.get('v2').nonZero().val();

    if (!input.valid()) return;

    _('result').innerHTML = roundTo(((v1 - v2) / Math.abs(v1)) * 100, 2);
}
