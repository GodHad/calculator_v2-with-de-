function calculate(){
  // 1. init & validate
  const number = input.get('number').number().val();
  if(!input.valid()) return;

  // 2. calculate
  const result = math.cbrt(number /* , true - to get complex roots */); 

  // 3. output
  _('result').innerHTML = `${number} = ${result}`;
}