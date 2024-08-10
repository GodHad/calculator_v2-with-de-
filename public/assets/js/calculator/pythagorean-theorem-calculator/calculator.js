function calculate(){
  // 1. init & validate
  const find = input.get('find').raw();
  let a, b, c;
  
  // 2. calculate
  switch(find){
    case 'a':
      b = input.get('b').positive().val();
      c = input.get('c').positive().val();
      if(b >= c){
        input.error('b', 'The b value need to be smaller than the c value.');
      }
      if(!input.valid()) return;

      a = calc('sqrt(c^2-b^2)',{b,c});
    break;
    case 'b': 
      a = input.get('a').positive().val();
      c = input.get('c').positive().val();
      if(a >= c){
        input.error('a', 'The a value need to be smaller than the c value.');
      }
      if(!input.valid()) return;

      b = calc('sqrt(c^2-a^2)',{a,c});
    break;
    case 'c':   
      a = input.get('a').positive().val();
      b = input.get('b').positive().val();
      if(!input.valid()) return;

      c = calc('sqrt(a^2+b^2)',{a,b});
    break;
  }
  const result = {a,b,c};
  const area = calc('a*b/2',{a,b});

  // 3. output
  _('result').innerHTML = `${find} = ${result[find]}`;
  _('result_area').innerHTML = area;

}