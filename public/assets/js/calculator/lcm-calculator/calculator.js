function calculate(){

  // 1. init & validate
  const numbers = input.get('numbers').natural_numbers().vals();
  if(numbers.length == 1) input.error('numbers', 'The numbers count must be greater than 1');
  if(!input.valid()) return;

  // 2. calculate
  const lcm = math.lcm(...numbers);

  // 3. output
  _('lcm').innerHTML = lcm;
  
}