function calculate(){
  // 1. init & validate
  const getSide = id => input.get(id).optional().positive().val();
  const getAngle = id => input.get(id).optional().positive().lt(180).val();
  let a = getSide('side_a');
  let b = getSide('side_b');
  let c = getSide('side_c');
  let A = getAngle('angle_a');
  let B = getAngle('angle_b');
  let h = getSide('height');
  let S = getSide('area');
  let p = getSide('perimeter');
  input.silent = false;
  if([a,b,c,A,B,h,S,p].reduce((count,item)=>item?count+1:count,0) != 2){
    input.error([],"Please provide only 2 values to calculate");
  }
  if(A&&A>=90 || B&&B>=90){
    input.error([],"Angles must be less than 90° or π/2 radians");
  }
  if(!input.valid()) return;

  // 2. calculate
  const calcP = (expression, scope) => calc(expression, scope, 'positive');
  const toDeg = angle => calcP('angle*180/pi',{angle});
  const toRad = angle => calcP('angle*pi/180',{angle});
  if(A) A = toRad(A);
  if(B) B = toRad(B);

  try{
    // Case 1. AB
    if(A&&B){
      input.error(['angle_a','angle_b'],"Can not calculate based on 2 angles only",true);
      return;
    }

    // Case 2. ab,ac,bc - 2 sides 
    else if(a&&b || a&&c || b&&c){
      if(a && b){
        c = calcP(`sqrt(a^2+b^2)`,{a,b});
      } 
      else if(a && c){
        b = calcP(`sqrt(c^2-a^2)`,{a,c});
      }
      else if(b && c){
        a = calcP(`sqrt(c^2-b^2)`,{b,c});
      }
      A = calcP(`asin(a/c)`,{a,c});
      B = calcP(`asin(b/c)`,{b,c});
      h = calcP(`a*b/c`,{a,b,c});
      S = calcP(`a*b/2`,{a,b});
      p = calcP(`a+b+c`,{a,b,c});
    }

    // Case 3. Aa,Ab,Ac,Ba,Bb,Bc - angle + side
    else if(A&&a||A&&b||A&&c||B&&a||B&&b||B&&c){
      if(A){
        B = calcP(`pi/2-${A}`);
      }
      else if(B){
        A = calcP(`pi/2-${B}`);
      }
      if(a){
        c = calcP(`${a}/sin(${A})`);
        b = calcP(`sqrt(${c}^2-${a}^2)`);
      }
      else if(b){
        c = calcP(`${b}/cos(${A})`);
        a = calcP(`sqrt(${c}^2-${b}^2)`);
      }
      else if(c){
        a = calcP(`${c}*sin(${A})`);
        b = calcP(`sqrt(${c}^2-${a}^2)`);
      }
      h = calcP(`a*b/c`,{a,b,c});
      S = calcP(`a*b/2`,{a,b});
      p = calcP(`a+b+c`,{a,b,c});
    }

    // Case 4. ah,bh,ch - height + side
    else if(a&&h||b&&h||c&&h){
      if(a && h){
        // if(this.checkError(h >= a, ['a','h'], '', false)) setError();
        c = calcP(`${a}^2/sqrt(${a}^2-${h}^2)`);
        b = calcP(`sqrt(${c}^2-${a}^2)`);
      }
      else if(b && h){
        // if(this.checkError(h >= b, ['b','h'], '', false)) setError();
        c = calcP(`${b}^2/sqrt(${b}^2-${h}^2)`);
        a = calcP(`sqrt(${c}^2-${b}^2)`);
      }
      else if(c && h){
        // if(this.checkError(h > c/2, ['c','h'], '', false)) setError();
        a = calcP(`sqrt((${c}^2+sqrt(${c}^4-4*${c}^2*${h}^2))/2)`);
        b = calcP(`sqrt((${c}^2-sqrt(${c}^4-4*${c}^2*${h}^2))/2)`);
      }

      A = calcP(`asin(${a}/${c})`);
      B = calcP(`asin(${b}/${c})`);
      S = calcP(`${a}*${b}/2`);
      p = calcP(`${a}+${b}+${c}`);
    }

    // Case 5. Ah,Bh - height + angle 
    else if(A&&h||B&&h){
      if(A){
        B = calcP(`pi/2-${A}`);
      }
      else if(B){
        A = calcP(`pi/2-${B}`);
      } 

      a = calcP(`${h}/cos(${A})`);
      b = calcP(`${h}/sin(${A})`);      
      c = calcP(`sqrt(${a}^2+${b}^2)`);
      S = calcP(`${a}*${b}/2`);
      p = calcP(`${a}+${b}+${c}`);
    }

    // 6. hS,hp - height + S/p
    else if(h&&S||h&&p){
      if(h&&p){
        input.error(['height','perimeter'],"Unable to calculate based on height and perimeter",true);
        return;
      }
      else if(h && S){
        a = calcP(`sqrt(2*${S}^2-2*${S}*(sqrt(${S}^2-${h}^4)))/${h}`);
        b = calcP(`sqrt(2*${S}^2+2*${S}*(sqrt(${S}^2-${h}^4)))/${h}`);
        c = calcP(`sqrt(${a}^2+${b}^2)`);
        p = calcP(`${a}+${b}+${c}`);
        A = calcP(`asin(${a}/${c})`);
        B = calcP(`asin(${b}/${c})`);
      }
    }

    // 7. aS,bS,cS - side + S 
    else if(a&&S||b&&S||c&&S){
      if(a && S){
        b = calcP(`2*${S}/${a}`);
        c = calcP(`sqrt(${a}^2+${b}^2)`);
      }
      else if(b && S){
        b = calcP(`2*${S}/${b}`);
        c = calcP(`sqrt(${a}^2+${b}^2)`);
      }
      else if(c && S){
        a = calcP(`sqrt((${c}^2+sqrt(${c}^4-16*${S}^2))/2)`);
        b = calcP(`sqrt((${c}^2-sqrt(${c}^4-16*${S}^2))/2)`);
      }

      A = calcP(`asin(${a}/${c})`);
      B = calcP(`asin(${b}/${c})`);
      h = calcP(`${a}*${b}/${c}`);
      p = calcP(`${a}+${b}+${c}`);
    }

    // 8. AS,BS - angle + S
    else if(A&&S||B&&S){
      if(A){
        B = calcP(`pi/2-${A}`);
      }
      else if(B){
        A = calcP(`pi/2-${B}`);
      }

      a = calcP(`sqrt(2*${S}*tan(${A}))`);
      b = calcP(`sqrt(2*${S}/tan(${A}))`);
      c = calcP(`sqrt(${a}^2+${b}^2)`);
      h = calcP(`${a}*${b}/${c}`);
      p = calcP(`${a}+${b}+${c}`);
    }

    // 9. ap,bp,cp - side + p 
    else if(a&&p||b&&p||c&&p){
      if(a && p){
        b = calcP(`(${p}^2-2*${a}*${p})/(2*${p}-2*${a})`);
        c = calcP(`${p}-${a}-${b}`);
      }
      else if(b && p){
        a = calcP(`(${p}^2-2*${b}*${p})/(2*${p}-2*${b})`);
        c = calcP(`${p}-${a}-${b}`);
      }
      else if(c && p){
        a = calcP(`(${p}-${c}+sqrt(${c}^2+2*${p}*${c}-${p}^2))/2`);
        b = calcP(`(${p}-${c}-sqrt(${c}^2+2*${p}*${c}-${p}^2))/2`);
      }

      A = calcP(`asin(${a}/${c})`);
      B = calcP(`asin(${b}/${c})`);
      h = calcP(`${a}*${b}/${c}`);
      S = calcP(`${a}*${b}/2`);
    }

    // 10. Ap,Bp - angle + p
    else if(A&&p||B&&p){
      if(A){
        B = calcP(`pi/2-${A}`);
      }
      else if(B){
        A = calcP(`pi/2-${B}`);
      }

      c = calcP(`${p}/(1+sin(${A})+cos(${A}))`);
      a = calcP(`${c}*sin(${A})`);
      b = calcP(`${c}*cos(${A})`);
      h = calcP(`${a}*${b}/${c}`);
      S = calcP(`${a}*${b}/2`);
    }

    // 11. Sp
    else if(S&&p){
      a = calcP(`(p^2+4*S+sqrt((p^2+4*S)^2-32*S*p^2))/(4*p)`,{S,p});
      b = calcP(`(p^2+4*S-sqrt((p^2+4*S)^2-32*S*p^2))/(4*p)`,{S,p});
      c = calcP(`sqrt(${a}^2+${b}^2)`);
      A = calcP(`asin(${a}/${c})`);
      B = calcP(`asin(${b}/${c})`);
      h = calcP(`${a}*${b}/${c}`);
    }
  }
  catch(e){
    // to catch uncheckable values combinations 
    input.exception([], e);
    return;
  }

  const r = calcP('S/(p/2)',{S,p});
  const R = calcP('a/(2*sin(A))',{A,a});

  // 3. output
  _('result_a').innerHTML = format(a);
  _('result_b').innerHTML = format(b);
  _('result_c').innerHTML = format(c);
  _('result_A').innerHTML = `${format(toDeg(A))}° = ${format(A)} rad`;
  _('result_B').innerHTML = `${format(toDeg(B))}° = ${format(B)} rad`;
  _('result_h').innerHTML = format(h);
  _('result_S').innerHTML = format(S);
  _('result_p').innerHTML = format(p);
  _('result_r').innerHTML = format(r);
  _('result_R').innerHTML = format(R); 
}