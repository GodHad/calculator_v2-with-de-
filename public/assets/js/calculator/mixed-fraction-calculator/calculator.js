function calculate(){
  
  // 1. init & validate
  const optInteger = elementId => input.get(elementId).optional().integer().raw();
  const optNatural = elementId => input.get(elementId).optional().natural().raw();
  const aWhole = optInteger('fraction_a_full');
  const aNum = optInteger('fraction_a_top');
  const aDenom = optNatural('fraction_a_bottom');
  input.silent = false;

  // additional checks
  if(!Fractions.isCorrectMixed(aWhole, aNum, aDenom)){
    input.error('fraction_a_full', 'Incorrect mixed number fraction_a');
  }
  if(!input.valid()) return;

  // 2. calculate
  const aFrac = Fractions.buildFrac(aWhole, aNum, aDenom);
  
  // 3. output
  const isWhole = aFrac.d == 1;
  const sign = aFrac.s == -1 ? '-' : '+';
  _('equals').classList[isWhole ? 'add':'remove']('hidden');
  _('solutionNum').classList[isWhole ? 'add':'remove']('hidden');
  _('solutionNum').innerText = `${sign == '+' ? '' : sign}${math.abs(aWhole)} × ${math.abs(aDenom)} ${sign} ${math.abs(aNum)}`;
  _('solutionDenom').classList[isWhole ? 'add':'remove']('hidden');
  _('solutionDenom').innerText = math.abs(aDenom);
  
  Fractions.outputFrac(aFrac, 'a');

}