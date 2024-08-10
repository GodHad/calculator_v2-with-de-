function calculate(){
  
  // 1. init & validate
  const num = input.get('fraction_number_top').integer().raw();
  const denom = input.get('fraction_number_bottom').natural().raw();
  if(!input.valid()) return;

  // 2. calculate
  const decimal = math.fraction(num, denom).toString();

  // 3. output
  _('decimal').innerText = decimal;

}