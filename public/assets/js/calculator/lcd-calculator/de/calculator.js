function calculate(){

  // 1. init & validate
  const numbers = input.get('numbers').mixed_numbers().raw();
  if(numbers.length == 1) input.error('numbers', 'Die Anzahl muss größer als 1 sein');
  if(!input.valid()) return;

  // 2. calculate
  const lcd = math.lcm(...numbers.map(number=>math.fraction(number).d));

  // 3. output
  _('lcd').innerHTML = lcd;
  
}