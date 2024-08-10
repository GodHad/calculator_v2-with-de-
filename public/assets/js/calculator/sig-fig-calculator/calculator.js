function calculate(){
  // 1. init & validate
  const number = input.get('number').scientific().raw();
  if(!input.valid()) return;

  // 2. calculate
  // - any non-zero digit
  // - and zeros between non-zero digits
  // - and trailing zeros when there is a decimal point
  // - no leading zeros
  let figures = number.match(/^(-)?([\d\.]+)(.+)?$/)[2]
    .replace(/^-?(([1-9]+(0+[1-9]+)*)\d*|0?\.0*(\d*))$/,'$2$4')
    .replace('.','');
  
  // 3. output
  _('significant_figures_count').innerHTML = figures.length;
  _('significant_figures').innerHTML = figures.split('').join(' ');
}
