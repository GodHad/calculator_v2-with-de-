function calculate(){

  // 1. init & validate
  const number = input.get('number').natural().raw();
  if(!input.valid()) return;

  // 2. calculate
  const getFactorPairs = (number) => {
    const s = math.fix(math.sqrt(number));
    const factorPairs = [];
    let n = 1;
    while(n <= s){
      if(number % n == 0){
        factorPairs.push([n, number / n]);
      }
      n++;
    }
    return factorPairs;
  };
  const getFactors = (number) => {
    const factors = [];
    getFactorPairs(number).forEach(pair => {
      if(pair[0] == pair[1]){
        factors.push(pair[0]);
      } else {
        factors.push(pair[0], pair[1]);
      }
    });
    return math.sort(factors);
  };
  const factors = getFactors(number);
  const factorPairs = getFactorPairs(number).map(pair => `${pair[0]} × ${pair[1]} = ${number}`);

  // 3. output
  _('factors_count').innerHTML = plural(factors.length, 'Faktoren:Faktor:Faktoren:Faktoren:Faktoren:Faktoren');
  _('factors').innerHTML = factors.join(', ');  
  _('factor_pairs').innerHTML = factorPairs.join('<br>');
  
}