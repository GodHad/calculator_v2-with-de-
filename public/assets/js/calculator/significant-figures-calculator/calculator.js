function calculate(){
  // 1. init & validate
  const number = input.get('number').scientific().raw();
  const sigFig = input.get('significant_figures').natural().lt(16).val();
  if(!input.valid()) return;

  // 2. calculate
  const [,sign,coeff,base] = number.replaceAll(' ','').match(/^(-)?([\d\.]+)(.+)?$/);
  
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
  const formattedResult = math.format(math.number(
    result.replace(/(x|\*)10\^(.+)/,'e$2').replace()
  ));

  // 3. output
  _('result').innerHTML = result + (formattedResult != result ? ' or ' + formattedResult : '');

}