function calculate() {
    const weight = input.get('weight').gte(0).val(); const gender = input.get('gender').raw(); const hours = input.get('hours').optional().integer().val(); const minutes = input.get('minutes').optional().integer().val(); const alcohols = ['Bier', 'Wein', 'Schnaps', 'andere']; let drinks = []; alcohols.map(alcohol => {
        let alcoholAmount = input.get(`${alcohol}_amount`).optional().integer().val(); let alcoholSize = input.get(`${alcohol}_size`).integer().val(); let alcoholAbv = input.get(`${alcohol}_abv`).optional().replace(/%/, '').val(); if (alcoholAmount && !alcoholAbv) { input.error(`${alcohol}_abv`, 'Geben Sie den ABV des Alkohols ein.'); }
        if (!alcoholAmount && alcoholAbv) { input.error(`${alcohol}_amount`, 'Geben Sie die Menge des Alkohols ein.'); }
        if (alcoholAmount && alcoholSize && alcoholAbv) { drinks.push({ amount: alcoholAmount * alcoholSize, abv: parseFloat(alcoholAbv) }); }
    }); if (!drinks.length) input.error('Bier_amount', 'Geben Sie die Menge des konsumierten Alkohols ein.'); if (!input.valid()) return; const result = calculateBAC(gender, weight, drinks, hours + (minutes / 60)); _('bac_result').innerHTML = result.bac; _('time_result').innerHTML = result.timeToZero;
}
function calculateBAC(gender, weightKg, drinks, time) {
    const r = gender === 'male' ? 0.68 : 0.55; let totalAlcohol = 0; for (const drink of drinks) { const amount = drink.amount / 1000; const abv = drink.abv / 100; totalAlcohol += amount * abv * 789; }
    const bac = ((totalAlcohol / (r * weightKg)) / 10 - (0.015 * time)); const timeToZero = bac / 0.015; return { bac: bac.toFixed(3), timeToZero: timeToZero.toFixed(1) };
}