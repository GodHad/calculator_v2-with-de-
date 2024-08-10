function calculate(){
  const fCoeff = {
    "N": 1,
    "kN": 1000,
    "dyn": 1e-5,
    "kgf": 9.80665,
    "kip": 4448.22,
    "lbf": 4.44822,
    "ozf": 0.278013851,
    "pdl": 0.138254954376 
  };
  const mCoeff = {
    "kg": 1,
    "g": 1e-3,
    "lb": 0.453592,
    "oz": 0.0283495 
  };
  const aCoeff = {
    "m/s²": 1,
    "cm/s²": 0.01,
    "km/s²": 1000,
    "in/s²": 0.0254,
    "ft/s²": 0.3048,
    "mi/s²": 1609.344,
    "mi/(h·s)": 0.44704,
    "km/(h·s)": 0.2777777777777778
  };
  
  const type = input.get('find').raw();
  const fUnit = input.get('f_unit_'+type).raw();
  const mUnit = input.get('m_unit_'+type).raw();
  const aUnit = input.get('a_unit_'+type).raw();
  let f,m,a;
  
  switch(type){
    case 'f': 
      // 1. init & validate
      m = input.get('m_f').number().val();
      a = input.get('a_f').number().val();
      if(!input.valid()) return;
      
      // 2. calculate
      f = math.evaluate(`${m}*${mCoeff[mUnit]}*${a}*${aCoeff[aUnit]}/${fCoeff[fUnit]}`);

      // 3. output
      _('result_f').innerHTML = `F = ${f} ${fUnit}`;
    break;
    case 'm': 
      // 1. init & validate
      f = input.get('f_m').number().val();
      a = input.get('a_m').nonZero().val();
      if(!input.valid()) return;
  
      // 2. calculate
      m = math.evaluate(`${f}*${fCoeff[fUnit]}/${a}/${aCoeff[aUnit]}/${mCoeff[mUnit]}`);

      // 3. output
      _('result_m').innerHTML = `m = ${m} ${mUnit}`;
    break;
    case 'a': 
      // 1. init & validate
      f = input.get('f_a').number().val();
      m = input.get('m_a').nonZero().val();
      if(!input.valid()) return;
  
      // 2. calculate
      a = math.evaluate(`${f}*${fCoeff[fUnit]}/${m}/${mCoeff[mUnit]}/${aCoeff[aUnit]}`);

      // 3. output
      _('result_a').innerHTML = `a = ${a} ${aUnit}`;
    break;
  }
}

window.addEventListener('load', () => math.config({number:'BigNumber', precision: 9}));
