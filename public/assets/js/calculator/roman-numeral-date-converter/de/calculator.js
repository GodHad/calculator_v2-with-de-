function calculate(){let format=input.get('format').raw();let date=input.get('date').date().raw();if(!input.valid())return;const day=date.getDate();const month=date.getMonth()+1;const year=date.getFullYear();let romanDate='';let arabicDate='';if(format==='mm/dd/yyyy'){romanDate=`${toRoman(month)}/${toRoman(day)}/${toRoman(year)}`;arabicDate=`${String(month).padStart(2,'0')}/${String(day).padStart(2,'0')}/${year}`;}
else{romanDate=`${toRoman(day)}.${toRoman(month)}.${toRoman(year)}`;arabicDate=`${String(day).padStart(2,'0')}.${String(month).padStart(2,'0')}.${year}`;}
output.val(formatedResult(romanDate)).set('roman_date');output.val(arabicDate).set('arabic_date');}
function toRoman(num){let result=[];for(let i=0;i<decimal.length;i++){while(decimal[i]<=num){result.push(roman[i]);num-=decimal[i];}}
return result.join('').toString();}
function formatedResult(str){if(isNaN(str)){str=str.toString();const mapObj={_I:'<span class="overline">I</span>',_V:'<span class="overline">V</span>',_X:'<span class="overline">X</span>',_L:'<span class="overline">L</span>',_C:'<span class="overline">C</span>',_D:'<span class="overline">D</span>',_M:'<span class="overline">M</span>',};return str.replace(/_I|_V|_X|_L|_C|_D|_M/gi,matched=>mapObj[matched]);}
else{return numberWithCommas(str);}}
function numberWithCommas(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}
const roman=['_M','_C_M','_D','_C_D','_C','_X_C','_L','_X_L','_X','_I_X','_V','_I_V','M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']
const decimal=[1000000,900000,500000,400000,100000,90000,50000,40000,10000,9000,5000,4000,1000,900,500,400,100,90,50,40,10,9,5,4,1]