function calculate() {
    const type = input.get('type').raw();
    const index = input.get('type').index().raw();
    const a = input.group('number_a_', 'a.b|c.d!0|e.f!0');
    const b = input.group('number_b_', 'a.b');
    const c = input.group('number_c_', 'a.b|c.d');
    const d = input.group('number_d_', 'a+.b+');
    if (!a && index == 0 || !b && index == 1 || !c && index == 2 || !d && index == 3) {
        input.error('error-list', 'Incorrect data');
    }
    if (!input.valid())
        return;
    let result = [];
    switch (type) {
    case 'Allgemeine Phrasen':
        if (a.a != null && a.b != null)
            result.push(`${a.a * a.b / 100} ist ${a.a}% von ${a.b}`);
        if (a.c != null && a.d != null)
            result.push(`${a.c} ist ${a.c / a.d * 100}% von ${a.d}`);
        if (a.e != null && a.f != null)
            result.push(`${a.e} ist ${a.f}% von ${a.e / a.f * 100}`);
        break;
    case 'Einfacher Prozentsatz':
        result.push(`${b.a}% von ${b.b} = ${b.a * b.b / 100}`);
        break;
    case 'Prozentuale Veränderung':
        if (c.a != null && c.b != null)
            result.push(`${c.a} erhöhung ${c.b}% = ${c.a * (1 + c.b / 100)}`);
        if (c.c != null && c.d != null)
            result.push(`${c.c} abnahme ${c.d}% = ${c.c * (1 - c.d / 100)}`);
        break;
    case 'Prozentuale Differenz':
        result.push(`Die Differenz zwischen ${d.a} und ${d.b} beträgt ${math.abs(d.a - d.b) / (d.a + d.b) * 200}%,`);
        result.push(`und ${d.b} ist eine ${math.abs(d.a - d.b) / d.a * 100}%ige Steigerung von ${d.a}`);
        break;
    }
    _('result_' + ['a', 'b', 'c', 'd'][index]).innerHTML = result.join('<br/>');
}
