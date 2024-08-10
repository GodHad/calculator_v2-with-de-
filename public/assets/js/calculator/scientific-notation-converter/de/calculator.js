function calculate(){
  // 1. init & validate
  let number = input.get('number').scientific().raw();
  if(!input.valid()) return;

  // 2. calculate
  number = math.evaluate(number.replace('x','*'));
  const realNumber = math.format(number, {notation:'fixed'});
  const eNotation = math.format(number, {notation: 'exponential'});
  const scientificNotation = eNotation.replace(/e\+?(-?)(\d+)/,' × 10<sup>$1$2</sup>');
  const engineeringNotation = math.format(number, {notation: 'engineering'})
    .replace(/e\+?(-?)(\d+)/,' × 10<sup>$1$2</sup>');
  const wordForm = numberToWords(number);

  // 3. output
  _('scientific_notation').innerHTML = scientificNotation;
  _('e_notation').innerHTML = eNotation;
  _('engineering_notation').innerHTML = engineeringNotation;
  _('standard_form').innerHTML = scientificNotation;
  _('real_number').innerHTML = realNumber;
  _('word_form').innerHTML = wordForm;

}

window.addEventListener('load', () => math.config({number:'BigNumber'}));
