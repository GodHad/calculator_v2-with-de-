function calculate(){const getSide=id=>input.get(id).optional().positive().val();const getAngle=id=>input.get(id).optional().positive().lt(180).val();let a=getSide('side_a');let b=getSide('side_b');let c=getSide('side_c');let A=getAngle('angle_a');let B=getAngle('angle_b');let h=getSide('height');let S=getSide('area');let p=getSide('perimeter');input.silent=false;if([a,b,c,A,B,h,S,p].reduce((count,item)=>item?count+1:count,0)!=2){input.error([],"Geben Sie nur 2 Werte zur Berechnung an");}
if(A&&A>=90||B&&B>=90){input.error([],"Winkel müssen kleiner als 90° oder π/2 Radiant sein");}
if(!input.valid())return;const calcP=(expression,scope)=>calc(expression,scope,'positive');const toDeg=angle=>calcP('angle*180/pi',{angle});const toRad=angle=>calcP('angle*pi/180',{angle});if(A)A=toRad(A);if(B)B=toRad(B);try{if(A&&B){input.error(['angle_a','angle_b'],"Kann nicht nur auf Basis von 2 Winkeln berechnet werden",true);return;}
else if(a&&b||a&&c||b&&c){if(a&&b){c=calcP(`sqrt(a^2+b^2)`,{a,b});}
else if(a&&c){b=calcP(`sqrt(c^2-a^2)`,{a,c});}
else if(b&&c){a=calcP(`sqrt(c^2-b^2)`,{b,c});}
A=calcP(`asin(a/c)`,{a,c});B=calcP(`asin(b/c)`,{b,c});h=calcP(`a*b/c`,{a,b,c});S=calcP(`a*b/2`,{a,b});p=calcP(`a+b+c`,{a,b,c});}
else if(A&&a||A&&b||A&&c||B&&a||B&&b||B&&c){if(A){B=calcP(`pi/2-${A}`);}
else if(B){A=calcP(`pi/2-${B}`);}
if(a){c=calcP(`${a}/sin(${A})`);b=calcP(`sqrt(${c}^2-${a}^2)`);}
else if(b){c=calcP(`${b}/cos(${A})`);a=calcP(`sqrt(${c}^2-${b}^2)`);}
else if(c){a=calcP(`${c}*sin(${A})`);b=calcP(`sqrt(${c}^2-${a}^2)`);}
h=calcP(`a*b/c`,{a,b,c});S=calcP(`a*b/2`,{a,b});p=calcP(`a+b+c`,{a,b,c});}
else if(a&&h||b&&h||c&&h){if(a&&h){c=calcP(`${a}^2/sqrt(${a}^2-${h}^2)`);b=calcP(`sqrt(${c}^2-${a}^2)`);}
else if(b&&h){c=calcP(`${b}^2/sqrt(${b}^2-${h}^2)`);a=calcP(`sqrt(${c}^2-${b}^2)`);}
else if(c&&h){a=calcP(`sqrt((${c}^2+sqrt(${c}^4-4*${c}^2*${h}^2))/2)`);b=calcP(`sqrt((${c}^2-sqrt(${c}^4-4*${c}^2*${h}^2))/2)`);}
A=calcP(`asin(${a}/${c})`);B=calcP(`asin(${b}/${c})`);S=calcP(`${a}*${b}/2`);p=calcP(`${a}+${b}+${c}`);}
else if(A&&h||B&&h){if(A){B=calcP(`pi/2-${A}`);}
else if(B){A=calcP(`pi/2-${B}`);}
a=calcP(`${h}/cos(${A})`);b=calcP(`${h}/sin(${A})`);c=calcP(`sqrt(${a}^2+${b}^2)`);S=calcP(`${a}*${b}/2`);p=calcP(`${a}+${b}+${c}`);}
else if(h&&S||h&&p){if(h&&p){input.error(['height','perimeter'],"Kann nicht auf Basis von Höhe und Umfang berechnet werden",true);return;}
else if(h&&S){a=calcP(`sqrt(2*${S}^2-2*${S}*(sqrt(${S}^2-${h}^4)))/${h}`);b=calcP(`sqrt(2*${S}^2+2*${S}*(sqrt(${S}^2-${h}^4)))/${h}`);c=calcP(`sqrt(${a}^2+${b}^2)`);p=calcP(`${a}+${b}+${c}`);A=calcP(`asin(${a}/${c})`);B=calcP(`asin(${b}/${c})`);}}
else if(a&&S||b&&S||c&&S){if(a&&S){b=calcP(`2*${S}/${a}`);c=calcP(`sqrt(${a}^2+${b}^2)`);}
else if(b&&S){b=calcP(`2*${S}/${b}`);c=calcP(`sqrt(${a}^2+${b}^2)`);}
else if(c&&S){a=calcP(`sqrt((${c}^2+sqrt(${c}^4-16*${S}^2))/2)`);b=calcP(`sqrt((${c}^2-sqrt(${c}^4-16*${S}^2))/2)`);}
A=calcP(`asin(${a}/${c})`);B=calcP(`asin(${b}/${c})`);h=calcP(`${a}*${b}/${c}`);p=calcP(`${a}+${b}+${c}`);}
else if(A&&S||B&&S){if(A){B=calcP(`pi/2-${A}`);}
else if(B){A=calcP(`pi/2-${B}`);}
a=calcP(`sqrt(2*${S}*tan(${A}))`);b=calcP(`sqrt(2*${S}/tan(${A}))`);c=calcP(`sqrt(${a}^2+${b}^2)`);h=calcP(`${a}*${b}/${c}`);p=calcP(`${a}+${b}+${c}`);}
else if(a&&p||b&&p||c&&p){if(a&&p){b=calcP(`(${p}^2-2*${a}*${p})/(2*${p}-2*${a})`);c=calcP(`${p}-${a}-${b}`);}
else if(b&&p){a=calcP(`(${p}^2-2*${b}*${p})/(2*${p}-2*${b})`);c=calcP(`${p}-${a}-${b}`);}
else if(c&&p){a=calcP(`(${p}-${c}+sqrt(${c}^2+2*${p}*${c}-${p}^2))/2`);b=calcP(`(${p}-${c}-sqrt(${c}^2+2*${p}*${c}-${p}^2))/2`);}
A=calcP(`asin(${a}/${c})`);B=calcP(`asin(${b}/${c})`);h=calcP(`${a}*${b}/${c}`);S=calcP(`${a}*${b}/2`);}
else if(A&&p||B&&p){if(A){B=calcP(`pi/2-${A}`);}
else if(B){A=calcP(`pi/2-${B}`);}
c=calcP(`${p}/(1+sin(${A})+cos(${A}))`);a=calcP(`${c}*sin(${A})`);b=calcP(`${c}*cos(${A})`);h=calcP(`${a}*${b}/${c}`);S=calcP(`${a}*${b}/2`);}
else if(S&&p){a=calcP(`(p^2+4*S+sqrt((p^2+4*S)^2-32*S*p^2))/(4*p)`,{S,p});b=calcP(`(p^2+4*S-sqrt((p^2+4*S)^2-32*S*p^2))/(4*p)`,{S,p});c=calcP(`sqrt(${a}^2+${b}^2)`);A=calcP(`asin(${a}/${c})`);B=calcP(`asin(${b}/${c})`);h=calcP(`${a}*${b}/${c}`);}}
catch(e){input.exception([],e);return;}
const r=calcP('S/(p/2)',{S,p});const R=calcP('a/(2*sin(A))',{A,a});_('result_a').innerHTML=format(a);_('result_b').innerHTML=format(b);_('result_c').innerHTML=format(c);_('result_A').innerHTML=`${format(toDeg(A))}° = ${format(A)} rad`;_('result_B').innerHTML=`${format(toDeg(B))}° = ${format(B)} rad`;_('result_h').innerHTML=format(h);_('result_S').innerHTML=format(S);_('result_p').innerHTML=format(p);_('result_r').innerHTML=format(r);_('result_R').innerHTML=format(R);}