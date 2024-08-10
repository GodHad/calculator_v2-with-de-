function calculate(){
  // 1. init & validate
  let lengthMeters = input.get('length_meters').nonNegative().val();
  let decimalPlaces = input.get('decimal_places').whole().lte(9).val();
  let inchFraction = input.get('inch_fraction').natural().lte(1000).val();
  if(!input.valid()) return;

  // 2. calculate
  let inchRounded;
  switch(inchFraction){
    case 1: inchRounded = 'whole'; break;
    case 2: inchRounded = 'half'; break;
    case 3: inchRounded = '3rd of an'; break;
    default: inchRounded = inchFraction + 'th of an'; break;
  }
  
  const feets = lengthMeters * 3.280839895;
  const feetResult = math.round(feets, decimalPlaces);
  
  let inchesFractionInt = math.round(feets * 12 * inchFraction);
  const feetsInt = Math.trunc(inchesFractionInt / inchFraction / 12);
  inchesFractionInt-= feetsInt * 12 * inchFraction;
  const inchesInt = Math.trunc(inchesFractionInt / inchFraction);
  inchesFractionInt-= inchesInt * inchFraction;

  const inchResult = 
    (feetsInt != 0 ? `${feetsInt} ft ` : (inchesInt == 0 && inchesFractionInt == 0 ? '0 in': '')) + 
    (inchesInt != 0 ? `${inchesInt} ` + (inchesFractionInt == 0 ? 'in' : '') : '') +
    (inchesFractionInt != 0 ? `${inchesFractionInt}/${inchFraction} in` : '')
  ;
  
  // 3. output
  _('meters_result').innerHTML = lengthMeters;
  _('feet_result').innerHTML = feetResult;
  _('inch_result').innerHTML = inchResult;
  _('inch_rounded').innerHTML = inchRounded;
}