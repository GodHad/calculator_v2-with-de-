function calculate(){const n=input.get('n').whole().val();const r=input.get('r').whole().val();if(n<r)input.error('n','Geben Sie Werte ein, wo n ≥ r ≥ 0');if(!input.valid())return;const result=math.combinations(math.bignumber(n),math.bignumber(r));_('result').innerHTML=result.toFixed().length>500?result:result.toFixed();}
window.addEventListener('load',()=>math.config({number:'BigNumber',precision:500}));