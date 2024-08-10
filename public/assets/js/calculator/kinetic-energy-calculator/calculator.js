function calculate(){
  const sigFig = input.get('significant_figures').optional().natural().lt(16).val();
  const type = input.get('find').raw();
  const eUnit = input.get('energy_unit_'+type).raw();
  const mUnit = input.get('mass_unit_'+type).raw();
  const vUnit = input.get('velocity_unit_'+type).raw();
  const eCoeff = {
    'J': 1,
    'MJ': 1e6,
    'BTU': 1055.06, 
    'cal': 4.184
  }[eUnit];
  const mCoeff = {
    'kg': 1, 
    'g': 1e-3, 
    'oz': 0.02834952,
    'lb': 0.45359237
  }[mUnit];
  const vCoeff = {
    'm/s': 1,
    'km/h': 3.6,
    'ft/s': 0.3048,
    'mi/h': 2.23694
  }[vUnit];

  let e,m,v;
  switch(type){
    case 'energy':
      // 1. init & validate
      m = input.get('mass_'+type).number().val();
      v = input.get('velocity_'+type).number().val();
      if(!input.valid()) return;
      
      // 2. calculate
      e = math.evaluate(`0.5*m*v^2`, {
        m: m*mCoeff,
        v: v*vCoeff
      }) / eCoeff;
      if(sigFig) e = roundingSignificantFigures(e, sigFig);

      // 3. output
      _('result_energy').innerHTML = `KE = ${e} ${eUnit}`;
    break;
    case 'mass':
      // 1. init & validate
      e = input.get('energy_'+type).number().val();
      v = input.get('velocity_'+type).nonZero().val();
      if(!input.valid()) return;
      
      // 2. calculate
      m = math.evaluate(`2*e/v^2`, {
        e: e*eCoeff,
        v: v*vCoeff
      }) / mCoeff;
      if(sigFig) m = roundingSignificantFigures(m, sigFig);

      // 3. output
      _('result_mass').innerHTML = `m = ${m} ${mUnit}`;
    break;
    case 'velocity':
      // 1. init & validate
      e = input.get('energy_'+type).nonNegative().val();
      m = input.get('mass_'+type).positive().val();
      if(!input.valid()) return;
      
      // 2. calculate
      v = math.evaluate(`sqrt(e/(0.5*m))`, {
        e: e*eCoeff,
        m: m*mCoeff
      }) / vCoeff;
      if(sigFig) v = roundingSignificantFigures(v, sigFig);

      // 3. output
      _('result_velocity').innerHTML = `v = ${v} ${vUnit}`;
    break;
  }
}

function roundingSignificantFigures(number,sigFig){
  const [,sign,coeff,base] = String(number).replaceAll(' ','').match(/^(-)?([\d\.]+)(.+)?$/);
  
  // get significant figures
  // - any non-zero digit
  // - and zeros between non-zero digits
  // - and trailing zeros when there is a decimal point
  // - no leading zeros
  let result = coeff.replace(/^-?(([1-9]+(0+[1-9]+)*)\d*|0?\.0*(\d*))$/,'$2$4').replace('.','');
  
  // round
  result = math.format(math.round('0.'+result,sigFig),{notation:'fixed'}).slice(2);
  // append zeros
  if(result.length < sigFig){
    result+= '0'.repeat(sigFig-result.length);
  }

  // restore number
  if(!['0','.'].includes(coeff[0])){
    let dotIndex = coeff.indexOf('.');
    if(dotIndex == -1) {
      dotIndex = coeff.length;
    }
    if(result.length <= dotIndex) {
      result+= '0'.repeat(dotIndex - result.length);
    } else {
      result = result.slice(0,dotIndex) + '.' + result.slice(dotIndex);
    }
  } 
  else {
    let zeros = (coeff[0] == '.' ? 1 : 0);
    zeros+= coeff.replace('.','').match(/^0*/)[0].length - 1;
    result = '0.' + '0'.repeat(zeros) + result;
  }
  result = (sign || '') + result + (base || '');
  return math.number(result.replace(/(x|\*)10\^(.+)/,'e$2').replace());
}
