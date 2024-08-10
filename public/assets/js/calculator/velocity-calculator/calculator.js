function calculate(){
  const type = input.get('find').raw();
  const vUnit = input.get('v_unit_'+type).raw();
  const uUnit = input.get('u_unit_'+type).raw();
  const aUnit = input.get('a_unit_'+type).raw();
  const tUnit = input.get('t_unit_'+type).raw();
  const aCoeff = {
    "m/s²": 1,
    "cm/s²": 0.01,
    "km/s²": 1000,
    "in/s²": 0.0254,
    "ft/s²": 0.3048,
    "mi/s²": 1609.344,
    "mi/(h·s)": 0.44704,
    "km/(h·s)": 0.2777777777777778
  }[aUnit];
  const vCoeff = {
    "m/s": 1,
    "cm/s": 0.01,
    "in/s": 0.0254,
    "ft/s": 0.3048,
    "mi/h": 2.23694,
    "km/h": 3.6
  }[vUnit];
  const uCoeff = {
    "m/s": 1,
    "cm/s": 0.01,
    "in/s": 0.0254,
    "ft/s": 0.3048,
    "mi/h": 2.23694,
    "km/h": 3.6
  }[uUnit];
  const tCoeff = {
    "s": 1,
    "h": 3600
  }[tUnit];
  
  let v,u,a,t;
  switch(type){
    case 'v': 
      // 1. init & validate
      u = input.get('u_'+type).number().val();
      a = input.get('a_'+type).number().val();
      t = input.get('t_'+type).number().val();
      if(!input.valid()) return;
      
      // 2. calculate
      v = math.evaluate(`(u+a*t)`, {
        u: u*uCoeff,
        a: a*aCoeff,
        t: t*tCoeff
      }) / vCoeff;

      // 3. output
      _('result_v').innerHTML = `v = ${v} ${vUnit}`;
    break;
    case 'u': 
      // 1. init & validate
      v = input.get('v_'+type).number().val();
      a = input.get('a_'+type).number().val();
      t = input.get('t_'+type).number().val();
      if(!input.valid()) return;
      
      // 2. calculate
      u = math.evaluate(`(v-a*t)`, {
        v: v*vCoeff,
        a: a*aCoeff,
        t: t*tCoeff
      }) / uCoeff;

      // 3. output
      _('result_u').innerHTML = `u = ${u} ${uUnit}`;
    break;
    case 'a': 
      // 1. init & validate
      v = input.get('v_'+type).number().val();
      u = input.get('u_'+type).number().val();
      t = input.get('t_'+type).nonZero().val();
      if(!input.valid()) return;
      
      // 2. calculate
      a = math.evaluate(`(v-u)/t`, {
        v: v*vCoeff,
        u: u*uCoeff,
        t: t*tCoeff
      }) / aCoeff;

      // 3. output
      _('result_a').innerHTML = `a = ${a} ${aUnit}`;
    break;
    case 't': 
      // 1. init & validate
      v = input.get('v_'+type).number().val();
      u = input.get('u_'+type).number().val();
      a = input.get('a_'+type).nonZero().val();
      if(!input.valid()) return;
      
      // 2. calculate
      t = math.evaluate(`(v-u)/a`, {
        v: v*vCoeff,
        u: u*uCoeff,
        a: a*aCoeff
      }) / tCoeff;

      // 3. output
      _('result_t').innerHTML = `t = ${t} ${tUnit}`;
    break;
  }
}
