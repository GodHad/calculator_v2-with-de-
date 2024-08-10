function calculate(){

  // 1. init & validate
  const number = input.get('number').number().raw();
  const rounding = input.get('rounding').raw();
  if(!input.valid()) return;

  // 2. calculate
  const roundingMap = {
    'Billions': -9, 'Hundred Millions': -8, 'Ten Millions': -7, 
    'Millions': -6, 'Hundred Thousands': -5, 'Ten Thousands': -4, 
    'Thousands': -3, 'Hundreds Place': -2, 'Tens Place': -1, 
    'Ones Place (Whole Numbers)': 0, 'Tenths (1 decimal place)': 1, 
    'Hundredths (2 decimals places)': 2, 'Thousandths (3 decimals places)': 3, 
    'Ten Thousandths (4 decimals places)': 4, 'Hundred Thousandths (5 decimals places)': 5, 
    'Millionths (6 decimals places)': 6, 'Ten Millionths (7 decimals places)': 7, 
    'Hundred Millionths (8 decimals places)': 8, 'Billionths (9 decimals places)': 9
  };
  const roundTo = roundingMap[rounding];
  const fracLength = (number.split('.')[1] || '').length;
  const result = roundTo <  0 ? 
    math.evaluate(`round(${number}/10^${-roundTo})*10^${-roundTo}`) : 
    math.round(number, roundTo) + (
      fracLength < roundTo ? (fracLength == 0 ? '.':'') + '0'.repeat(roundTo - fracLength) : ''
    )
  ;

  // 3. output
  _('result').innerText = result;
}
