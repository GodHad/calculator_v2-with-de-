function calculate(){const equation=input.get('equation').raw();if(!input.valid())return;let result;try{result=calc(equation);}
catch(error){input.exception('equation',error);return;}
_('result').innerHTML=result;}