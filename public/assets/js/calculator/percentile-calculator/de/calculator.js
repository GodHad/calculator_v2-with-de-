function calculate(){const numbers=input.get('data_set').split(/[ ,]+/).numbers().vals();const percentile=input.get('percentile').positive().lte(100).val();if(!input.valid())return;const data=numbers.sort(function(a,b){return a-b;});const result=calculatePercentile(data,percentile);const percentilesData=percentiles(data);Object.keys(percentilesData).forEach(key=>{_("perc_"+key).innerHTML=percentilesData[key];});output.val('Das 15. Perzentil ist 10.55').replace('{15}',numberSuffix(percentile)).replace('10.55',result).set('result_text');}
function calculatePercentile(data,percentile){let result;const index=(percentile/100)*(data.length-1);if(index%1===0){result=data[index];}else{const floor=Math.floor(index);const ceil=Math.ceil(index);const lowerValue=data[floor];const upperValue=data[ceil];result=lowerValue+(upperValue-lowerValue)*(index-floor);}
return roundTo(result,2);}
function percentiles(data){for(let i=0;i<=100;i+=5){percentiles[i]=roundTo(calculatePercentile(data,i),2);}
return percentiles;}
function numberSuffix(i){var j=i%10,k=i%100;if(j==1&&k!=11){return i+"st";}
if(j==2&&k!=12){return i+"nd";}
if(j==3&&k!=13){return i+"rd";}
return i+"th";}