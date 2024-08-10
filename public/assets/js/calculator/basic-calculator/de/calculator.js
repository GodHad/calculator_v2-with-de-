const BasicCalculator={inputField:_('input_field'),expression:'',config:{precision:9,inputs:['0','1','2','3','4','5','6','7','8','9','.'],actions:['AC','BACK','%','/','*','+','-','=','±'],binaryOperators:['/','*','-','+'],leftOperators:[],rightOperators:[],inputsMap:{'Backspace':'BACK','Enter':'=','Escape':'AC','_':'±',',':'.'},actionsMap:{'−':'-','×':'*','÷':'/'},},calc(expression){try{return math.evaluate(expression).toString();}
catch(error){return 'Error';}},initMath(){math.config({number:'BigNumber',precision:this.config.precision});},action(op){let{value,expression}=this.initValues();const config=this.config;if(config.binaryOperators.includes(op)){expression+=value+op;value='0';this.activateAction(op);}
switch(op){case '=':expression+=value;value=this.calc(expression);expression+='='+value;this.activateAction(op);break;case '±':if(value=='0')break;if(value[0]=='-')
value=value.slice(1);else
value='-'+value;this.setAction('±',value[0]=='-');break;case '%':if(value[value.length-1]=='%')
value=value.slice(0,-1);else
value+='%';this.setAction('%',value[value.length-1]=='%');break;case 'AC':value='0';expression='';this.deactivateActions();break;case 'BACK':value=value.slice(0,-1);break;}
this.inputField.value=value;this.expression=expression;console.log(`${value}, ${expression}`);},initValues(){let value=this.inputField.value||'0';let expression=this.expression;const evaluated=expression.indexOf('=')!=-1;const error=['NaN','Error','Infinity','-Infinity'].includes(value);if(error){value='0';}
if(evaluated||error){expression='';this.deactivateActions();}
return{value,expression};},input(key){let{value,expression}=this.initValues();if(key=='.'&&value.indexOf('.')!=-1)return;if(key!='%'&&value.indexOf('%')!=-1)return;value=(value=='0'&&key!='.'?key:value+key);if(value.length>this.config.precision)return;this.inputField.value=value;this.expression=expression;},inputKeydown(event){let key=event.key;key=this.config.inputsMap[key]||key;let keyHandled=false;if(this.config.actions.includes(key)){this.action(key);keyHandled=true;}
if(this.config.inputs.includes(key)){this.input(key);keyHandled=true;}
if(['Meta','Control','Alt'].some(state=>event.getModifierState(state))||event.key.length>1&&!keyHandled||event.target.id!='input_field'&&event.code!='NumpadDivide')return;event.preventDefault();event.stopPropagation();},buttonClick(event){if(!event.clientX&&!event.clientY)return;if(event.target.tagName!="BUTTON")return;let key=event.target.innerText;key=this.config.actionsMap[key]||key;if(this.config.actions.includes(key)){this.action(key);}
if(this.config.inputs.includes(key)){this.input(key);}},setAction(key,state){const button=$(`button[data-action="${key}"]`);button&&button.classList[state?'add':'remove']('basic-button--active');},activateAction(key){this.deactivateActions();this.setAction(key,true);},deactivateActions(){$$('button[data-action].basic-button--active').forEach(button=>{button.classList.remove('basic-button--active')});},};window.addEventListener('load',()=>BasicCalculator.initMath())
window.addEventListener('keydown',event=>BasicCalculator.inputKeydown(event))