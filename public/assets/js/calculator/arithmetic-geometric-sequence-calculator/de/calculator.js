function calculate(){
  // 1. init & validate
  const sequence = input.get('sequence').raw();
  let first, diff, nth;
  switch(sequence){
    case 'arithmetic':
      first = input.get('first_number').number().val();
      diff = input.get('common_difference').number().val();
      nth = input.get('nth_number').natural().val();
      break;
    case 'geometric': 
      first = input.get('first_number_2').number().val();
      diff = input.get('common_ratio').number().val();
      nth = input.get('nth_number_2').natural().val();
    break;
    case 'fibonacci':
      first = 1;
      nth = input.get('nth_number_3').natural().val();
    break;
  }
  if(!input.valid()) return;

  // 2. calculate
  let resultSequence = [first], resultNth = 0, resultSum = first;
  let iterrate = method => {
    for(let i = 1; i < nth; i++){
      resultNth = resultSequence[i] = method(i, resultSequence);
      resultSum = math.evaluate(`${resultSum}+${resultNth}`);
    }
  };
  switch(sequence){
    case 'arithmetic':
      iterrate((index, sequence) => math.evaluate(`${sequence[index-1]}+${diff}`));
    break;
    case 'geometric':
      iterrate((index, sequence) => math.evaluate(`${sequence[index-1]}*${diff}`));
    break;
    case 'fibonacci':
      iterrate((index, sequence) => math.evaluate(`${sequence[index-1]}+${index > 1 ? sequence[index-2]:0}`));
    break;
  }
  const toFixed = value => value.toFixed().length > 500 ? value : value.toFixed();

  // 3. output
  _('result_sequence').innerHTML = resultSequence.slice(0,9).join(', ') + (nth > 9 ? '...' : '');
  _('result_nth').innerHTML = toFixed(resultNth);
  _('result_sum').innerHTML = toFixed(resultSum);
}

window.addEventListener('load', () => math.config({number:'BigNumber',precision:500}));

// const clearResult = () => {
//   _('result_sequence').innerHTML = '';
//   _('result_nth').innerHTML = '';
//   _('result_sum').innerHTML = '';
// };
// _('sequence-a').addEventListener('click', clearResult);
// _('sequence-b').addEventListener('click', clearResult);
// _('sequence-c').addEventListener('click', clearResult);
