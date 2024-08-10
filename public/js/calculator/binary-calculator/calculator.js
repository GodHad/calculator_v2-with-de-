function calculate(){
  const inputBinary = (elementId, optional) => {
    let value = input.get(elementId).raw();
    if(optional && !value) return '';
    if(!/^[01]+$/.test(value)) {
      input.error(elementId, `The "${elementId}" must be a natural binary number.`);
    }
    return value;
  };
  switch($('[data-tab].tab--active').dataset.tab){
    case '0': 
      // 1. init & validate
      const a = inputBinary('value_1');
      const b = inputBinary('value_2');
      const operation = input.get('operation').raw();
      if(b == 0 && operation == 'divide') input.error('value_2', 'Division by zero in value_2');
      if(!input.valid()) return;

      // 2. calculate
      const result = math.bin(math[operation]('0b'+a,'0b'+b)).replace('0b','');

      // 3. output
      _('result').innerHTML = result;
    break;
    case '1': 
      // 1. init & validate
      const binary = inputBinary('binary', true);
      const decimal = input.get('decimal').optional().natural().raw();
      input.silent = false;
      if(!binary && !decimal){
        input.error('binary');
        input.error('decimal');
      }
      if(!input.valid()) return;

      // 2. calculate
      const binToDec = binary ? `${binary} = ${math.number('0b'+binary)}` : '';
      const decToBin = decimal ? `${decimal} = ${math.bin(decimal).replace('0b','')}` : '';
      
      // 3. output
      _('bin_to_dec').innerHTML = binToDec; 
      _('dec_to_bin').innerHTML = decToBin; 
    break;
  }
}
