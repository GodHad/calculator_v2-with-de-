function calculate(){

  // 1. init & validate
  const numbers = input.get('numbers').natural_numbers().vals();
  if(!input.valid()) return;

  // 2. calculate
  const gcf = math.gcd(...numbers);

  // 3. output
  _('gcf').innerHTML = gcf;
  
}