function calculate(){
  // 1. init & validate
  const fractions = input.get('fractions').raw();
  if(!fractions.replaceAll(' ', '').split('+').every(fraction => {
    return /^-?(0|[1-9]+\d*)\/[1-9]+\d*$/.test(fraction);
  })){
    input.error('fractions');
  }
  if(!input.valid()) return;

  // 2. calculate
  const result = fractions.replaceAll(' ', '').split('+').reduce((sum, fraction) => {
    return math.add(sum, math.fraction(fraction.split('/')[0], fraction.split('/')[1]));
  }, math.fraction(0,1));

  // 3. output
  Fractions.outputFrac(result, 'a');
  Fractions.outputMixed(result, 'result');

}