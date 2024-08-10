function calculate(){
  
  // 1. init & validate
  const num = input.get('fraction_number_num').integer().raw();
  const denom = input.get('fraction_number_denom').natural().raw();
  const roundTo = input.get('round_to').whole().lte(14).raw();
  if(!input.valid()) return;

  // 2. calculate
  const percentValue = math.fraction(num, denom) * 100; 
  const result = roundTo ? math.round(percentValue, roundTo) : percentValue;

  // 3. output
  _('result').innerText = result + '%';
  _('result-words').innerText = `${numberToWords(result)} ${plural(result, 'Prozente:Prozent:Prozent:Prozente:Prozente:Prozente', {showNumber: false})}`;
}
