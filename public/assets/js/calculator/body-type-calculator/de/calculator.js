function calculate() {
    const bust = input.get('bust').positive().val();
    const waist = input.get('waist').positive().val();
    const high_hip = input.get('high_hip').positive().val();
    const hip = input.get('hip').positive().val();

    if (!input.valid()) return;

    const bustHips = (bust - hip);
    const hipsBust = (hip - bust);
    const bustWaist = (bust - waist);
    const hipsWaist = (hip - waist);
    const highHipWaist = (high_hip - waist);

    let bodyType = "Sanduhr";
    if (hipsBust >= inchToCm(3.6) &&
        hipsBust < inchToCm(10) &&
        hipsWaist >= inchToCm(9) &&
        highHipWaist < inchToCm(1.193)) bodyType = 'Untere Sanduhr';

    if (bustHips > inchToCm(1) &&
        bustHips < inchToCm(10) &&
        bustWaist >= inchToCm(9)) bodyType = 'Obere Sanduhr';

    if (hipsBust > inchToCm(2) && hipsWaist >= 7 && highHipWaist >= inchToCm(1.193)) bodyType = 'Löffel';

    if (hipsBust >= inchToCm(3.6) && hipsWaist < inchToCm(9)) bodyType = 'Dreieck';

    if (bustHips >= inchToCm(3.6) && bustWaist < inchToCm(9)) bodyType = 'Umgekehrtes Dreieck';

    if (hipsBust < inchToCm(3.6) &&
        bustHips < inchToCm(3.6) &&
        bustWaist < inchToCm(9) &&
        hipsWaist < inchToCm(10)) bodyType = 'Rechteck';

    _('body_type').innerHTML = bodyType;
    _('result').innerHTML = roundTo(waist / hip, 2);
}

function inchToCm(inch) {
    return inch * 2.54;
}