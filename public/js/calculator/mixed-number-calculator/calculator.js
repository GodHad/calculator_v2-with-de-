function calculate(){
  
  // 1. init & validate
  const optInteger = elementId => input.get(elementId).optional().integer().raw();
  const optNatural = elementId => input.get(elementId).optional().natural().raw();
  const aWhole = optInteger('fraction_a_full');
  const aNum = optInteger('fraction_a_top');
  const aDenom = optNatural('fraction_a_bottom');
  const bWhole = optInteger('fraction_b_full');
  const bNum = optInteger('fraction_b_top');
  const bDenom = optNatural('fraction_b_bottom');
  const operation = input.get('math_operation').raw();
  input.silent = false;
  
  // additional checks
  if(operation == 'divide' && (bNum == '0' && bWhole == '0' || 
    !bNum && bWhole == '0' || bNum == '0' && !bWhole  
  )){ 
    input.error('fraction_b_full', 'Division by zero fraction_b');
  }
  else if(!Fractions.isCorrectMixed(aWhole, aNum, aDenom)){
    input.error('fraction_a_full', 'Incorrect mixed number fraction_a');
  }
  else if(!Fractions.isCorrectMixed(bWhole, bNum, bDenom)){
    input.error('fraction_b_full', 'Incorrect mixed number fraction_b');
  }
  if(!input.valid()) return;
  
  // 2. calculate
  const aFrac = Fractions.buildFrac(aWhole, aNum, aDenom);
  const bFrac = Fractions.buildFrac(bWhole, bNum, bDenom);
  const resultFrac = math[operation](aFrac, bFrac);
  const operationsMap = {'add':'+','subtract':'−','multiply':'×','divide':'÷'};

  // 3. output
  _('operation').innerText = operationsMap[operation];
  Fractions.outputMixed(aFrac, 'a');
  Fractions.outputMixed(bFrac, 'b');
  Fractions.outputMixed(resultFrac, 'result');

}