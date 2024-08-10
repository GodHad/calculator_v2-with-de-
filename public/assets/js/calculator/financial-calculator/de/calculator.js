function calculate(){const calcType=input.get('find').raw();const pv=input.get('present').val();const fv=input.get('future').val();const years=input.get('number').gt(0).val();const rate=input.get('interest').gt(0).val();const contribution=+input.get('payment').val();const compound=input.get('compounds').val();const contributionF=input.get('periods').val();const contributionTime=input.get('periodic_payment').raw();if(!input.valid())return;$('.table-cell--legend').classList.remove('hidden');$('.chart-wrapper').classList.remove('hidden');$('.result-table__dialog').classList.remove('hidden');$('.result-table-sum').classList.remove('hidden');const inEnd=contributionTime==='end';if(calcType==='fv'){const result=get_fv_table_payments_by_periods(pv,years,rate/100,compound,contribution,contributionF,inEnd);const FV=get_fv_with_payments_periods(pv,years,rate/100,compound,contribution,contributionF,inEnd);output.val(currencyFormat(FV)).set('fv-result');showResult(result,pv);}
else if(calcType==='pmt'){const pmt=get_pmt_periods(compound,contributionF,fv*-1,pv,rate/100,years,inEnd);const result=get_fv_table_payments_by_periods(pv,years,rate/100,compound,pmt,contributionF,inEnd);output.val(currencyFormat(pmt)).set('pmt-result');showResult(result,pv);}
else if(calcType==='pv'){const pv=get_primalvalue_with_payment_periods(fv*-1,years,rate/100,compound,contribution,contributionF,inEnd);const result=get_fv_table_payments_by_periods(pv,years,rate/100,compound,contribution,contributionF,inEnd);output.val(currencyFormat(pv)).set('pv-result');showResult(result,pv);}
else if(calcType==='iy'){const iy=get_interest(fv,pv,years,compound,contribution,contributionF,inEnd);if(iy===false){return input.error(['present','future','payment','number'],'Kann den Zinssatz basierend auf den Eingaben nicht finden.',true);}
const result=get_fv_table_payments_by_periods(pv,years,iy,compound,contribution,contributionF,inEnd);output.val(iy*100+'%').set('iy-result');showResult(result,pv);}
else{let periods=get_periods(fv,pv,rate/100,compound,contribution,contributionF,inEnd)
if(periods===false){return input.error(['present','future','payment','interest'],'Nicht lösbar. Bitte geben Sie vernünftige Zahlen ein.',true);}
output.val(periods).set('n-result');if(periods<0){$('.table-cell--legend').classList.add('hidden');$('.chart-wrapper').classList.add('hidden');$('.result-table__dialog').classList.add('hidden');$('.result-table-sum').classList.add('hidden');}
else{const result=get_fv_table_payments_by_periods(pv,periods,rate/100,compound,contribution,contributionF,inEnd);showResult(result,pv);}}}
function get_interest(fv,pv,years,compound,contribution,contributionF,inEnd){const val1=get_fv_with_payments_periods(pv,years,0.0001,compound,contribution,contributionF,inEnd);const val2=get_fv_with_payments_periods(pv,years,-0.0001,compound,contribution,contributionF,inEnd);let action='add';if(getClosestNumber(fv,val1,val2)===val1){action='subtract';}
let initialValue=action==='subtract'?-0.001:0.001;var increment=1;var i=0;let r=false;while(!r&&i<10000){let futureValue=get_fv_with_payments_periods(pv,years,initialValue,compound,contribution,contributionF,inEnd);if((Math.abs(futureValue/fv))<0.999){if(action==='subtract'){initialValue+=increment;}
else{initialValue-=increment;}
increment=roundTo(increment/2,4);}
else if((Math.abs(futureValue/fv))>=0.999&&(Math.abs(futureValue/fv))<=1.001){r=roundTo(initialValue,4);}
else{if(action==='subtract'){initialValue-=increment;}
else{initialValue+=increment;}}
i++;}
return r;}
function get_periods(fv,pv,rate,compound,contribution,contributionF,inEnd){const val1=get_fv_with_payments_periods(pv,1,rate,compound,contribution,contributionF,inEnd);const val2=get_fv_with_payments_periods(pv,-1,rate,compound,contribution,contributionF,inEnd);let action='add';if(getClosestNumber(fv,val1,val2)===val1){action='subtract';}
let initialValue=action==='subtract'?0.01:-0.01;var increment=0.01;var i=0;let r=false;while(!r&&i<10000){let futureValue=get_fv_with_payments_periods(pv,initialValue,rate,compound,contribution,contributionF,inEnd);if((Math.abs(futureValue/fv))<0.999){if(action==='subtract'){initialValue+=increment;}
else{initialValue-=increment;}
increment=increment<0.1?0.1:roundTo(increment/2,4);}
else if((Math.abs(futureValue/fv))>=0.999&&(Math.abs(futureValue/fv))<=1.005){r=roundTo(initialValue,1);}
else{if(action==='subtract'){initialValue-=increment;}
else{initialValue+=increment;}}
i++;}
return r;}
function getClosestNumber(initialNumber,number1,number2){return Math.abs(initialNumber-number1)<Math.abs(initialNumber-number2)?number1:number2;}
function get_annuitetrate(compound_periods_per_year,pay_back_per_year,interest_rate_year){const cp=compound_periods_per_year==pay_back_per_year?1:compound_periods_per_year/pay_back_per_year;const ic=compound_periods_per_year==1?interest_rate_year:interest_rate_year/compound_periods_per_year;return Math.pow(1+ic,cp)-1;}
function get_pmt_periods(compound_periods_per_year,payments_per_year,future_value,present_value,interest_rate_year,n_periods,at_the_end=true){const rateP=get_annuitetrate(compound_periods_per_year,payments_per_year,interest_rate_year)
const when_contrib=at_the_end?1:(1+rateP);return(future_value-present_value*Math.pow(1+rateP,n_periods))/((Math.pow(1+rateP,n_periods)-1)*when_contrib/rateP)}
function get_primalvalue_with_payment_periods(future_value,n_periods,rateP_year,compound_per_year,payment,payments_per_year,at_the_end=true){const rate_an=get_annuitetrate(compound_per_year,payments_per_year,rateP_year);const when_contrib=at_the_end?1:(1+rate_an);return((future_value-((payment*(Math.pow(1+rate_an,n_periods)-1))*when_contrib/rate_an))/Math.pow(1+rate_an,n_periods))
return primal_value}
function get_fv_with_payments_periods(present_value,n_periods,rateP_year,compound_per_year,payment,periods_per_year,at_the_end=true){const rate_an=get_annuitetrate(compound_per_year,periods_per_year,rateP_year)
const when_contrib=at_the_end?0:payment;return(((present_value+when_contrib)*Math.pow(1+rate_an,n_periods)+(payment*(Math.pow(1+rate_an,n_periods)-1))/rate_an)-when_contrib)*-1;}
function showResult(result,principal){let chartData=[[],[],[],[],[]];let periodResultsHtml='';let accumulatedInterest=0;let accumulatedContribution=0;result.forEach((item,index)=>{periodResultsHtml+=`<tr>
			<td class="text-center">${index+1}</td>
			<td>${currencyFormat(item.startBalance)}</td>
			<td>${currencyFormat(item.contributionAmount)}</td>
			<td>${currencyFormat(item.interestPayment)}</td>
			<td>${currencyFormat(item.endBalance)}</td>
		</tr>`;accumulatedInterest+=item.interestPayment;accumulatedContribution+=item.contributionAmount;chartData[0].push(roundTo(item.startBalance,2));chartData[1].push(roundTo(accumulatedContribution,2));chartData[2].push(roundTo(accumulatedInterest,2));chartData[3].push(roundTo(item.endBalance,2));chartData[4].push(index+1);});changeChartData(chartData);const years=result.length;let chartLegendHtml='';for(let i=0;i<=years/2;i++){chartLegendHtml+=`<p class="result-text result-text--small">${i*2}</p>`;}
if(years%2!==0){chartLegendHtml+=`<p class="result-text result-text--small">${years}</p>`;}
const totalInterest=result[result.length-1].totalInterest;const totalContributions=result.reduce((acc,item)=>acc+item.contributionAmount,0);_('chart__legend').innerHTML=chartLegendHtml;output.val(periodResultsHtml).set('annual-results');output.val(currencyFormat(totalContributions)).set('result-total-payments');output.val(currencyFormat(totalInterest)).set('result-total-interest');}
function currencyFormat(num){return '$'+num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,')}
function get_fv_table_payments_by_periods(present_value,n_periods,rateP_year,compound_per_year,payment,periods_per_year,at_the_end=true){const rate_an=get_annuitetrate(compound_per_year,periods_per_year,rateP_year)
const when_contrib=at_the_end?0:payment;let periods_table=[]
let totalInterest=0;let totalContribution=0;for(let period=0;period<n_periods;period++){let interest=(present_value+when_contrib)*rate_an
let future_value=get_fv_with_payments_periods(present_value,1,rate_an,1,payment,1,at_the_end)
totalInterest+=interest;totalContribution+=payment;let period_array={startBalance:present_value,contributionAmount:payment,interestPayment:interest,endBalance:future_value,totalInterest,totalContribution,}
periods_table.push(period_array)
present_value=present_value+payment+interest}
return periods_table;}