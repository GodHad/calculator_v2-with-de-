function calculate(){

  // 1. init & validate
  const number = input.get('number').number().val();
  if(!input.valid()) return;

  // 2. calculate
  const exponentialNotation = math.format(number, {notation: 'exponential'});
  const parts = exponentialNotation.match(/^(-?[\d\.]+)e(\+|-)(\d+)$/);
  if(parts[2] == '+') parts[2] = ''; 

  // 3. output
  _('result').innerHTML = `${parts[1]} × 10<sup>${parts[2]+parts[3]}</sup>`;
}
