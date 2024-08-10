function calculate(){const number=input.get('number').number().raw();const rounding=input.get('rounding').raw();if(!input.valid())return;const roundingMap={'Milliarden':-9,'Hundert Millionen':-8,'Zehn Millionen':-7,'Millionen':-6,'Hunderttausend':-5,'Zehntausend':-4,'Tausend':-3,'Hunderterstelle':-2,'Zehnerstelle':-1,'Einerstelle (Ganze Zahlen)':0,'Zehntel (1 Dezimalstelle)':1,'Hundertstel (2 Dezimalstellen)':2,'Tausendstel (3 Dezimalstellen)':3,'Zehntausendstel (4 Dezimalstellen)':4,'Hunderttausendstel (5 Dezimalstellen)':5,'Millionstel (6 Dezimalstellen)':6,'Zehnmillionstel (7 Dezimalstellen)':7,'Hundertmillionstel (8 Dezimalstellen)':8,'Milliardstel (9 Dezimalstellen)':9};const roundTo=roundingMap[rounding];const fracLength=(number.split('.')[1]||'').length;const result=roundTo<0?math.evaluate(`round(${number}/10^${-roundTo})*10^${-roundTo}`):math.round(number,roundTo)+(fracLength<roundTo?(fracLength==0?'.':'')+'0'.repeat(roundTo-fracLength):'');_('result').innerText=result;}