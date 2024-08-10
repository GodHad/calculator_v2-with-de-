function calculate(){
  // 1. init & validate
  const pi = math.bignumber(input.get('pi').positive().val() || math.pi);
  const type = input.get('given').raw();
  const rUnit = input.get(type+'_radius_unit').raw();
  const hUnit = input.get(type+'_height_unit').raw();
  const VUnit = input.get(type+'_volume_unit').raw();
  const LUnit = input.get(type+'_lateral_area_unit').raw();
  const lengthCoeffs = {
    'm':  1,
    'km': 1e3,
    'cm': 1e-2,
    'mm': 1e-3,
    'mi': 1609.35,
    'yd': 0.9144,
    'ft': 0.3048,
    'in': 0.0254,
  }; 
  const rCoeff = lengthCoeffs[rUnit];
  const hCoeff = lengthCoeffs[hUnit];
  const LCoeff = {
    'm²':  1**2,
    'km²': 1e3**2,
    'cm²': 1e-2**2,
    'mm²': 1e-3**2,
    'mi²': 1609.35**2,
    'yd²': 0.9144**2,
    'ft²': 0.3048**2,
    'in²': 0.0254**2,
  }[LUnit];
  const VCoeff = {
    'm³':  1**3,
    'km³': 1e3**3,
    'cm³': 1e-2**3,
    'mm³': 1e-3**3,
    'mi³': 1609.35**3,
    'yd³': 0.9144**3,
    'ft³': 0.3048**3,
    'in³': 0.0254**3,
  }[VUnit];
  if(!input.valid()) return;

  // 2. calculate
  let r, h, V, L;
  const get = id => input.get(id).positive().val(); 
  switch(type){
    case 'rh':
      r = get(type+'_radius');
      h = get(type+'_height');
      if(!input.valid()) return;
      r = math.bignumber(r*rCoeff);
      h = math.bignumber(h*hCoeff);
    break;
    case 'rV':
      r = get(type+'_radius');
      V = get(type+'_volume');
      if(!input.valid()) return;
      r = math.bignumber(r*rCoeff);
      V = math.bignumber(V*VCoeff);
      h = math.evaluate(`V/(pi*r^2)`, {r,V,pi});
      break; 
    case 'rL':
      r = get(type+'_radius');
      L = get(type+'_lateral_area');
      if(!input.valid()) return;
      r = math.bignumber(r*rCoeff);
      L = math.bignumber(L*LCoeff);
      h = math.evaluate(`L/(2*pi*r)`, {r,L,pi});
    break; 
    case 'hL':
      h = get(type+'_height');
      L = get(type+'_lateral_area');
      if(!input.valid()) return;
      h = math.bignumber(h*hCoeff);
      L = math.bignumber(L*LCoeff);
      r = math.evaluate(`L/(2*pi*h)`, {h,L,pi});
    break; 
    case 'hV':
      h = get(type+'_height');
      V = get(type+'_volume');
      if(!input.valid()) return;
      h = math.bignumber(h*hCoeff);
      V = math.bignumber(V*VCoeff);
      r = math.evaluate(`sqrt(V/(pi*h))`, {h,V,pi});
    break;
  }
  V = math.evaluate(`pi*r^2*h`, {r,h,pi});
  L = math.evaluate(`2*pi*r*h`, {r,h,pi});
  const T = math.evaluate(`pi*r^2`, {r,pi});
  const B = T;
  const A = math.evaluate(`2*pi*r*(h+r)`, {r,h,pi});

  // 3. output
  _('result_r').innerHTML = r;
  _('result_h').innerHTML = h;
  _('result_V').innerHTML = V;
  _('result_L').innerHTML = L;
  _('result_T').innerHTML = T;
  _('result_B').innerHTML = B;
  _('result_A').innerHTML = A;
}

window.addEventListener('load', () => math.config({number:'BigNumber', precision: 9}));