function calculate() {
    const given = input.get('given').raw();
    const value = input.get(given).positive().val();
    const valueUnit = input.get(`system-${given}`).raw();

    if (!input.valid()) return;

    let result;

    switch (given) {
        case 'r':
            result = calculateByRadius(value, valueUnit);
            break;
        case 'a':
            result = calculateByArea(value, valueUnit);
            break;
        case 'c':
            result = calculateByCircumference(value, valueUnit);
            break;
        default:
            result = calculateByDiameter(value, valueUnit);
    }

    $$('.unit').forEach(el => el.innerHTML = valueUnit);

    _('radius').innerHTML = result.r.join(' = ');
    _('diameter').innerHTML = result.d.join(' = ');
    _('circumference').innerHTML = result.c.join(' = ');
    _('area').innerHTML = result.a.join(' = ');
}

function calculateByRadius(r, unit) {
    const d = r * 2;
    const c = 2 * r;
    const a = r * r;

    return {
        r: [r],
        d: [d],
        c: getC(c, unit),
        a: getA(a, unit)
    }
}

function calculateByDiameter(d, unit) {
    const r = d / 2;
    const c = 2 * r;
    const a = r * r;

    return {
        r: [r],
        d: [d],
        c: getC(c, unit),
        a: getA(a, unit)
    }
}

function calculateByArea(a, unit) {
    const r = roundTo(Math.sqrt(a / Math.PI), 2);
    const d = roundTo(r * 2, 2);
    const c = roundTo(2 * r, 2);

    return {
        r: [r],
        d: [d],
        c: getC(c, unit),
        a: [a]
    }
}

function calculateByCircumference(c, unit) {
    const r = roundTo(c / (2 * Math.PI), 2);
    const d = roundTo(r * 2, 2);
    const a = roundTo(r * r, 2);

    return {
        r: [r],
        d: [d],
        c: [c],
        a: getA(a, unit)
    }
}

function getC(c, unit) {
    return [
        `${c} π ${unit}`,
        `${roundTo(c * Math.PI, 2)} ${unit}`
    ]
}

function getA(a, unit) {
    return [
        `${a} π ${unit}<sup>2</sup>`,
        `${roundTo(a * Math.PI, 2)} ${unit}<sup>2</sup>`
    ]
}