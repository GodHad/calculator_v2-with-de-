window.log=console.log;window.setValue=function(inputId,value,index){_(inputId).value=value;_(inputId).index=index;}
window.switcher=function(button,id,action){$('#'+id).value=button.value;$('#'+id).onchange&&$('#'+id).onchange(button.value);for(let i=0;i<=20;i++){$(`#${id}-${i}`)?.classList.remove("button-switcher--active");}
button.classList.add("button-switcher--active");toggleRelatedInputs(button,id,action);}
window.toggleRelatedInputs=function(element,id,action){element=element instanceof Event?element.target:element
id=id??element.id;let value=element.value;if(element.type=='select-one')value=element.selectedIndex;$$('.'+id).forEach(element=>{if(action==="disabled"){element.classList.remove("disabled");}else if(action==="finding"){element.classList.remove("disabled");if(element.querySelector('.input-field__input').value==="???"){element.querySelector('.input-field__input').value=""}}else{element.classList.add("related-item-hidden");}});$$('.related-to-'+id+'-'+value)?.forEach(element=>{if(action==="disabled"){element.classList.add("disabled");}else if(action==="finding"){element.querySelector('.input-field__input').value="???"
element.classList.add("disabled");}else{element.classList.remove("related-item-hidden");}});}
window.switch_data_tab=function(owner,index,value){$$('[data-tab]')?.forEach(element=>{if(element.getAttribute('data-tab')==index){element.classList.add('tab--active');owner.classList.add('tab--active');}else{element.classList.remove('tab--active');}});}
window.isMetricSystem=function(){return $('.system-switcher').classList.contains('system-switcher--active');}
window.setSystem=function(system){const add=(system=="metric"?".imperial-system-item":".metric-system-item");$$(".system-item-hidden").forEach(element=>{element.classList.remove("system-item-hidden");});$$(add).forEach(element=>{element.classList.add("system-item-hidden");});localStorage.setItem("system",system);}
window.toggleSystem=function(button){button.classList.toggle('system-switcher--active');if(button.classList.contains('system-switcher--active')){return setSystem('metric');}
return setSystem('imperial');}
window.isHidden=function(element){const styles=window.getComputedStyle(element);return styles.display==='none'||styles.visibility==='hidden';}
window.output={value:null,val:function(value){this.value=value;return this;},replace:function(search,replacement){this.value=this.value.replace(search,replacement);return this;},set:function(elementId){_(elementId).innerHTML=this.value;return this;}};window.calc=(expression,scope,resultType)=>{let result=expression;scope=scope||{};if(typeof expression=='string'){result=math.evaluate(expression,scope);}
let valid=true;switch(resultType){case 'positive':valid=result>0;}
if(isNaN(result)||result.im||!valid){const args=Object.keys(scope).map(arg=>arg+'='+scope[arg]);throw new Error(`result of expression ${expression} is ${result}.`
+(resultType?`<br/>Should be ${resultType}.`:'')
+(args.length!=0?`<br/>Args: ${args.join(', ')}.`:''));}
return result;};window.format=number=>math.format(number,{precision:7})
window.input={box:$('#error-box'),list:$('#error-list'),value:null,elementId:null,shown:false,processed:false,silent:false,reset:function(){this.shown=false;this.box.classList.remove('calculator-result--error-active');$$('.input-field--error')?.forEach(el=>el.classList.remove('input-field--error'))
$$('.calculator-result:not(.calculator-result--error)').forEach(el=>el.classList.remove('calculator-result--hidden'))},error:function(inputId,message=`Incorrect value for "${inputId}"`,last=false){if(this.silent)return;if(this.processed)this.reset();if(!Array.isArray(inputId))inputId=[inputId];for(const inputIdItem of inputId)_(inputIdItem).parentNode.classList.add('input-field--error');if(!this.shown){this.processed=false;this.shown=true;this.list.innerHTML='';this.box.classList.add('calculator-result--error-active');$$('.calculator-result:not(.calculator-result--error)').forEach(el=>el.classList.add('calculator-result--hidden'))}
const element=document.createElement('p');element.classList.add('calculator-error__item');element.innerHTML=message;this.list.append(element);if(last)this.processed=true;},exception(inputId,message){if(typeof message!='string'){let error='';if(message instanceof Error){error=message.toString();}
if(Array.isArray(inputId)&&inputId.length==0){message=`${error}`;}else{message=`Value${Array.isArray(inputId)?'s':` "${this.get(inputId).value}"`} of "${inputId}" ${Array.isArray(inputId)?'are':'is'} invalid.<br/>${error}`;}}
return this.error(inputId,message,true);},valid:function(){if(!this.shown||this.processed)this.reset();this.processed=true;this.silent=false;return!this.shown;},get:function(elementId){this.elementId=elementId;let element=_(elementId);this.silent=false;if(element==null){this.value=null;}else{this.value=element.value;for(;element&&element!==document;element=element.parentNode){if(element.classList.contains('related-item-hidden'))this.silent=true;}}
return this;},index:function(){this.value=_(this.elementId).selectedIndex;return this;},checked:function(elementId){this.value=_(this.elementId).checked;return this;},split:function(separator){this.value=this.value.split(separator);return this;},replace:function(pattern,replacement){this.value=this.value.replace(pattern,replacement);return this;},default:function(value){if(!this.value)this.value=value;return this;},optional:function(value){if(!this.value)this.silent=true;return this;},gt:function(compare=0,errorText=`The ${this.elementId} must be greater than ${compare}.`){if(this.value instanceof Date){compare=compare instanceof Date?compare:new Date(_(compare).value);if(this.value.getTime()<=compare.getTime())this.error(this.elementId,errorText);}else{compare=isNaN(compare)?Number(_(compare).value):compare;if(this.value===''||isNaN(Number(this.value)))
this.error(this.elementId,`The ${this.elementId} must be a number.`);else
if(Number(this.value)<=compare)this.error(this.elementId,errorText);}
return this;},gte:function(compare=0,errorText=`The ${this.elementId} must be greater than or equal to ${compare}.`){if(this.value instanceof Date){compare=compare instanceof Date?compare:new Date(_(compare).value);if(this.value.getTime()<compare.getTime())this.error(this.elementId,errorText);}else{compare=isNaN(compare)?Number(_(compare).value):compare;if(this.value===''||isNaN(Number(this.value)))
this.error(this.elementId,`The ${this.elementId} must be a number.`);else
if(Number(this.value)<compare)this.error(this.elementId,errorText);}
return this;},lt:function(compare=0,errorText=`The ${this.elementId} must be less than ${compare}.`){if(this.value instanceof Date){compare=compare instanceof Date?compare:new Date(_(compare).value);if(this.value.getTime()>=compare.getTime())this.error(this.elementId,errorText);}else{compare=isNaN(compare)?Number(_(compare).value):compare;if(this.value===''||isNaN(Number(this.value)))
this.error(this.elementId,`The ${this.elementId} must be a number.`);else
if(Number(this.value)>=compare)this.error(this.elementId,errorText);}
return this;},lte:function(compare=0,errorText=`The ${this.elementId} must be less than or equal to ${compare}.`){if(this.value instanceof Date){compare=compare instanceof Date?compare:new Date(_(compare).value);if(this.value.getTime()>compare.getTime())this.error(this.elementId,errorText);}else{compare=isNaN(compare)?Number(_(compare).value):compare;if(this.value===''||isNaN(Number(this.value)))
this.error(this.elementId,`The ${this.elementId} must be a number.`);else
if(Number(this.value)>compare)this.error(this.elementId,errorText);}
return this;},integer:function(errorText=`The ${this.elementId} must be integer number (-3, -2, -1, 0, 1, 2, 3, ...).`){if(!this.value.match(/^-?(0|[1-9]\d*)$/))this.error(this.elementId,errorText);return this;},_naturalRegexp:/^([1-9]\d*)$/,natural:function(errorText=`The ${this.elementId} must be a natural number (1, 2, 3, ...).`){if(!this.value.match(this._naturalRegexp))this.error(this.elementId,errorText);return this;},natural_numbers:function(errorText=`The ${this.elementId} must be a set of natural numbers (1, 2, 3, ...).`){this.split(/[ ,]+/);if(!this.value.every(value=>value.match(this._naturalRegexp)))this.error(this.elementId,errorText);return this;},_mixedRegexp:/^(0|-?[1-9]\d*|-?[1-9]\d*\/[1-9]\d*|-?[1-9]\d*\s[1-9]\d*\/[1-9]\d*)$/,mixed:function(errorText=`The ${this.elementId} must be an integer/fraction/mixed number (1, 2/3, 4 5/6, ...).`){if(!this.value.match(this._mixedRegexp))this.error(this.elementId,errorText);return this;},mixed_numbers:function(errorText=`The ${this.elementId} must be a set of integer/fraction/mixed numbers (1, 2/3, 4 5/6, ...).`){this.split(/,\s*/);if(!this.value.every(value=>value.match(this._mixedRegexp)))this.error(this.elementId,errorText);return this;},number:function(errorText=`The "${this.elementId}" must be a number.`){if(this.value===''||isNaN(Number(this.value)))this.error(this.elementId,errorText);return this;},probability:function(errorText=`The "${this.elementId}" must be a number between 0 and 1.`){if(this.value===''||isNaN(Number(this.value))||Number(this.value)<0||Number(this.value)>1)
this.error(this.elementId,errorText);return this;},percentage:function(errorText=`The "${this.elementId}" must be a number between 0 and 100.`){if(this.value===''||isNaN(Number(this.value))||Number(this.value)<0||Number(this.value)>100)
this.error(this.elementId,errorText);return this;},numbers:function(errorText=`The ${this.elementId} must be a set of numbers.`){if(this.value.filter(value=>isNaN(Number(value))).length)this.error(this.elementId,errorText);return this;},whole:function(errorText=`The ${this.elementId} must be a whole number.`){if(!this.value.match(/^(0|[1-9]\d*)$/))this.error(this.elementId,errorText);return this;},positive:function(errorText=`The ${this.elementId} must be greater than 0.`){this.gt(0,errorText);return this;},nonZero:function(errorText=`The ${this.elementId} must be non-zero.`){if(this.value===''||isNaN(Number(this.value)))
this.error(this.elementId,`The ${this.elementId} must be a number.`);else
if(Number(this.value)==0)this.error(this.elementId,errorText);return this;},nonNegative:function(errorText=`The ${this.elementId} must be greater than or equal to 0.`){this.gte(0,errorText);return this;},negative:function(errorText=`The ${this.elementId} must be less than 0.`){this.lt(0,errorText);return this;},scientific:function(errorText=`The ${this.elementId} must be in scientific notation.`){if(!this.value.match(/^(-|\+)?((0|[1-9]\d*)(\.\d*)?|(\.\d+))((e|\s?(\*|x)\s?10\^)(-|\+)?(0|[1-9]\d*))?$/i))this.error(this.elementId,errorText);return this;},periodic:function(errorText=`The ${this.elementId} must be regular or periodic number.`){if(this.value===''||isNaN(Number(this.value))&&!this.value.match(/\.\d*\(\d+\)$/))this.error(this.elementId,errorText);return this;},time:function(format='hh:mm:ss',errorText=`The ${this.elementId} must be in format ${format}.`){let regex=new RegExp("^"+format.replace(/[\:\-\/\\]/g,'\\$&').replace(/h|m|s/g,'\\d')+"$");if(!this.value.match(regex)||isNaN(this.value=new Date(`1900-01-01 ${this.value}`)))this.error(this.elementId,errorText);return this;},date:function(format='yyyy-mm-dd',errorText=`The ${this.elementId} is required field.`){let regex=new RegExp("^"+format.replace(/[\:\-\/\\]/g,'\\$&').replace(/y|m|d|h|s/g,'\\d')+"$");if(!this.value.match(regex)||isNaN(this.value=new Date(this.value)))this.error(this.elementId,errorText);this.value=convertTZ(this.value,"UTC");return this;},bool:function(){return!!this.value;},val:function(){if(this.value===''||this.value===null)return null;return Number(this.value);},vals:function(){return this.value.map(value=>Number(value));},raw:function(){return this.value;},group(name,ids){const result=ids.split('|').reduce((result,ids)=>{const obj=ids.split('.').every(id=>_(name+id.match(/^[_a-zA-Z]+/)[0]).value)?ids.split('.').reduce((obj,id)=>{let type='number';let getter='val';switch((id.match(/[^_a-zA-Z]+$/)||[])[0]){case '+':type='positive';break;case '!0':type='nonZero';break;case '#':getter='raw';break;default:;break;}
id=id.match(/^[_a-zA-Z]+/)[0];return{...obj,...{[id]:input.get(name+id)[type]()[getter]()}};},{}):null;if(!result&&!obj)return null;return{...result,...obj};},null);return result;},}
window.sysnumconv=function(element){const id=element.dataset.target;const metric=_(id);const imperial=_(id+"_imperial");if(window.isMetricSystem()){let value=metric.value;imperial.value=eval(imperial.dataset.formula).toFixed(2);}else{let value=imperial.value;metric.value=eval(metric.dataset.formula).toFixed(2);}};window.updateHeight=function(element){var id=element.dataset.target;var cm=_(id);var feet=_(id+"_ft");var inches=_(id+"_in");if(window.isMetricSystem()){feet.value=Math.floor(cm.value*0.393701/12);inches.value=(cm.value*0.393701%12).toFixed(2);}else{cm.value=((feet.value*30.48)+(inches.value*2.54)).toFixed(2);}};window.setDate=function(id,suffix){var date=new Date();var date_m=_(id);var date_us=_(id+"_us");date.setDate(date.getDate()+suffix);date_us.value=("0"+(date.getMonth()+1)).slice(-2)+'/'+("0"+date.getDate()).slice(-2)+'/'+date.getFullYear();date_m.value=date.getFullYear()+'-'+("0"+(date.getMonth()+1)).slice(-2)+'-'+("0"+date.getDate()).slice(-2);}
window.updateDate=function(element){var id=element.dataset.target;var date_m=_(id);var date_us=_(id+"_us");if(window.isMetricSystem()){let date=new Date(Date.parse(date_m.value));date_us.value=("0"+(date.getMonth()+1)).slice(-2)+'/'+("0"+date.getDate()).slice(-2)+'/'+date.getFullYear();}else{let date=new Date(Date.parse(date_us.value));date_m.value=date.getFullYear()+'-'+("0"+(date.getMonth()+1)).slice(-2)+'-'+("0"+date.getDate()).slice(-2);}};window.switchTab=function(event,index){if(index!==undefined&&index!==null){if(event.target.classList.contains('tab-item')){$$(`.${event.target.classList[0]}`).forEach((tab,i)=>{if(index===i){tab.classList.add('tab-item--active')}else{tab.classList.remove('tab-item--active')}})}}
$$(`[data-tab]`).forEach(element=>{if(element.dataset.tab==event.selectedIndex||element.dataset.tab==index){element.classList.add('tab--active')}else{element.classList.remove('tab--active')}})}
window.setMaxLength=function(element,maxLength){if(getComputedStyle(element).getPropertyValue('--fontStep')!==''){element.style=`--maxWidth: ${Number(getComputedStyle(element).getPropertyValue('--fontStep').replace(/px/gi,''))*(element.value.length===0?1:element.value.length>maxLength?maxLength:element.value.length)}px`}
if(element.value.length>maxLength){element.value=element.value.substring(0,maxLength);}}
window.relatedToggle=function(element,related,action){if(action==="disabled"){if(element.target.checked){$$(`.related-to-${related}`)?.forEach(el=>el.classList.remove('disabled'))}else{$$(`.related-to-${related}`)?.forEach(el=>el.classList.add('disabled'))}}else{if(element.target.checked){$$(`.related-to-${related}-a`)?.forEach(el=>el.classList.add('related-item-hidden'))
$$(`.related-to-${related}-b`)?.forEach(el=>el.classList.remove('related-item-hidden'))}else{$$(`.related-to-${related}-a`)?.forEach(el=>el.classList.remove('related-item-hidden'))
$$(`.related-to-${related}-b`)?.forEach(el=>el.classList.add('related-item-hidden'))}}}
window.roundTo=function(num,decimals=5){if(typeof num!=='number'||!isFinite(num))return num;if(num.toString().includes('e')){const splitted=num.toString().split('e');return roundTo(+splitted[0],decimals)+`e${splitted[1]}`;};return+(Math.round(num+`e+${decimals}`)+`e-${decimals}`);}
window.delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));window.generateRandomDigit=()=>Math.floor(Math.random()*10);window.convertTZ=(date,tzString)=>new Date((typeof date==="string"?new Date(date):date).toLocaleString("en-US",{timeZone:tzString}));window.animateElement=async(element,isText)=>{const originalText=element.innerHTML;let digitIndices=[];let originalDigits=[];[...originalText].forEach((char,index)=>{if(!isNaN(parseInt(char,10))&&char!==' '){digitIndices.push(index);originalDigits.push(char);}});for(let i=0;i<10;i++){let textArray=[...originalText];digitIndices.forEach(index=>{textArray[index]=generateRandomDigit();});element.innerHTML=textArray.join('');await delay(30);}
digitIndices.forEach((index,digitIndex)=>{let textArray=[...originalText];textArray[index]=originalDigits[digitIndex];element.innerHTML=textArray.join('');});};window.animateElements=function(){$$('.animate').forEach(async(element)=>animateElement(element));$$('.animate-text').forEach(async(element)=>animateElement(element,true));}
window.plural=function(number,versions,options={showNumber:true,localize:true,locale:null}){const words={zero:"",one:"",two:"",few:"",many:"",other:""};const parts=versions.split(':');if(parts.length===1){Object.keys(words).forEach(key=>words[key]=versions);}else{let i=0;for(let key in words){words[key]=parts[i]||parts[0];i++;}}
const rule=new Intl.PluralRules(options.locale??window.locale).select(Math.floor(number));return `${options.showNumber?`${options.localize?number.toLocaleString(options.locale??window.locale):number} `:''}${words[rule]}`;};window.numberToWords=function(num){if(num===0)return 'null';const belowTwenty=['','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun','zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];const tens=['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];const hundreds=['','einhundert','zweihundert','dreihundert','vierhundert','fünfhundert','sechshundert','siebenhundert','achthundert','neunhundert'];const integerScales=['Tausende:Tausend:Tausende:Tausende:Tausende:Tausende','Millionen:Million:Millionen:Millionen:Millionen:Millionen','Milliarden:Milliarde:Milliarden:Milliarden:Milliarden:Milliarden','Billionen:Billion:Billionen:Billionen:Billionen:Billionen','Billiarden:Billiarde:Billiarden:Billiarden:Billiarden:Billiarden','Trillionen:Trillion:Trillionen:Trillionen:Trillionen:Trillionen','Trilliarden:Trilliarde:Trilliarden:Trilliarden:Trilliarden:Trilliarden','Quadrillionen:Quadrillion:Quadrillionen:Quadrillionen:Quadrillionen:Quadrillionen','Quadrilliarden:Quadrilliarde:Quadrilliarden:Quadrilliarden:Quadrilliarden:Quadrilliarden','Quintillionen:Quintillion:Quintillionen:Quintillionen:Quintillionen:Quintillionen','Quintilliarden:Quintilliarde:Quintilliarden:Quintilliarden:Quintilliarden:Quintilliarden','Sextillionen:Sextillion:Sextillionen:Sextillionen:Sextillionen:Sextillionen','Sextilliarden:Sextilliarde:Sextilliarden:Sextilliarden:Sextilliarden:Sextilliarden','Septillionen:Septillion:Septillionen:Septillionen:Septillionen:Septillionen','Septilliarden:Septilliarde:Septilliarden:Septilliarden:Septilliarden:Septilliarden','Oktillionen:Oktillion:Oktillionen:Oktillionen:Oktillionen:Oktillionen','Oktilliarden:Oktilliarde:Oktilliarden:Oktilliarden:Oktilliarden:Oktilliarden','Nonillionen:Nonillion:Nonillionen:Nonillionen:Nonillionen:Nonillionen','Nonilliarden:Nonilliarde:Nonilliarden:Nonilliarden:Nonilliarden:Nonilliarden','Dekillionen:Dekillion:Dekillionen:Dekillionen:Dekillionen:Dekillionen','Dekilliarden:Dekilliarde:Dekilliarden:Dekilliarden:Dekilliarden:Dekilliarden'];const decimalScales=['Zehntel:Zehntel:Zehntel:Zehntel:Zehntel:Zehntel','Hundertstel:Hundertstel:Hundertstel:Hundertstel:Hundertstel:Hundertstel','Tausendstel:Tausendstel:Tausendstel:Tausendstel:Tausendstel:Tausendstel','Zehntausendstel:Zehntausendstel:Zehntausendstel:Zehntausendstel:Zehntausendstel:Zehntausendstel','Hunderttausendstel:Hunderttausendstel:Hunderttausendstel:Hunderttausendstel:Hunderttausendstel:Hunderttausendstel','Millionstel:Millionstel:Millionstel:Millionstel:Millionstel:Millionstel','Zehnmillionstel:Zehnmillionstel:Zehnmillionstel:Zehnmillionstel:Zehnmillionstel:Zehnmillionstel','Hundertmillionstel:Hundertmillionstel:Hundertmillionstel:Hundertmillionstel:Hundertmillionstel:Hundertmillionstel','Milliardstel:Milliardstel:Milliardstel:Milliardstel:Milliardstel:Milliardstel','Zehnmilliardstel:Zehnmilliardstel:Zehnmilliardstel:Zehnmilliardstel:Zehnmilliardstel:Zehnmilliardstel','Hundertmilliardstel:Hundertmilliardstel:Hundertmilliardstel:Hundertmilliardstel:Hundertmilliardstel:Hundertmilliardstel','Billionstel:Billionstel:Billionstel:Billionstel:Billionstel:Billionstel','Zehnbillionstel:Zehnbillionstel:Zehnbillionstel:Zehnbillionstel:Zehnbillionstel:Zehnbillionstel','Hundertbillionstel:Hundertbillionstel:Hundertbillionstel:Hundertbillionstel:Hundertbillionstel:Hundertbillionstel','Billiardstel:Billiardstel:Billiardstel:Billiardstel:Billiardstel:Billiardstel','Zehnbilliardstel:Zehnbilliardstel:Zehnbilliardstel:Zehnbilliardstel:Zehnbilliardstel:Zehnbilliardstel','Hundertbilliardstel:Hundertbilliardstel:Hundertbilliardstel:Hundertbilliardstel:Hundertbilliardstel:Hundertbilliardstel','Trillionstel:Trillionstel:Trillionstel:Trillionstel:Trillionstel:Trillionstel','Zehntrillionstel:Zehntrillionstel:Zehntrillionstel:Zehntrillionstel:Zehntrillionstel:Zehntrillionstel','Hunderttrillionstel:Hunderttrillionstel:Hunderttrillionstel:Hunderttrillionstel:Hunderttrillionstel:Hunderttrillionstel','Trilliardstel:Trilliardstel:Trilliardstel:Trilliardstel:Trilliardstel:Trilliardstel','Quadrillionstel:Quadrillionstel:Quadrillionstel:Quadrillionstel:Quadrillionstel:Quadrillionstel','Quadrilliardstel:Quadrilliardstel:Quadrilliardstel:Quadrilliardstel:Quadrilliardstel:Quadrilliardstel','Quintillionstel:Quintillionstel:Quintillionstel:Quintillionstel:Quintillionstel:Quintillionstel','Quintilliardstel:Quintilliardstel:Quintilliardstel:Quintilliardstel:Quintilliardstel:Quintilliardstel','Sextillionstel:Sextillionstel:Sextillionstel:Sextillionstel:Sextillionstel:Sextillionstel','Sextilliardstel:Sextilliardstel:Sextilliardstel:Sextilliardstel:Sextilliardstel:Sextilliardstel','Septillionstel:Septillionstel:Septillionstel:Septillionstel:Septillionstel:Septillionstel','Septilliardstel:Septilliardstel:Septilliardstel:Septilliardstel:Septilliardstel:Septilliardstel','Oktillionstel:Oktillionstel:Oktillionstel:Oktillionstel:Oktillionstel:Oktillionstel','Oktilliardstel:Oktilliardstel:Oktilliardstel:Oktilliardstel:Oktilliardstel:Oktilliardstel','Nonillionstel:Nonillionstel:Nonillionstel:Nonillionstel:Nonillionstel:Nonillionstel','Nonilliardstel:Nonilliardstel:Nonilliardstel:Nonilliardstel:Nonilliardstel:Nonilliardstel','Dezillionstel:Dezillionstel:Dezillionstel:Dezillionstel:Dezillionstel:Dezillionstel','Dezilliardstel:Dezilliardstel:Dezilliardstel:Dezilliardstel:Dezilliardstel:Dezilliardstel'];let chunks=[];let currentNum=BigInt(Math.floor(num));while(currentNum>0n){chunks.unshift(currentNum%1000n);currentNum=currentNum/1000n;}
if(chunks.length===0)chunks.push(0n);let integerWords=chunks.map((chunk,index)=>{chunk=Number(chunk);if(chunk===0)return '';const hundred=Math.floor(chunk/100);const tenUnit=chunk%100;const ten=Math.floor(tenUnit/10);const unit=tenUnit%10;let chunkText='';if(hundred>0)chunkText+=hundreds[hundred]+' ';if(tenUnit>=20){chunkText+=tens[ten]+' ';if(unit>0)chunkText+=belowTwenty[unit];}else if(tenUnit>0){chunkText+=belowTwenty[tenUnit];}
if(chunk>0&&index<chunks.length-1){let scale=integerScales[chunks.length-index-2];return chunkText.trim()+' '+plural(chunk,scale,{showNumber:false});}
return chunkText.trim();}).join(' ').trim();let decimalPart=(num-Math.floor(num)).toFixed(num.toString().split('.')?.[1]?.length).toString().slice(2);let decimalLength=decimalPart>0?decimalPart.toString().replace('-','').length:0;return(integerWords.length>0?integerWords:'null')+(decimalLength>0?' Punkt '+numberToWords(decimalPart)+' '+plural(decimalPart,decimalScales[decimalLength-1],{showNumber:false}):'');}
window.toSentenceCase=function(str){const firstLetter=str.substr(0,1);return firstLetter.toUpperCase()+str.substr(1).toLowerCase();}
window.toTitleCase=function(str){return str.toLowerCase().split(' ').map(function(word){return(word.charAt(0).toUpperCase()+word.slice(1));}).join(' ');}
window.setCookie=function(key,value){const date=new Date();date.setTime(date.getTime()+(10*365*24*60*60*1000));document.cookie=`${key}=${value};expires=${date.toUTCString()};path=/`;}
window.getCookie=function(key){let nameEQ=key+"=";let ca=document.cookie.split(';');for(let i=0;i<ca.length;i++){let c=ca[i];while(c.charAt(0)===' ')c=c.substring(1);if(c.indexOf(nameEQ)===0){return decodeURIComponent(c.substring(nameEQ.length,c.length));}}
return null;}