function calculate(){const num=input.get('fraction_number_num').integer().raw();const denom=input.get('fraction_number_denom').natural().raw();if(num=='0'){input.error('fraction_number_num','fraction_number_num muss ein Nicht-Null-Wert sein');}
if(!input.valid())return;const frac=math.fraction(num,denom);$$('#result tr>*').forEach((node,index)=>{const num=frac.s*frac.n*(index+1);const denom=frac.d*(index+1);node.innerText=`${num}/${denom}`;});}