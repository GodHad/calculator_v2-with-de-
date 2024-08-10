function calculate(){
  switch($('[data-tab].tab--active').dataset.tab){
    case '0':{
      // 1. init & validate
      const optNumber = id => input.get(id).optional().nonZero().val();
      let a = optNumber('ab_1');
      let b = optNumber('ab_2');
      let c = optNumber('cd_1');
      let d = optNumber('cd_2');
      input.silent = false;
      const valuesCount = [a,b,c,d].reduce((count, value) => value==null ? count+1 : count, 0);
      if(valuesCount != 1){
        input.error(['ab_1','cd_1'], ('Provide exactly three values to calculate the fourth in the ratio A:B = C:D.'));
      }
      if(!input.valid()) return;

      // 2. calculate
      const values = {a,b,c,d};
      const definedValues = names => names.split('').every(name=>values[name]!=null);
      if(definedValues('abc')) d = calc(`${b}*${c}/${a}`);
      if(definedValues('abd')) c = calc(`${a}*${d}/${b}`);
      if(definedValues('acd')) b = calc(`${a}*${d}/${c}`);
      if(definedValues('bcd')) a = calc(`${b}*${c}/${d}`);
      const result = `${a} : ${b} = ${c} : ${d}`;

      // 3. output
      _('result_ratio').innerHTML = result;
    }break;
    case '1':{
      // 1. init & validate
      const a = input.get('ratio_1').number().val();
      const b = input.get('ratio_2').number().val();
      const scale = input.get('scale').number().val();
      const operation = input.get('operation').raw();
      if(!input.valid()) return;

      // 2. calculate
      let c,d;
      switch(operation){
        case 'enlarge': 
          c = calc(`${a}*${scale}`);
          d = calc(`${b}*${scale}`);
        break;
        case 'shrink': 
          c = calc(`${a}/${scale}`);
          d = calc(`${b}/${scale}`);
        break;
      }
      const result = `${a}:${b} ${operation} ${scale} times = ${c}:${d}`;
       
      // 3. output
      _('result_scale').innerHTML = result; 
    }break;
  }
}

window.addEventListener('load', () => math.config({number:'BigNumber', precision: 9}));
