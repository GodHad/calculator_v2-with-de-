function calculate(){

  // 1. init & validate
  const number = input.get('decimal_number').periodic().raw();
  if(!input.valid()) return;

  // 2. calculate
  const resultFrac = math.fraction(number);

  // 3. output
  Fractions.outputMixed(resultFrac, 'result');
  
}