function calculate(){
  // 1. init & validate
  const getSide = id => input.get(id).optional().positive().val();
  const getAngle = id => input.get(id).optional().positive().lt(180).val();
  let a = getSide('side_a');
  let b = getSide('side_b');
  let c = getSide('side_c');
  let A = getAngle('angle_a');
  let B = getAngle('angle_b');
  let C = getAngle('angle_c');
  input.silent = false;
  if(A&&B&&C || [a,b,c,A,B,C].reduce((count,item)=>item?count+1:count,0) != 3){
    input.error([],"Please provide only 3 positive values, including at least one side");
  }
  if(A&&B&&(A+B>=180) || B&&C&&(B+C>=180) || A&&C&&(A+C>=180)){
    input.error(['angle_a','angle_b','angle_c'],"The sum of the two angles must be less than 180° or π radians");
  }
  if(a&&b&&c && ((a+b<=c) || (a+c<=b) || (b+c<=a))){
    input.error(['side_a','side_b','side_c'],"The sum of two sides must be larger than the third");
  }
  if(!input.valid()) return;

  // 2. calculate
  const toDeg = angle => calc('angle*180/pi',{angle});
  const toRad = angle => calc('angle*pi/180',{angle});
  if(A) A = toRad(A);
  if(B) B = toRad(B);
  if(C) C = toRad(C);
  const calcAngle3s = (a,b,c) => {
    return calc(`acos((b^2+c^2-a^2)/(2*b*c))`,{a,b,c});
  };
  const calcSideA2s = (C,a,b) => {
    return calc(`sqrt(a^2+b^2-2*a*b*cos(C))`,{C,a,b});
  };
  const calcAngle2sA = (b,c,C) => {
    return calc(`asin(b*sin(C)/c)`,{b,c,C});
  };
  const calcSideAsA = (B,c,C) => {
    return calc('c*sin(B)/sin(C)',{B,c,C});
  };
  const calcAngle2A = (B,C) => {
    return calc('pi-B-C',{B,C});
  };

  try{
    // Case 1: 3 sides 
    if(a&&b&&c){
      A = calcAngle3s(a,b,c);
      B = calcAngle3s(b,a,c);
      C = calcAngle3s(c,a,b);
    }

    // Case 2: 2 sides, 1 angle between
    else if(b&&C&&a){
      c = calcSideA2s(C,a,b);
      B = calcAngle3s(b,a,c);
      A = calcAngle3s(a,b,c);
    }
    else if(a&&B&&c){
      b = calcSideA2s(B,a,c);
      A = calcAngle3s(a,b,c);
      C = calcAngle3s(c,a,b);
    }
    else if(c&&A&&b){
      a = calcSideA2s(A,b,c);
      C = calcAngle3s(c,a,b);
      B = calcAngle3s(b,a,c);
    }

    // Case 3: 2 sides, 1 angle
    else if(c&&b&&C || b&&c&&B){
      if(C) B = calcAngle2sA(b,c,C);
      if(B) C = calcAngle2sA(c,b,B);
      A = calcAngle2A(B,C);
      a = calcSideA2s(A,b,c);
    }
    else if(b&&a&&B || a&&b&&A){
      if(B) A = calcAngle2sA(a,b,B);
      if(A) B = calcAngle2sA(b,a,A);
      C = calcAngle2A(A,B);
      c = calcSideA2s(C,a,b);
    }
    else if(a&&c&&A || c&&a&&C){
      if(A) C = calcAngle2sA(c,a,A);
      if(C) A = calcAngle2sA(a,c,C);
      B = calcAngle2A(A,C);
      b = calcSideA2s(B,a,c);
    }

    // Case 4: 2 angles, 1 side between
    else if(A&&b&&C){
      B = calcAngle2A(A,C);
      a = calcSideAsA(A,b,B);
      c = calcSideA2s(C,a,b);
    }
    else if(C&&a&&B){
      A = calcAngle2A(B,C);
      c = calcSideAsA(C,a,A);
      b = calcSideA2s(B,a,c);
    }
    else if(B&&c&&A){
      C = calcAngle2A(A,B);
      b = calcSideAsA(B,c,C);
      a = calcSideA2s(A,b,c);
    }

    // Case 5: 2 angles, 1 side
    else if(A&&C&&a||C&&A&&c){
      if(a) c = calcSideAsA(C,a,A);
      if(c) a = calcSideAsA(A,c,C);
      B = calcAngle2A(A,C);
      b = calcSideA2s(B,a,c);
    }
    else if(C&&B&&c||B&&C&&b){
      if(c) b = calcSideAsA(B,c,C);
      if(b) c = calcSideAsA(C,b,B);
      A = calcAngle2A(B,C);
      a = calcSideA2s(A,b,c);
    }
    else if(B&&A&&b||A&&B&&a){
      if(b) a = calcSideAsA(A,b,B);
      if(a) b = calcSideAsA(B,a,A);
      C = calcAngle2A(A,B);
      c = calcSideA2s(C,a,b);
    }
  }
  catch(e){
    // to catch uncompatible values 
    input.exception([], e);
    return;
  }
  
  // props
  const S = calc('a*b*sin(C)/2',{a,b,C});
  const p = calc('a+b+c',{a,b,c});
  const s = calc('p/2',{p});
  const ha = calc('2*S/a',{S,a});
  const hb = calc('2*S/b',{S,b});
  const hc = calc('2*S/c',{S,c});
  const ma = calc(`sqrt((a/2)^2+c^2-a*c*cos(B))`,{a,c,B});
  const mb = calc(`sqrt((b/2)^2+a^2-b*a*cos(C))`,{b,a,C});
  const mc = calc(`sqrt((c/2)^2+b^2-c*b*cos(A))`,{c,b,A});
  const r = calc('S/s',{S,s});
  const R = calc('a/(2*sin(A))',{A,a});
  const Adeg = format(toDeg(A)); 
  const Bdeg = format(toDeg(B)); 
  const Cdeg = format(toDeg(C)); 
  a = format(a);
  b = format(b);
  c = format(c);

  // type
  let type = 'scalene';
  if(a == b && b == c) type = 'equilateral';
  else if(a == b || b == c || c == a) type = 'isosceles';
  if(Adeg < 90 && Bdeg < 90 && Cdeg < 90) type+= ' acute';
  else if(Adeg == 90 || Bdeg == 90 || Cdeg == 90) type+= ' right';
  else if(Adeg > 90 || Bdeg > 90 || Cdeg > 90) type+= ' obtuse';

  // 3. output
  _('result_type').innerHTML = (type + ' triangle').toUpperCase();
  _('result_a').innerHTML = a;
  _('result_b').innerHTML = b;
  _('result_c').innerHTML = c;
  _('result_A').innerHTML = `${Adeg}° = ${format(A)} rad`;
  _('result_B').innerHTML = `${Bdeg}° = ${format(B)} rad`;
  _('result_C').innerHTML = `${Cdeg}° = ${format(C)} rad`;
  _('result_ha').innerHTML = format(ha);
  _('result_hb').innerHTML = format(hb);
  _('result_hc').innerHTML = format(hc);
  _('result_ma').innerHTML = format(ma);
  _('result_mb').innerHTML = format(mb);
  _('result_mc').innerHTML = format(mc);
  _('result_S').innerHTML = format(S);
  _('result_p').innerHTML = format(p);
  _('result_s').innerHTML = format(s);
  _('result_r').innerHTML = format(r);
  _('result_R').innerHTML = format(R);
}