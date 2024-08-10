function calculate(){

  // 1. init & validate
  const equation = input.get('equation').raw();
  if(!input.valid()) return;

  // 2. calculate
  let result;
  try{
    result = calc(equation);
  }
  catch(error){
    input.exception('equation', error); return;
  }

  // 3. output
  _('result').innerHTML = result;
  
}